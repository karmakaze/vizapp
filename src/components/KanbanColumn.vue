<template>
  <div class="kanban-title-column">
    <template v-if="column.collapsed">
      <div v-if="add" style="margin-left: 0.5em"><a :href="add" target="github_issues">[+]</a></div>
      <div class="collapsed" v-on:click="expandColumn()"><a :href="column.collapsed" target="github_issues" style="color: #606060">{{ column.name.toUpperCase().split('').join('\n') }}</a></div>
    </template>

    <template v-else>
      <div style="text-align: center;">
        <span v-if="add" class="add" style="margin-left: 0.5em"><a :href="add" target="github_issues">[+]</a></span>
        <span style="font-weight: bold">{{ column.name }}</span>
        <span v-if="add" style="margin-left: 0.5em; color: white">[+]</span>
      </div>
      <div class="kanban-column" :style="style()">
        <template v-for="card of column.cards">
          <kanban-card :card="card" :key="card.number"/>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  created () {
    this.search(this.column)
  },
  props: ['column', 'add', 'width'],
  data () {
    return {
      name: this.terms,
      cards: [],
      search_source: null,
      selecteditem: {}
    }
  },
  methods: {
    expandColumn () {
      var columnParam = this.column.name.toLowerCase()
      location.href = location.href.replace(columnParam + '=0', columnParam + '=1')
    },
    search (column) {
      if (this.search_source) {
        this.search_source.cancel('cancel search due to newer request')
        this.search_source = null
      }
      this.search_source = this.$axios.CancelToken.source()
      var accountId = 3
      var projectId = 3
      var className = 'Card'
      this.$axios.get('http://appdat.info:4123/api/objects/?account_id=' + accountId + '&project_id=' + projectId + '&class=' + className,
                      {cancelToken: this.search_source.token})
                 .then(response => { this.cards = response.data })
    },
    selected (item) {
      this.selecteditem = item
    },
    style () {
      return {
        width: this.width,
        'min-height': '700px'
      }
    }
  }
}
</script>

<style scoped>
.collapsed {
  padding-top: 16em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  padding-bottom: 16em;
  width: 1em;
  font-weight: bold;
  text-align: center;
}
.kanban-column {
  background-color: #fffdf8;
}
.kanban-title-column:not(:first-child) {
  border-left: 2px dotted rgba(0, 0, 0, 0.25);
}
.add {
  background-color: #fefdfe;
  padding-left: 0.2em;
  padding-right: 0.2em;
  float: left;
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
