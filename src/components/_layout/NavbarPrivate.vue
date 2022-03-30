<template>
  <div>
    <nav>
      <b-button v-b-toggle.sidebar-1 variant="link"><i class='fa-solid fa-bars'></i></b-button>
      <router-link to="/proposals">Propuestas</router-link> | 
      <router-link to="/projects">Proyectos</router-link> | 
      <router-link to="/tasks">Tareas</router-link> | 
      <router-link to="/logout">Salir</router-link> | 
      
    </nav>
    
    <b-sidebar id="sidebar-1" v-b-visible.350="visibleHandler" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div>


    
    </template>
<script>

</script>