<template>
  <div class="project">
    <navbar/>
    <div class="container">
    <h1>{{ project.name }}</h1>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/_layout/NavbarPrivate';

export default {
  name: 'ProjectDetView',
  components: {
    Navbar
  },
  data() {
      return {
          project_id: this.$route.params.id,
          project: []
      }
  },
  mounted() {
      this.project = this.$store.state.projects[this.project_id];
  }
};
</script>