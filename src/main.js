// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import TypeItems from '@/components/TypeItems'

import axios from 'axios'
import dragula from 'dragula'

Object.defineProperty(Vue.prototype, '$axios', { value: axios })

var drake = dragula([])
Object.defineProperty(Vue.prototype, '$dragula', { value: dragula })
Object.defineProperty(Vue.prototype, '$drake', { value: drake })

drake.on('drop', (el, target, source, sibiling) => {
    // console.log('dropped element [' + el.textContent + '] into [' + target.parentElement.firstChild.textContent + '] from ' + source.parentElement.firstChild.textContent + ' before: ' + (sibiling === null ? null : sibiling.textContent))
    // var cardVue = el.__vue__
    // var targetVue = target.parentElement.__vue__
    // console.log('card vue style: ' + JSON.stringify(cardVue.style()))
    // console.log('target vue style: ' + JSON.stringify(targetVue.style()))
  })

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.component('type-items', TypeItems)

App.router = router

new Vue(App).$mount("#app")
