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
      var accountId = 3
      var projectId = 3
      var className = 'Board'
      this.$axios.get('http://appdat.info:4123/api/objects/?account_id=' + accountId + '&project_id=' + projectId + '&class=' + className,
                      {cancelToken: this.search_source.token})
                 .then(response => { this.boards = response.data; this.dragulaContainers(this) })
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
</style>
