<template>
  <div :style="{'max-width': maxwidth}">
    <div v-if="title">{{fieldValue(item, title) || '&nbsp;'}}</div>
    <div :style="boxStyle()">
      <template v-for="field of fields">
        <div v-for="(type, name) of field" :key="name" style="margin-top: 0.4em;">
          <template v-if="name != title">
            <div v-for="(fValue, i) of [fieldValue(item, name)]" :key="name + '-' + i">
              <template v-if="showkeys !== false">{{fieldName(name)}}:</template>
              <template v-if="type === 'date'">{{new Date(fValue).toLocaleDateString('en-CA')}}</template>
              <template v-else-if="type === 'image' && isValidUrl(fValue)"><img :src="fValue" /></template>
              <template v-else-if="type === 'link' && isValidUrl(fValue)"><a :href="fValue">{{fValue}}</a></template>
              <template v-else-if="typeof type === 'object' && type.hasOwnProperty('map')">{{ type['map'](fValue) }}</template>
              <template v-else-if="typeof type === 'object' && type.hasOwnProperty('link')"><a :href="type['link'](item)">{{fValue}}</a></template>
              <template v-else-if="type.match(/^\{.*\}$/)">
                <ul>
                  <li v-for="(value, key) of fValue" :key="key">{{key}} : {{value}}</li>
                </ul>
              </template>
              <template v-else-if="type.match(/^\[.*\]$/)">
                <ul>
                  <li v-for="value of fValue" :key="value">{{value}}</li>
                </ul>
              </template>
              <template v-else>{{fValue}}</template>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'title', 'fields', 'showkeys', 'maxwidth', 'bordercolor'],
  methods: {
    boxStyle () {
      var style = {
        'margin-top': '0.2em'
      }
      if (this.bordercolor) {
        style['border-style'] = 'solid'
        style['color'] = this.bordercolor
      }
      return style
    },
    fieldName (attribute) {
      var attrs = attribute.split('.')
      return attrs[attrs.length - 1]
    },
    fieldValue (item, attribute) {
      var value = item
      var attrs = attribute.split('.')
      attrs.forEach(attr => {
        value = value[attr]
      })
      return value
    },
    isValidUrl (url) {
      return url.startsWith('https:') || url.startsWith('http:') || url.startsWith('data:')
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
