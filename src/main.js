import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMeta from 'vue-meta';
import {
  BootstrapVue
} from 'bootstrap-vue'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faComputer,
  faFutbol,
  faChampagneGlasses,
  faPlug,
  faTree,
  faPlus,
  faPen,
  faArrowLeft,
  faBars,
  faSailboat,
  faGlobe,
  faUser,
  faCalendarCheck,
  faCheck,
  faShareNodes,
  faCopy
} from '@fortawesome/free-solid-svg-icons'
import {
  faHandPointUp
} from '@fortawesome/free-regular-svg-icons'
import {
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
library.add(faTrash, faComputer, faFutbol, faChampagneGlasses, faPlug, faTree, faPlus, faPen, faArrowLeft, faBars, faHandPointUp, faSailboat, faGlobe, faUser, faCalendarCheck, faCheck, faShareNodes, faWhatsapp, faCopy)
//library.add(faTrash)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import '@fortawesome/fontawesome-free/css/all.css'
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(VueMeta);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')