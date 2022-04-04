import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    projects: [],
    users: [],
    task_comments: [],
    session: null
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    SET_USERS(state,users) {
      state.users = users
    },
    SET_TASKS(state,tasks) {
      state.tasks = tasks
    },
    SET_TASK_COMMENTS(state,comments) {
      state.task_comments = comments
    },
    SET_PROJECTS(state,projects) {
      state.projects = projects
    },
    addNewTask(state,task) {
      state.tasks.push(task)
    }
  },
  actions: {
    async loadUsers({ commit }) {
      var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "users";
      var AxiosOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      axios
      .get(ENDPOINT_PATH,AxiosOptions)
      .then((result) => {
          commit('SET_USERS',result.data.users);
          //this.state.users = result.data.users
          
          
      })
    },
    async loadTasks({commit}) {
      var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API+"tasks";
      var AxiosOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      axios
      .get(ENDPOINT_PATH,AxiosOptions)
      .then((result) => {
          commit('SET_TASKS',result.data.tasks);
          console.log(result.data.tasks);
          
      })
    },
    async loadTaskComments({commit}, task_id) {
      //carga los comentarios
      
      var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API+"task/comments/"+task_id;
      var AxiosOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      axios
      .get(ENDPOINT_PATH,AxiosOptions)
      .then((result) => {
          commit('SET_TASK_COMMENTS',result.data.comments);
          console.log(result.data);
          //this.comments = result.data.comments
          
        //this.tasks = result.data.tasks;
      })
    },
    async loadProjects({commit}) {
      var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API+"projects";
      var AxiosOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      axios
      .get(ENDPOINT_PATH,AxiosOptions)
      .then((result) => {
         commit('SET_PROJECTS',result.data.projects);
          //this.$store.state.projects = result.data.projects
          //console.log(result.data.projects)
        //this.projects = result.data.projects;
      })
    },
    async checkToken(context) {
      try {
        console.log("API CONNECTION!!! intentando recuperar los datos de usuario según su token");
        console.log("Api, comprueba este token ->", context.state.user_token);
        var optionAxios = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "token/"+context.state.user_token;
      
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
