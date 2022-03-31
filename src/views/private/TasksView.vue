<template>
  <div class="tasks">
    <navbar/>
    <div class="container">
    <div class="d-flex justify-content-between">
      <div></div>
    <router-link to="/task/edit" tag="button" class='btn'><i class="fa-solid fa-plus"></i></router-link>
    </div>
    <div>
 
 <div>
    <div class="list-group">
  <router-link :to="'/task/det/'+task.id" v-for="task in tasks" v-bind:key="task.id" class="list-group-item list-group-item-action">
    <div><small class='text-muted'><i :class="'fa-solid fa-'+task.project_icon"></i> {{task.project_name}}</small></div>
    {{ task.title }}
    
  </router-link>
  
</div>
  
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