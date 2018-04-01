// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SearchBar from '@/components/SearchBar'
import SearchResult from '@/components/SearchResult'
import ListDetail from '@/components/ListDetail'
import ItemList from '@/components/ItemList'
import ItemDetail from '@/components/ItemDetail'
import TextValue from '@/components/TextValue'
import KaizenBoard from '@/components/KaizenBoard'
import KanbanBoard from '@/components/KanbanBoard'
import KanbanColumn from '@/components/KanbanColumn'
import KanbanCard from '@/components/KanbanCard'
import ListsCards from '@/components/ListsCards'
import ListsCard from '@/components/ListsCard'
import Tags from '@/components/Tags'

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

Vue.component('search-bar', SearchBar)
Vue.component('search-result', SearchResult)
Vue.component('list-detail', ListDetail)
Vue.component('item-list', ItemList)
Vue.component('item-detail', ItemDetail)
Vue.component('text-value', TextValue)

Vue.component('kaizen-board', KaizenBoard)
Vue.component('kanban-board', KanbanBoard)
Vue.component('kanban-column', KanbanColumn)
Vue.component('kanban-card', KanbanCard)
Vue.component('lists-cards', ListsCards)
Vue.component('lists-card', ListsCard)
Vue.component('tags', Tags)

App.router = router

new Vue(App).$mount("#app")
