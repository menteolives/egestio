<template>
  <div class="project">
    <navbar/>
    <div class="container p-1">
    <h5><font-awesome-icon v-if="project.icon" :icon="project.icon"/> {{ project.name }}</h5>
     <div class="list-group">
  <router-link :to="'/task/det/'+task.id" v-for="task in project_tasks" v-bind:key="task.id" class="list-group-item list-group-item-action p-1">
    
    {{ task.title }}
    <div class='d-flex justify-content-between'>
      <div>
        <small>{{task.do_user}} {{task.due_date}}</small>
      </div>
      <div>
        <small class='text-muted'><font-awesome-icon v-if="task.project_icon" :icon="task.project_icon"/> {{task.project_name}}</small>
      </div>
      </div>
  </router-link>
  
</div>
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
  computed: {
   project_tasks() {
     return Object.values(this.tasks).filter(task => task.project_id === this.project_id)
   },
    tasks() {
        return this.$store.state.tasks
    }
  },
  mounted() {
      this.project = this.$store.state.projects[this.project_id];
      
  }
};
</script>