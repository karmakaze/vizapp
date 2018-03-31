import Vue from 'vue'
import Router from 'vue-router'
import KanbanBoard from "@/components/KanbanBoard"
import Search from "@/components/Search"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", name: "Search", component: Search },
    { path: "/:repoOwner/:repoName", name: "KanbanBoard", component: KanbanBoard }
  ]
})
