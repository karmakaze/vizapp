<template>
  <div :style="style()">
    <div>{{ card.fields.name }}</div>
    <ul>
      <li v-for="item in card.fields.items" :key="item.name">
        <text-value type="string" :value="item.name"></text-value>
        <text-value v-if="item.done" type="date" :value="item.done"></text-value>
      </li>
    </ul>
    <tags :tags="card.fields.tags"></tags>
    <div>Created: <text-value :type="'date'" :value="card.created_at"></text-value></div>
    <div>Updated: <text-value :type="'date'" :value="card.updated_at"></text-value></div>
  </div>
</template>

<script>
export default {
  props: ['card'],
  data () {
    return {
      selecteditem: {}
    }
  },
  methods: {
    item (option, value) {
      // console.log('item(option=' + option + ', value=' + JSON.stringify(value) + ')')
      return value
    },
    selected (item) {
      this.selecteditem = item
    },
    style () {
      var style = {
        'border-style': 'solid',
        'color': '#800080',
        'background-color': this.card.fields.bgcolor
      }
      return style
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
