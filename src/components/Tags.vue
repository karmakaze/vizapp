<template>
  <div>
    <template v-for="tag of tags">
      <div :key="tag" v-on:click="selected(tag)" class="tag" :style="selectedStyle(tag, tag === selectedtag)">{{ tag }}</div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['tags', 'selectedtag', 'selectedcolor'],
  methods: {
    selected (item) {
      this.$emit('selected', item)
    },
    selectedStyle (tag, selected) {
      if (selected) {
        return {'color': this.selectedcolor}
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.tag {
  display: inline-block;
  background-color: #ffe000;
  vertical-align: top;
  padding: 0.1em 0.2em 0.1em 0.2em;
  margin-left: 0.2em;
  margin-right: 0.2em;
}
a {
  text-decoration: none;
  color: #0000e0;
}
a:visited {
  color: #8000e0;
}
</style>
