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
      <ul class="list-group list-group-flush">
           <li v-for="comment in comments" v-bind:key="comment.comment_id" class="list-group-item d-flex">
             <div>
               <div class="border border-success rounded-circle mr-2 text-center align-middle text-success" style='font-weight:bold;width:50px;height:50px;line-height:35px;font-size:40px;border-width:4px !important;'><span>m</span></div>
             </div>
             <div>
             <small><b>{{comment.created_user}}</b> {{comment.created_date}}</small> <br> 
             {{comment.text}} 
             </div>
           </li>
        </ul>
      <div class="card-body">
         
        
        <textarea maxlength="500" v-model="newTaskComment" class='border-0 w-100' placeholder="Comentar"></textarea>
        <button class='btn btn-sm btn-primary' v-on:click="btnComentSaveClick">Comentar</button>
      </div>
    </div>
    </div>
  </div>
</template>
<style scoped>
textarea {
   border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
}
</style>
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
          comments: [],
          newTaskComment: ""
      }
  },
  components: {
    Navbar
  },
  mounted() {
      this.task = this.$store.state.tasks[this.task_id];
      console.log(this.$store.state.tasks[this.task_id])


      //carga los comentarios
      var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = this.apiServer+"task/comments/"+this.task_id;
      var AxiosOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      axios
      .get(ENDPOINT_PATH,AxiosOptions)
      .then((result) => {
          this.comments = result.data.comments
          console.log(result);
        //this.tasks = result.data.tasks;
      })
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
