<template>
  <div class="projects">
    <navbar/>
    <div class="container">
    <h1>Proyectos</h1>
    <router-link to="/project/edit" tag="button" class='btn btn-primary'>Nuevo proyecto</router-link>
    <div>
 
 <div>
  x
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
  }
};
</script>