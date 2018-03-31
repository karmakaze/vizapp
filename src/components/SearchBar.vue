<template>
  <div style="display: flex; margin-bottom: 0.8em;"><label for="search" style="margin-top: 2px;">Search:</label>&nbsp;<input id="search" v-model="terms" style="flex-grow: 1"/></div>
</template>

<script>
export default {
  name: 'search-bar',
  data: function () {
    return {
      terms: ''
    }
  },
  watch: {
    terms (newValue, oldValue) {
      this.$emit('terms', newValue)
    }
  }
}
</script>

<style scoped>
</style>
