<template>
  <div>
    <search-bar @terms="search"></search-bar>
    <search-result :terms="terms"></search-result>
  </div>
</template>

<script>
export default {
  data () {
    return {
      terms: ''
    }
  },
  methods: {
    search (terms) {
      this.terms = terms
    }
  }
}
</script>

<style scoped>
</style>
