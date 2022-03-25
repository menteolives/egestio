<template>
  <div class="proposals">
    <navbar/>
    <div class="container">
    <h1>Propuestas</h1>
    <router-link to="/proposal/new" tag="button" class='btn btn-primary'>Nueva propuesta</router-link>
    <div>
 
 <div>
  <b-tabs>
    <b-tab active>
      <template #title>
        <i class='fa-solid fa-question'></i> Votar
      </template>
      <p class="p-3">Tab contents 1</p>
    </b-tab>

    <b-tab>
      <template #title>
        <i class='fa-solid fa-check text-success'></i> Aprobado
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

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>