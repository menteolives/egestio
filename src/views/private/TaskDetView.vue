<template>
  <div class="taskdet">
      <navbar/>
      <div class="container">
    
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <router-link :to="'/tasks'" tag="button" class='btn btn-sm text-muted'>
          <i class='fa-solid fa-arrow-left'></i>
        </router-link>
        </div>
        <div>
        <router-link :to="'/task/edit/'+task.id" tag="button" class='btn btn-sm text-muted'>
          <i class='fa-solid fa-pen'></i>
        </router-link>
        </div>
      </div>
        <div class="card-body">
            <div><h4>{{task.title}}</h4>
        <small>
          <span class="text-muted">Responsable</span> <b>{{ task.do_user}}</b> 
          <span class="text-muted"> Entrega</span> <b>{{task.due_date}}</b>
          </small>
        </div>
            <div v-html="task.text"></div>
            <small class='text-muted'>{{task.created_user}} {{ task.created_date }}</small>
            
        </div>
    </div>

    <div class="card mt-3">
      <div class="card-body">
        <textarea maxlength="500" v-model="newTaskComment" class='border-0 w-100' placeholder="Comentar"></textarea>
        <button class='btn btn-sm btn-primary' v-on:click="btnComentSaveClick">Comentar</button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/_layout/NavbarPrivate';
import axios from "axios";

export default {
  name: 'TaskDetView',
  data() {
      return {
        apiServer: process.env.VUE_APP_RUTA_API,
          task_id: this.$route.params.id,
          task: [],
          newTaskComment: ""
      }
  },
  components: {
    Navbar
  },
  mounted() {
      this.task = this.$store.state.tasks[this.task_id];
      console.log(this.$store.state.tasks[this.task_id])
  },
  methods: {
    btnComentSaveClick: function() {
      var user_token = localStorage.getItem('token')

       var optionAxios = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      // var user_token = localStorage.getItem('token')
      var ENDPOINT_PATH = this.apiServer+"comment";
      console.log(ENDPOINT_PATH);
      const params = new URLSearchParams();
      params.append('task_id', this.task_id);
      params.append('comment_text', this.newTaskComment);
      axios.post(ENDPOINT_PATH , params, optionAxios).then((result) => {
        console.log(result);
      });
    }
  }
};
</script>
