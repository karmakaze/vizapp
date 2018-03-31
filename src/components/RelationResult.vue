<template>
  <div>
    <div>Relations</div>
    <hr/>
    <list-detail :items="relations" :selecteditem="selecteditem" :selectedcolor="'#c02000'" :listkey="'name'" :listfields="[{'name':'string'}]" @selected="selected"
                 :itemtitle="'name'" :itemfields="[{'subject_class':'string'}, {'cardinality':'string'}, {'object_class':'string'}, {'created_at':'date'}, {'updated_at':'date'}]"></list-detail>
  </div>
</template>

<script>
export default {
  created () {
    this.search(this.terms)
  },
  props: ['terms'],
  data () {
    return {
      name: this.terms,
      relations: [],
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
    search (name) {
      if (this.search_source) {
        this.search_source.cancel('cancel search due to newer request')
        this.search_source = null
      }
      this.search_source = this.$axios.CancelToken.source()
      var accountId = this.$route.params.project_id === '3' ? 3 : 1
      this.$axios.get('http://appdat.info:4123/api/relations/?account_id=' + accountId + '&project_id=' + this.$route.params.project_id,
                      {cancelToken: this.search_source.token})
                 .then(response => { this.relations = response.data })
    },
    selected (item) {
      this.selecteditem = item
    }
  }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #0000e0;
}
a:visited {
    color: #8000e0;
}
</style>
