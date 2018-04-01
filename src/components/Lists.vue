<template>
  <div>
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

    <lists-cards :items="lists" :selecteditem="selecteditem" :listkey="'name'" :listfields="[{'fields.name':'string'}]" @selected="selected"
                 :itemtitle="'fields.name'" :itemfields="[{'fields.name':'string'}, {'fields.items':'[{string:string}]'}, {'state':'string'}, {'fields.tags':'[string]'}, {'created_at':'date'}, {'updated_at':'date'}]"
                 :selectedcolor="'#0080c0'" :itemmaxwidth="'500px'"></lists-cards>
  </div>
</template>

<script>
export default {
  created () {
    this.load()
  },
  data () {
    return {
      lists: []
    }
  },
  methods: {
    load () {
      if (this.search_source) {
        this.search_source.cancel('cancel search due to newer request')
        this.search_source = null
      }
      this.search_source = this.$axios.CancelToken.source()
      var accountId = 1
      var projectId = 4
      var className = 'List'
      this.$axios.get('/api/objects/?account_id=' + accountId + '&project_id=' + projectId + '&class=' + className,
                      {cancelToken: this.search_source.token})
                 .then(response => { this.lists = response.data })
    }
  }
}
</script>

<style scoped>
</style>
