<template>
  <div class="projects">
    <navbar/>
    <div class="container p-1">
    <div class="d-flex justify-content-between">
      <div></div>
    <router-link to="/project/edit" tag="button" class='btn'><font-awesome-icon icon="plus" class='text-success' /></router-link>
    </div>
    <div>
 
 <div>
  <div class="list-group">
  <router-link :to="'/project/det/'+project.id" v-for="project in projects" v-bind:key="project.id" 
  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
    <span><font-awesome-icon :icon="project.icon" fixed-width /> {{ project.name }}</span> 
    <span class="badge badge-secondary badge-pill">{{project.tasks_num}}</span>
  </router-link>
  
</div>
</div>


</div>
  </div></div>
</template>

<script>
import Navbar from '@/components/_layout/NavbarPrivate';

export default {
  name: 'ProjectsView',
  components: {
    Navbar
  },
  data() {
      return {
          apiServer: process.env.VUE_APP_RUTA_API,
          
      }
  },
  computed: {
    projects: function() {
      console.log(this.$store.state.projects)
          return this.$store.state.projects
      },
  },
  created() {
    //this.$store.dispatch("loadProjects")
  },
  mounted() {
      
  }
};
</script>