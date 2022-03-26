<template>
  <div class="tasks">
    <navbar/>
    <div class="container">
    <h1>Tareas</h1>
    <router-link to="/task/edit" tag="button" class='btn btn-primary'>Nueva tarea</router-link>
    <div>
 
 <div>
  <b-tabs>
    <b-tab active>
      <template #title>
        <i class='fa-solid fa-question'></i> En curso
      </template>
      <div class="list-group">
  <router-link :to="'/task/det/'+task.id" v-for="task in tasks" v-bind:key="task.id" class="list-group-item list-group-item-action">
    {{ task.title }}
  </router-link>
  
</div>
    </b-tab>

    <b-tab>
      <template #title>
        <i class='fa-solid fa-check text-success'></i> Finalizadas
      </template>
      <p class="p-3">Tab contents 2</p>
    </b-tab>

    <b-tab>
      <template #title>
        <i class='fa-solid fa-xmark text-danger'></i> Rechazado
      </template>
      <p class="p-3">Tab contents 3</p>
    </b-tab>
  </b-tabs>
</div>


</div>
  </div></div>
</template>

<script>
import Navbar from '@/components/_layout/NavbarPrivate';
import axios from "axios";

export default {
  name: 'TasksView',
  data() {
      return {
          apiServer: process.env.VUE_APP_RUTA_API,
          tasks: []
      }
  },
  components: {
    Navbar
  },
  mounted() {
      var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = this.apiServer+"tasks";
      var AxiosOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      axios
      .get(ENDPOINT_PATH,AxiosOptions)
      .then((result) => {
          this.$store.state.tasks = result.data.tasks
          console.log(result.data.tasks)
        this.tasks = result.data.tasks;
      })
  }
};
</script>