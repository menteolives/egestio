import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async checkToken(context) {
      try {
        console.log("API CONNECTION!!! intentando recuperar los datos de usuario según su token");
        console.log("Api, comprueba este token ->", context.state.user_token);
        var optionAxios = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const ENDPOINT_PATH = "https://api.hormirapit.com/v2/user/"+context.state.user_token;
      
        const params = new URLSearchParams();
        //params.append('username', this.user);
        //params.append('password', this.pass);
        axios.get(ENDPOINT_PATH , params, optionAxios).then((result) => {
          //guarda los datos de sesión
          this.state.session = result.data
          console.log("RESPUESTA API, el usuario puede seguir según su token", result.data);
          //guarde en local storage el token para recordar próximas entradas
          //localStorage.setItem('token',result.data.token);
          //this.$router.push('day');
          
          

        })
      }
      catch (error) {
        console.log('Error: ', error);
        //next({ name: 'Login' });
        this.$router.push('home');
      }
    }
  },
  modules: {
  }
})
