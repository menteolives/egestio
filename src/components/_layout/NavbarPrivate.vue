<template>
 
  <div>
    <b-sidebar id="sideBar1" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
    <nav class='p-1'>
      <b-button @click="openSidebar" variant="link"><font-awesome-icon icon="bars" /> </b-button>
      <router-link to="/proposals"><font-awesome-icon :icon="['far', 'hand-point-up']" /> Propuestas</router-link> ·  
      <router-link to="/projects">Proyectos</router-link> ·
      <router-link to="/tasks">Tareas</router-link> ·
      <router-link to="/logout">Salir</router-link>  
    </nav>
    
   
  </div>


    
    </template>
<script>
export default {
  name: "NavbarPrivate",
  methods: {
    openSidebar() {
      this.$root.$emit('bv::toggle::collapse', 'sideBar1')
    }
  }
};
</script>