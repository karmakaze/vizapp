<template>
  <div>
    <h4>Items of type {{ type }}</h4>
    <ul>
      <template v-for="item of items">
        <li :key="item.id">{{ item.name }}</li>
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
      type: '',
      items: []
    }
  },
  methods: {
    load() {
      let xhr = new XMLHttpRequest()
      this.type = this.$route.params.type
      let url = `https://items.ispecsdb.com/types/${this.type}/items`
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
