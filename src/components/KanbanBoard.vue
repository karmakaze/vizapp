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

      var repoOwner = 'karmakaze'
      var repoName = 'ZenBoard'
      var authorization = 'token 5ae22a48ecb6d0b77c3564952b6da29648d2f7f1'

      this.$axios.get('https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
                      { headers: { 'Authorization': authorization },
                        cancelToken: this.search_source.token })
                 .then(response => {
                    var colors = ['#c0c0c0', '#c0f0f0', '#f0c0f0', '#f0f0c0', '#f0c0c0', '#c0f0c0', '#c0c0f0']
                    var issues = response.data
                    for (var issue of issues) {
                      console.log('ISSUE: {')
                      for (var kv of Object.entries(issue)) {
                        console.log('  ' + kv[0] + ': ' + JSON.stringify(kv[1]))
                      }
                      console.log('}')
                      issue.bgcolor = colors[Math.floor(Math.random() * colors.length)]
                    }
                    this.columns = [
                      { name: 'Backlog',
                        cards: issues
                      },
                      { name: 'Ready',
                        cards: issues
                      },
                      { name: 'In-progress',
                        cards: issues
                      },
                      { name: 'Done',
                        cards: issues
                      },
                      { name: 'Archived',
                        cards: issues
                      }]
                   })
    },
    selected (item) {
      this.selecteditem = item
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
