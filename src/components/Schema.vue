<template>
  <div>
    <search-bar @terms="search"></search-bar>

    <div>
      <hr/>
      <div style="text-align: center;">Schema</div>
      <div style="display: inline-block; vertical-align: top;">
        <schema-result :terms="terms"></schema-result>
      </div>
      <div style="display: inline-block; vertical-align: top;">
        <relation-result :terms="terms"></relation-result>
      </div>
    </div>

    <div>
      <hr/>
      <div style="text-align: center;">Data</div>
      <div style="display: inline-block; vertical-align: top;">
        <object-result :terms="terms" :itemmaxwidth="'500px'"></object-result>
      </div>
    </div>
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
