import Vue  from 'vue';
import VueRouter from 'vue-router';

import Main from '../views/Main.vue';

Vue.use(VueRouter)

const routes = [
  // 필수 메인 화면
  {
    path: '/', name: 'Main',  component: Main,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes : [
    ...routes,
  ]
})

export default router