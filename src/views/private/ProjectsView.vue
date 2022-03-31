<template>
  <div class="projects">
    <navbar/>
    <div class="container">
    <h1>Proyectos</h1>
    <router-link to="/project/edit" tag="button" class='btn btn-primary'>Nuevo proyecto</router-link>
    <div>
 
 <div>
  <div class="list-group">
  <router-link :to="'/project/det/'+project.id" v-for="project in projects" v-bind:key="project.id" class="list-group-item list-group-item-action">
    <i :class="'fa-solid fa-'+ project.icon"></i> {{ project.name }} <font-awesome-icon icon="trash" />
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