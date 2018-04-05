<template>
  <div style="width: 100%">
    <div class="kanban-board" style="width: 100%; display: flex; flex-direction: row;">
      <template v-for="(column, i) of columns">
        <kanban-column :column="column" :add="i == 0 ? newIssueUrl() : ''" :key="column.name" :style="'flex: ' + (column.collapsed ? '0' : '1')"></kanban-column>
      </template>
    </div>
  </div>
</template>

<script>
const isLocalHost = ['localhost', '127.0.0.1', '::1'].includes(location.hostname)
function debug (line) {
  if (isLocalHost) {
    if (typeof line === 'function') {
      line = line()
    }
    console.log(line)
  }
}

export default {
  created () {
    this.load()
  },
  data () {
    return {
      columns: []
    }
  },
  watch: {
    '$route' () {
      this.load()
    }
  },
  methods: {
    formatTitle () {
      var repoOwner = this.$route.params.repoOwner
      var repoName = this.$route.params.repoName
      return repoOwner + '/' + repoName
    },
    newIssueUrl () {
      var repoOwner = this.$route.params.repoOwner
      var repoName = this.$route.params.repoName
      return 'https://github.com/' + repoOwner + '/' + repoName + '/issues/new'
    },
    backlogIssuesUrl () {
      var repoOwner = this.$route.params.repoOwner
      var repoName = this.$route.params.repoName
      return 'https://github.com/' + repoOwner + '/' + repoName + '/issues?q=no:milestone+no:assignee'
    },
    archivedIssuesUrl () {
      var repoOwner = this.$route.params.repoOwner
      var repoName = this.$route.params.repoName
      return 'https://github.com/' + repoOwner + '/' + repoName + '/issues?q=label:archived'
    },
    load () {
      var repoOwner = this.$route.params.repoOwner
      var repoName = this.$route.params.repoName
      if (repoOwner.toLowerCase() === 'pivotaltracker') {
          this.loadPivotalTracker(repoName, () => this.dragulaContainers(this))
      } else {
          this.loadGithub(repoOwner, repoName, () => this.dragulaContainers(this))
      }
    },
    selected (item) {
      this.selecteditem = item
    },
    dragulaContainers (vue) {
      setTimeout(() => {
        Object.values(document.querySelectorAll('.kanban-column')).forEach(c => {
          vue.$drake.containers.push(c)
        })
      }, 500)
    },
    loadGithub (repoOwner, repoName, callback) {
      if (this.search_source) {
        this.search_source.cancel('cancel search due to newer request')
        this.search_source = null
      }
      this.search_source = this.$axios.CancelToken.source()

      var authorization = null
      if (document.cookie) {
        var getCookie = function (name) {
          var parts = ("; " + document.cookie).split("; " + name + "=")
          return parts.length === 2 ? parts[1].split(";")[0] : ''
        }
        var ghat = getCookie('ghat')
        if (ghat) {
          authorization = 'token ' + ghat
        }
      }

      var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues?filter=all&state=all&per_page=100'
      var headers = {}
      if (authorization) {
        headers = { 'Authorization': authorization }
        url = url + '&_=' + Date.now()
      }

      this.$axios.get(url, { headers: headers,
                             cancelToken: this.search_source.token })
                 .then(response => {
                    var issues = response.data
                    var backlogIssues = []
                    var milestoneIssues = {}
                    var assignedIssues = []
                    var closedIssues = []
                    var archivedIssues = []
                    for (var issue of issues) {
                      debug(() => {
                        var lines = []
                        lines.push('ISSUE')
                        for (var kv of Object.entries(issue)) {
                          if (kv[1] === null || typeof kv[1] !== 'object') {
                            lines.push('  ' + kv[0] + ': ' + JSON.stringify(kv[1]))
                          } else {
                            var keys = JSON.stringify(Object.keys(kv[1]))
                            keys = keys.replace('["', '{').replace(/","/g, ', ').replace('"]', '}')
                            lines.push('  ' + kv[0] + ': ' + keys)
                          }
                        }
                        lines.push('')
                        return lines.join('  |')
                      })

                      if (issue.state === 'closed') {
                        if ((issue.milestone && issue.milestone.state === 'closed') || issue.labels.find(l => l.name === 'archived')) {
                          archivedIssues.push(issue)
                        } else {
                          closedIssues.push(issue)
                        }
                      } else if (issue.assignee) {
                        assignedIssues.push(issue)
                      } else if (issue.milestone) {
                        if (issue.milestone.state === 'closed') {
                          archivedIssues.push(issue)
                        } else if (issue.milestone.title in milestoneIssues) {
                          milestoneIssues[issue.milestone.title].push(issue)
                        } else {
                          milestoneIssues[issue.milestone.title] = [issue]
                        }
                      } else {
                        backlogIssues.push(issue)
                      }
                    }
                    var readyIssues = []
                    for (var milestoneTitle of Object.keys(milestoneIssues).sort()) {
                      readyIssues.push(...milestoneIssues[milestoneTitle])
                    }

                    var priortize = function(issues) {
                      var highs = []
                      var mids = []
                      var lows = []
                      for (var issue of issues) {
                        if (issue.labels.find(l => l.name === '@high')) {
                          highs.push(issue)
                        } else if (issue.labels.find(l => l.name === '@low')) {
                          lows.push(issue)
                        } else {
                          mids.push(issue)
                        }
                      }
                      highs.push(...mids)
                      highs.push(...lows)
                      return highs
                    }

                    // TODO: remove workaround vue-router 3.0.1 bug where this.$route.query is an empty object
                    var search = location.search.startsWith('?') ? location.search.substring(1) : location.search
                    var query = {}
                    for (var kv of search.split('&')) {
                      var parts = kv.split('=')
                      query[parts[0]] = parts[1]
                    }

                    this.columns = [
                      { name: 'Backlog',
                        collapsed: query.backlog === '0' ? this.backlogIssuesUrl() : false,
                        cards: priortize(backlogIssues)
                      },
                      { name: 'Ready',
                        collapsed: false,
                        cards: priortize(readyIssues)
                      },
                      { name: 'In-progress',
                        collapsed: false,
                        cards: priortize(assignedIssues)
                      },
                      { name: 'Done',
                        collapsed: false,
                        cards: priortize(closedIssues)
                      },
                      { name: 'Archived',
                        collapsed: query.archived === '0' ? this.archivedIssuesUrl() : false,
                        cards: priortize(archivedIssues)
                      }]

                      callback()
                   })
    },
    loadPivotalTracker (projectId, callback) {
      if (this.search_source) {
        this.search_source.cancel('cancel search due to newer request')
        this.search_source = null
      }
      this.search_source = this.$axios.CancelToken.source()

      var token = null
      if (document.cookie) {
        var getCookie = function (name) {
          var parts = ("; " + document.cookie).split("; " + name + "=")
          return parts.length === 2 ? parts[1].split(";")[0] : ''
        }
        token = getCookie('token') // pivotal tracker token
      }
      if (token === null) {
        document.cookie = "token=<change me to pivotal tracer token>; expires=2019-01-01T00:00:00Z; path=/"
      }

      // accepted, delivered, finished, started, rejected, planned, unstarted, unscheduled
      var url = 'https://www.pivotaltracker.com/services/v5/projects/' + projectId + '/stories?filter=state:planned+OR+state:unstarted+OR+state:started+OR+state:finished+OR+state:delivered'
      var headers = {}
      if (token) {
        headers = { 'X-TrackerToken': token }
      }

      this.$axios.get(url, { headers: headers,
                             cancelToken: this.search_source.token })
                 .then(response => {
                    var issues = response.data
                    var backlogIssues = []
                    var unstartedIssues = []
                    var readyIssues = []
                    var inProgressIssues = []
                    var doneIssues = []
                    var archivedIssues = []
                    for (var issue of issues) {
                      if (token) {
                      debug(() => {
                        var lines = []
                        lines.push('ISSUE')
                        for (var kv of Object.entries(issue)) {
                          if (kv[1] === null || typeof kv[1] !== 'object') {
                            lines.push('  ' + kv[0] + ': ' + JSON.stringify(kv[1]))
                          } else {
                            var keys = JSON.stringify(Object.keys(kv[1]))
                            keys = keys.replace('["', '{').replace(/","/g, ', ').replace('"]', '}')
                            lines.push('  ' + kv[0] + ': ' + keys)
                          }
                        }
                        lines.push('')
                        return lines.join('  |')
                      })
                      }

                      // debug(issue.current_state + ' #' + issue.id + ' (' + issue.estimate + ') ' + issue.name)
                      if (issue.story_type === 'release') {
                        continue
                      }

                      if (['accepted', 'rejected'].includes(issue.current_state)) {
                        archivedIssues.push(issue)
                      } else if (['finished', 'delivered'].includes(issue.current_state)) {
                        doneIssues.push(issue)
                      } else if (issue.current_state === 'unstarted') {
                        if (issue.owner_ids.length) {
                          readyIssues.push(issue)
                        } else {
                          unstartedIssues.push(issue)
                        }
                      } else if (issue.current_state === 'started') {
                        inProgressIssues.push(issue)
                      } else {
                        backlogIssues.push(issue)
                      }
                    }

                    var priortize = function(issues) {
                      var highs = []
                      var mids = []
                      var lows = []
                      for (var issue of issues) {
                        if (issue.labels.find(l => l.name === '@high')) {
                          highs.push(issue)
                        } else if (issue.labels.find(l => l.name === '@low')) {
                          lows.push(issue)
                        } else {
                          mids.push(issue)
                        }
                      }
                      highs.push(...mids)
                      highs.push(...lows)
                      return highs
                    }

                    // TODO: remove workaround vue-router 3.0.1 bug where this.$route.query is an empty object
                    var search = location.search.startsWith('?') ? location.search.substring(1) : location.search
                    var query = {}
                    for (var kv of search.split('&')) {
                      var parts = kv.split('=')
                      query[parts[0]] = parts[1]
                    }

                    this.columns = [
                      { name: 'Backlog',
                        collapsed: query.backlog === '0' ? this.backlogIssuesUrl() : false,
                        cards: priortize(unstartedIssues)
                      },
                      { name: 'Ready',
                        collapsed: false,
                        cards: priortize(readyIssues)
                      },
                      { name: 'In-progress',
                        collapsed: false,
                        cards: priortize(inProgressIssues)
                      },
                      { name: 'Done',
                        collapsed: false,
                        cards: priortize(doneIssues)
                      },
                      { name: 'Archived',
                        collapsed: query.archived === '0' ? this.archivedIssuesUrl() : false,
                        cards: priortize(archivedIssues)
                      }]

                      callback()
                   })
    }
  }
}
</script>

<style scoped>
.kanban-board {
  background-color: #fffdf8;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
a {
  text-decoration: none;
  color: #0000e0;
}
a:visited {
  color: #8000e0;
}
ul {
  margin-top: 2px;
  margin-bottom: 5px;
}
</style>
