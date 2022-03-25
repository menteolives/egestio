
<template>
  <div class="proposalnew">
      <navbar/>
      <div class="container">
    <h1>Nueva propuesta</h1>
    <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Título</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Título de la propuesta">
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="1000"></textarea>
</div>
    </div>
  </div>
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

