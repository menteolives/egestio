import Vue from 'vue'
//import VueRouter from 'vue-router'
import VueRouter from 'vue-router'
import store from '@/store/store';
import axios from "axios";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/public/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/public/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: {
      // eslint-disable-next-line
      beforeRouteEnter(to,from,next) {
       
          console.log(from);
          localStorage.clear();
          store.state.session = null;
          next('/');
        
      }
    }
  },
  {
    path: '/tokenlogin/:token',
    name: 'tokenlogin',
    component: {
      // eslint-disable-next-line
      beforeRouteEnter(to,from,next) {
        //console.log(to);
        var token = to.params.token;
        //console.log(token);
        const ENDPOINT_PATH =  process.env.VUE_APP_RUTA_API+"token/"+token;
        //console.log(ENDPOINT_PATH);
        axios.get(ENDPOINT_PATH).then((result) => {
          //guarda los datos de sesión
          //console.log(result)
          if(result.data.status == "success" )
          {
              store.state.session = result.data.data;
              localStorage.setItem('token',token);
              //console.log(store.state.session);
              next("main");
          }
          else {
              //console.log("ir a login");
              next("login");
          }
          
         
        })
       
      }
    }
    
  },
  {
    path: '/proposals',
    name: 'proposals',
    component: () => import(/* webpackChunkName: "about" */ '../views/private/ProposalsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/proposal/det/:id',
    name: 'proposarldet',
    component: () => import(/* webpackChunkName: "about" */ '../views/private/ProposalDetView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '../views/private/MainView.vue'),
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
    component: () => import(/* webpackChunkName: "about" */ '../views/public/AboutView.vue')
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
