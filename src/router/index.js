import Vue from 'vue'
import Router from 'vue-router'
import TypeItems from "@/components/TypeItems"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", name: "Home", component: TypeItems, props: {type: 'category'} },
    { path: "/types/:type/items", name: "Type", component: TypeItems }
  ]
})
