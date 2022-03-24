import Vue from 'vue'
//import VueRouter from 'vue-router'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import store from '@/store/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/proposals',
    name: 'proposals',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProposalsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  //mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  //comprueba si es necesaria autenticación
  //y, de ser así, si el usuario tienen permisos para acceder
  
  
  if(to.matched.some(record=>record.meta.requiresAuth)) {
    if(store.state.session) {
      //tiene acceso console.log("tiene acceso");
      console.log("Existe sesión, puede continuar", store.state.session);
      next();
    } else {
      console.log("Datos de sesión inexistentes, intenta reactivar via token");
      if(localStorage.getItem('token')) {
        store.state.user_token = localStorage.getItem('token');
        store.dispatch("checkToken");
      } else {
        console.log("no tiene acceso");
        next({path:'/login'})
      }

    }
  }
  next();
})

export default router
