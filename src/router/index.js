import Vue from 'vue'
import Router from 'vue-router'
import ReadMe from "@/components/ReadMe"
import TypeItems from "@/components/TypeItems"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", name: "ReadMe", component: ReadMe },
    { path: "/types/:type/items", name: "type", component: TypeItems }
  ]
})
