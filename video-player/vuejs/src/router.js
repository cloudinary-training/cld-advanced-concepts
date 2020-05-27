import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Player from './views/VideoPlayer'
import Tag from './views/VideoTag'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  { 
    path: '/tag',
    component: Tag
  },
  { 
    path: '/player',
    component: Player
  }
 
]
export default new VueRouter({
  routes: routes
});