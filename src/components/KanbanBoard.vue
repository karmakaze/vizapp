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
      var accountId = 3
      var className = 'Column'
      this.$axios.get('http://appdat.info:4123/api/objects/?account_id=' + accountId + '&project_id=' + this.$route.params.project_id + '&class=' + className,
                      {cancelToken: this.search_source.token})
                 .then(response => { this.columns = response.data.sort((a, b) => a.fields.rank - b.fields.rank) })
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
