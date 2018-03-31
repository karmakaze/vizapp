import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Schema from "@/components/Schema"
import Kanban from "@/components/Kanban"
import Search from "@/components/Search"
import Lists from "@/components/Lists"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", name: "HelloWorld", component: HelloWorld },
    { path: "/", name: "Search", component: Search },
    { path: "/schema/:project_id", name: "Schema", component: Schema },
    { path: "/lists/:project_id", name: "Lists", component: Lists },
    { path: "/kanban/:project_id", name: "Kanban", component: Kanban }
  ]
})
