<template>
  <div style="width: 100%">
    <div>Agilean</div>
    <item-list :items="boards" :keyfield="'fields.name'" :fields="[{'fields.name':'string'}, {'—':'literal'}, {'fields.description':'string'}]"/>
    <template v-for="board of boards">
      <kanban-board :board="board" :itemmaxwidth="'500px'" :key="board.id"></kanban-board>
    </template>

    <div>
      <hr/>
      <div style="text-align: center;">Schema</div>
      <div style="display: inline-block; vertical-align: top;">
        <schema-result></schema-result>
      </div>
      <div style="display: inline-block; vertical-align: top;">
        <relation-result></relation-result>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.load()
  },
  data () {
    return {
      boards: []
    }
  },
  methods: {
    load () {
      if (this.search_source) {
        this.search_source.cancel('cancel search due to newer request')
        this.search_source = null
      }
      this.search_source = this.$axios.CancelToken.source()

      var repoOwner = this.$route.params.repoOwner
      var repoName = this.$route.params.repoName
      var authorization = null
      if (document.cookie) {
        var getCookie = function (name) {
          var parts = ("; " + document.cookie).split("; " + name + "=")
          return parts.length === 2 ? parts[1].split(";")[0] : ''
        }
        authorization = getCookie('ghat')
      } else {
        alert("This free version can only display public repositories e.g. https://kaizenboard.xyz/flutter/flutter")
      }

      this.$axios.get('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues?filter=all&state=all',
                      { headers: { 'Authorization': authorization },
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
                        lines.push('ISSUE: {')
                        for (var kv of Object.entries(issue)) {
                          if (kv[1] === null || typeof kv[1] !== 'object') {
                            lines.push('  ' + kv[0] + ': ' + JSON.stringify(kv[1]))
                          } else {
                            var keys = JSON.stringify(Object.keys(kv[1]))
                            keys = keys.replace('["', '{').replace(/","/g, ', ').replace('"]', '}')
                            lines.push('  ' + kv[0] + ': ' + keys)
                          }
                        }
                        lines.push('}')
                        return lines.join('\n')
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

                    this.columns = [
                      { name: 'Backlog',
                        cards: priortize(backlogIssues)
                      },
                      { name: 'Ready',
                        cards: priortize(readyIssues)
                      },
                      { name: 'In-progress',
                        cards: priortize(assignedIssues)
                      },
                      { name: 'Done',
                        cards: priortize(closedIssues)
                      },
                      { name: 'Archived',
                        cards: priortize(archivedIssues)
                      }]
                   })
                   this.dragulaContainers(this)
    },
    dragulaContainers (vue) {
      setTimeout(() => {
        Object.values(document.querySelectorAll('.kanban-column')).forEach(c => {
          vue.$drake.containers.push(c)
        })
      }, 200)
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
