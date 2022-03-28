<template>
  <div class="taskdet">
      <navbar/>
      <div class="container">
    
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div><b>{{task.title}}</b><br>
        <small>
          <span class="text-muted">Responsable</span> {{ task.do_user}} 
          <span class="text-muted">Entrega</span> {{task.due_date}}
          </small>
        </div>
        <router-link :to="'/task/edit/'+task.id" tag="button" class='btn btn-sm btn-primary'>
          <i class='fa-solid fa-pen'></i>
        </router-link>
      </div>
        <div class="card-body">
            
            <div v-html="task.text"></div>
            <small class='text-muted'>{{task.created_user}} {{ task.created_date }}</small>
            
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
