import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import moment from "moment";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    task: [],
    proposals: [],
    proposal: [],
    projects: JSON.parse(localStorage.getItem('projects')),
    users: JSON.parse(localStorage.getItem('users')),
    task_comments: [],
    session: null
  },
  mutations: {
    /*SET_USERS(state, users) {
      state.users = users
    },*/
    NEW_TASK(state) {
      var task = {
        "do_user": state.session.user_name,
        "project_id": 1,
        "project_icon": "gloge",
        "project_name": "General",
        "title": "",
        "type": "task",
        "due_date": moment().format('YYYY-MM-DD'),
        "tags": []
      }
      state.task = task;

    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    SET_PROPOSALS(state, proposals) {
      state.proposals = proposals
    },
    SET_PROPOSAL(state, proposal) {
      state.proposal = proposal
    },
    SET_TASK(state, task) {
      state.task = task
    },
    SET_TASK_COMMENTS(state, comments) {
      state.task_comments = comments
    }/*,
    SET_PROJECTS(state, projects) {
      state.projects = projects
    }*/
  },
  actions: {
    async loadUsers() {
      var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "users";
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          //commit('SET_USERS', result.data.users);
          localStorage.setItem("users", JSON.stringify(result.data.users));
        })
    },
    newTask({
      commit
    }) {
      commit('NEW_TASK');
    },
    async loadTask({
      commit
    }, task_id) {
      console.log("loadtask", task_id);
      var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "task/" + task_id;
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          commit('SET_TASK', result.data.task);
          console.log(result.data.task);

        })
    },
    async loadTasks({
      commit
    }) {
     var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "tasks";
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          commit('SET_TASKS', result.data.tasks);
          console.log(result.data.tasks);

        })
    },
    async loadProposals({commit}) {
      var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "proposals";
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          commit('SET_PROPOSALS', result.data.proposals);
          console.log(result.data.proposals);

        })
    },
    async loadProposal({commit}, proposal_id) {
      console.log("proposal_id", proposal_id);
      var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "proposal/" + proposal_id;
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          commit('SET_PROPOSAL', result.data.proposal);
          console.log(result.data.proposal);

        })
    },
    async loadTaskComments({
      commit
    }, task_id) {
      //carga los comentarios

      var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "task/comments/" + task_id;
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          commit('SET_TASK_COMMENTS', result.data.comments);
          console.log(result.data);
          //this.comments = result.data.comments

          //this.tasks = result.data.tasks;
        })
    },
    async loadProjects() {
      var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "projects";
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          localStorage.setItem("projects", JSON.stringify(result.data.projects));
          //commit('SET_PROJECTS', result.data.projects);
          //this.$store.state.projects = result.data.projects
          //console.log(result.data.projects)
          //this.projects = result.data.projects;
        })
    },
    // eslint-disable-next-line
    async checkToken(context) {
      try {
        var user_token =localStorage.getItem('token')
        console.log("API CONNECTION!!! intentando recuperar los datos de usuario según su token");
        console.log("Api, comprueba este token ->", user_token);
        var optionAxios = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "token/" + user_token;

        const params = new URLSearchParams();
        //params.append('username', this.user);
        //params.append('password', this.pass);
        axios.get(ENDPOINT_PATH, params, optionAxios).then((result) => {
          //guarda los datos de sesión
          //this.state.session = result.data.session
          console.log("RESPUESTA API, el usuario puede seguir según su token", user_token);
          console.log(result);
          //guarde en local storage el token para recordar próximas entradas
          
          //localStorage.setItem('token',result.data.token);
          //this.$router.push('day');
          
          //if (destination) this.$router.push(destination);



        })
      } catch (error) {
        console.log('Error: ', error);
        //next({ name: 'Login' });
        this.$router.push('home');
      }
    }
  },
  modules: {}
})