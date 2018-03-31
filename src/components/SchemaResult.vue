<template>
  <div>
    <div>Classes</div>
    <hr/>
    <list-detail :items="classes" :selecteditem="selecteditem" :selectedcolor="'#0080c0'" :listkey="'name'" :listfields="[{'name':'string'}]" @selected="selected"
                 :itemtitle="'name'" :itemfields="[{'name':'string'}, {'states':'[string]'}, {'fields':'{string:string}'}, {'created_at':'date'}, {'updated_at':'date'}]"></list-detail>
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
      classes: [],
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
      var accountId = this.$route.params.project_id === '3' ? 3 : 1
      this.$axios.get('http://appdat.info:4123/api/classes/?account_id=' + accountId + '&project_id=' + this.$route.params.project_id,
                      {cancelToken: this.search_source.token})
                 .then(response => { this.classes = response.data })
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
ul {
  margin-top: 2px;
  margin-bottom: 5px;
}
</style>
