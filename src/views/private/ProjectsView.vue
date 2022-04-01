<template>
  <div class="projects">
    <navbar/>
    <div class="container p-0">
    <div class="d-flex justify-content-between">
      <div></div>
    <router-link to="/project/edit" tag="button" class='btn'><font-awesome-icon icon="plus" class='text-success' /></router-link>
    </div>
    <div>
 
 <div>
  <div class="list-group">
  <router-link :to="'/project/det/'+project.id" v-for="project in projects" v-bind:key="project.id" class="list-group-item list-group-item-action">
    <font-awesome-icon :icon="project.icon" fixed-width /> {{ project.name }} 
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
  name: 'ProjectsView',
  components: {
    Navbar
  },
  data() {
      return {
          apiServer: process.env.VUE_APP_RUTA_API,
          projects: []
      }
  },
  mounted() {
      var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = this.apiServer+"projects";
      var AxiosOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      axios
      .get(ENDPOINT_PATH,AxiosOptions)
      .then((result) => {
          this.$store.state.projects = result.data.projects
          console.log(result.data.projects)
        this.projects = result.data.projects;
      })
  }
};
</script>