<template>
  <div class="kanban-board" style="width: 100%; display: flex; flex-direction: row;">
    <template v-for="(column, i) of columns">
      <kanban-column :column="column" :add="i == 0" :key="column.name" style="flex: 1;"></kanban-column>
    </template>
  </div>
</template>

<script>
export default {
  created () {
    this.search(this.terms)
  },
  props: ['board'],
  data () {
    return {
      name: this.terms,
      columns: [],
      search_source: null,
      selecteditem: {}
    }
  },
  watch: {
    terms (newValue, oldValue) {
      this.search(newValue)
    },
    name: function (name) {
      this.search(name)
    }
  },
  methods: {
    search: function (name) {
      if (this.search_source) {
        this.search_source.cancel('cancel search due to newer request')
        this.search_source = null
      }
      this.search_source = this.$axios.CancelToken.source()

      var repoOwner = this.$route.params.repoOwner
      var repoName = this.$route.params.repoName
      var authorization = 'token 5ae22a48ecb6d0b77c3564952b6da29648d2f7f1'

      this.$axios.get('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues?filter=all&state=all',
                      { headers: { 'Authorization': authorization },
                        cancelToken: this.search_source.token })
                 .then(response => {
                    var issues = response.data
                    var otherIssues = []
                    var assignedIssues = []
                    var closedIssues = []
                    var archivedIssues = []
                    for (var issue of issues) {
                      console.log('ISSUE: {')
                      for (var kv of Object.entries(issue)) {
                        console.log('  ' + kv[0] + ': ' + JSON.stringify(kv[1]))
                      }
                      console.log('}')
                      if (issue.state === 'closed') {
                        if (issue.labels.find(l => l.name == 'archived')) {
                          archivedIssues.push(issue)
                        } else {
                          closedIssues.push(issue)
                        }
                      } else if (issue.assignee) {
                        assignedIssues.push(issue)
                      } else {
                        otherIssues.push(issue)
                      }
                    }
                    this.columns = [
                      { name: 'Backlog',
                        cards: otherIssues
                      },
                      { name: 'Ready',
                        cards: []
                      },
                      { name: 'In-progress',
                        cards: assignedIssues
                      },
                      { name: 'Done',
                        cards: closedIssues
                      },
                      { name: 'Archived',
                        cards: archivedIssues
                      }]
                   })
                   this.dragulaContainers(this)
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
