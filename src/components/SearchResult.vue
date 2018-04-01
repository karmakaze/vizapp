<template>
  <div>
    <hr/>
    <div style="margin-left: 60px">Title</div>

    <div v-for="title of titles" :key="title.id" style="margin-bottom: 10px; width: 100%; clear: both;">
        <div class="poster" style="float: left;"><img v-if="(title.fields.Poster != 'N/A')" v-bind:src="title.fields.Poster" class="poster" style="margin-right: 5px; margin-bottom: 10px; object-fit: cover;" /></div>
        <div>
            <div>
                <div>
                    <div style="display: inline;"><a v-bind:href="'https://www.imdb.com/title/'+ title.fields.imdbID +'/'">{{title.fields.Title}} ({{title.fields.Year}})</a></div>
                    <div style="float: right;">
                        <div style="display: inline; font-size: 80%; vertical-align: bottom; font-style: italic;"><template v-if="(title.fields.Language != 'N/A' && title.fields.Language != 'English')">({{title.fields.Language}})</template></div>
                        <div style="display: inline; font-size: 80%; vertical-align: bottom; font-style: italic;"><template v-if="(title.fields.Genre != 'N/A')">{{title.fields.Genre}}</template></div>
                        <div style="display: inline;">
                            <span v-if="(title.fields.imdbRating != 'N/A')" style="font-weight: bold; color: #606060">{{title.fields.imdbRating}}</span>
                            <span v-else>-.-</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>{{title.fields.Plot}}</div>
        </div>
    </div>
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
      titles: [],
      search_source: null
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
      this.$axios.get('/api/objects?account_id=1&project_id=2&class=Title&name=' + name,
                      {cancelToken: this.search_source.token})
                 .then(response => { this.titles = response.data })
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
@media all .poster {
  min-width: 48px; min-height: 72px;
      width: 48px;     height: 72px;
  max-width: 48px; max-height: 72px;
  margin-right: 4px;
  margin-bottom: 4px;
}
@media (max-resolution: 96dpi) { /* wide */
  .poster {
    width: 4em; height: 6em;
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
@media (min-resolution: 97dpi) and (min-aspect-ratio: 3/4) { /* square or wide */
  .poster {
    min-width:  8em; min-height: 12em;
        width: 18vh;     height: 27vh;
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
@media (min-resolution: 97dpi) and (max-aspect-ratio: 3/4) { /* tall */
  .poster {
    min-width:  6vh; min-height:  9vh;
        width: 24vw;     height: 36vw;
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
</style>
