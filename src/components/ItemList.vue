<template>
  <div>
    <div>
      <template v-for="item of items">
        <div :key="fieldValue(item, keyfield)" v-on:click="selected(item)" style="border-style: solid; margin-top: 0.2em" :style="selectedStyle(item === selecteditem)">
          <template v-for="field of fields">
            <div v-for="(type, name) of field" :key="name" style="display: inline-block; vertical-align: top; margin-left: 0.2em; margin-right: 0.2em;">
              <template v-if="type === 'literal'">{{ name }}</template>
              <template v-else-if="type === 'date'">{{new Date(fieldValue(item, name)).toLocaleDateString('en-CA')}}</template>
              <template v-else-if="type.match(/^\{.*\}$/)">
                <ul>
                  <li v-for="(value, key) of fieldValue(item, name)" :key="key">{{key}}: {{value}}</li>
                </ul>
              </template>
              <template v-else-if="type.match(/^\[.*\]$/)">
                <ul>
                  <li v-for="value of fieldValue(item, name)" :key="value">{{value}}</li>
                </ul>
              </template>
              <template v-else>{{fieldValue(item, name)}}</template>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items', 'selecteditem', 'selectedcolor', 'keyfield', 'fields'],
  methods: {
    selected (item) {
      this.$emit('selected', item)
    },
    selectedStyle (selected) {
      if (selected) {
        return {'color': this.selectedcolor}
      } else {
        return {}
      }
    },
    fieldValue (item, attribute) {
      var value = item
      var attrs = attribute.split('.')
      attrs.forEach(attr => {
        value = value[attr]
      })
      return value
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
