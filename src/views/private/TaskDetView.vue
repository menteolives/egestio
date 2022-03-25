<template>
  <div class="taskdet">
      <navbar/>
      <div class="container">
    <h1>Detalles de la tarea</h1>
    <div class="card">
        <div class="card-body">
            {{task.title}}
            <p>{{task.text}}</p>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/_layout/NavbarPrivate';

export default {
  name: 'TaskDetView',
  data() {
      return {
          task: []
      }
  },
  components: {
    Navbar
  },
  mounted() {
      this.task = this.$store.state.tasks[0];
      console.log(this.$store.state.tasks[0])
  }
};
</script>
