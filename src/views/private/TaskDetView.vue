<template>
  <div class="taskdet">
      <navbar/>
      <div class="container">
    <h1>Detalles de la tarea</h1>
    <router-link :to="'/task/edit/'+task.id" tag="button" class='btn btn-primary'>Editar</router-link>
    <div class="card">
        <div class="card-body">
            {{task.title}}
            <p>{{task.text}}</p>
            <small class='text-muted'>{{task.created_user}} {{ task.created_date }}</small>
            <p>{{task.due_date}} {{ task.do_user}}</p>
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
          task_id: this.$route.params.id,
          task: []
      }
  },
  components: {
    Navbar
  },
  mounted() {
      this.task = this.$store.state.tasks[this.task_id];
      console.log(this.$store.state.tasks[this.task_id])
  }
};
</script>
