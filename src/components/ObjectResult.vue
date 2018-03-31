<template>
  <div>
    <div>Objects</div>
    <hr/>
    <list-detail :items="classes" :selecteditem="selecteditem" :listkey="'name'" :listfields="[{'fields.Year':'string'}, {'fields.Title':'string'}]" @selected="selected"
                 :itemtitle="'fields.Title'" :itemfields="[{'fields.Year':'string'}, {'fields.Genre':'string'}, {'fields.Plot':'string'}, {'fields.imdbID':{'link': function(item) { return 'https://www.imdb.com/title/' + item['fields']['imdbID'] + '/' }}}, {'fields.Ratings':'[{string:string}]'}, {'fields.Actors':'string'}, {'fields.Director':'string'}, {'fields.Writer':'string'}, {'fields.Language':'string'}, {'fields.Country':'string'}, {'fields.Poster':'image'}, {'created_at':'date'}, {'updated_at':'date'}]"
                 :selectedcolor="'#0080c0'" :itemmaxwidth="itemmaxwidth"></list-detail>
  </div>
</template>

<script>
export default {
  created () {
    this.search(this.terms)
  },
  props: ['terms', 'itemmaxwidth'],
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
      var accountId = 1
      var className = 'Title'
      this.$axios.get('http://appdat.info:4123/api/objects/?account_id=' + accountId + '&project_id=' + this.$route.params.project_id + '&class=' + className + '&name=' + name,
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
