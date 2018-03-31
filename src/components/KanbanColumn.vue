<template>
  <div class="kanban-title-column">
    <div style="text-align: center;"><span v-if="add" class="add">+</span>{{column.fields.name}}</div>
    <div class="kanban-column" :style="style()">
      <template v-for="card of cards">
        <template v-if="card.fields.status == column.fields.show_status">
          <kanban-card :card="card" :key="card.id"/>
        </template>
      </template>
    </div>
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
    search: function (column) {
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
        'min-height': '500px'
      }
    }
  }
}
</script>

<style scoped>
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
