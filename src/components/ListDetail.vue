<template>
  <div>
    <div style="display: inline-block; vertical-align: top; margin-top: 1.15em;">
      <item-list :items="items" :selecteditem="selecteditem" :selectedcolor="selectedcolor" :keyfield="listkey" :fields="listfields" @selected="selected"></item-list>
    </div>
    <div style="display: inline-block; vertical-align: top;">
      <item-detail :item="item" :title="itemtitle" :fields="itemfields" :maxwidth="itemmaxwidth" :bordercolor="selectedcolor"></item-detail>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items', 'selecteditem', 'listkey', 'listfields', 'itemtitle', 'itemfields', 'selectedcolor', 'itemmaxwidth'],
  data () {
    return {
      item: {}
    }
  },
  methods: {
    selected (item) {
      this.item = item
      this.$emit('selected', item)
    }
  }
}
</script>

<style scoped>
</style>
