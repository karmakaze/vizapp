<template>
  <div>
    <h4>Items of type {{ type() }}</h4>
    <ul>
      <template v-for="item of items">
        <li :key="item.id" v-html="itemText(item)"/>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: [],
  created() {
    this.load()
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    type() {
      return this.$route.params.type || 'category'
    },
    itemText(item) {
      if (this.type() === 'category') {
        return `<a href="/#/types/${item.name}/items">${item.name}</a>`
      }
      return item.name
    },
    load() {
      let xhr = new XMLHttpRequest()
      let url = `https://items.ispecsdb.com/types/${this.type()}/items`
      xhr.open('GET', url)
      xhr.onload = () => {
        if (xhr.status === 200 && xhr.responseText) {
          this.items = JSON.parse(xhr.responseText)
        }
      }
      xhr.send()
      console.log('Loading ' + url)
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
