<template>
  <div class="about">
    <navbar/>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import Navbar from '@/components/_layout/NavbarPublic';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>