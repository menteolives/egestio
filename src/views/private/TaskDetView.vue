<template>
  <div class="taskdet">
      <navbar/>
      <div class="container p-0">
     <div class="d-flex justify-content-between align-items-center">
        <div>
          <router-link :to="'/tasks'" tag="button" class='btn btn-sm text-muted'>
          <font-awesome-icon icon="arrow-left" class='text-primary' />
        </router-link>
        </div>
        <div>
        <router-link :to="'/task/edit/'+task.id" tag="button" class='btn btn-sm text-muted'>
          <font-awesome-icon icon="pen" class='text-primary' />
        </router-link>
        </div>
      </div>
    <div class="card">
     
        <div class="card-body">
            <div><h4>{{task.title}}</h4>
            <div class='d-flex justify-content-between'>
              <div>
                <small>
          <font-awesome-icon icon="user" class='text-muted'/> <b>{{ task.do_user}}</b>  
          <font-awesome-icon icon="calendar-check" class='ml-2 text-muted'/> <b>{{task.due_date}}</b>
          </small>
              </div>
              <div>
                <router-link :to="'/project/det/'+task.project_id">
                <small class='text-muted'><font-awesome-icon :icon="task.project_icon"/> {{task.project_name}}</small>
                </router-link>
              </div>
            </div>
        
        </div>
            <div v-html="task.text"></div>
            <div class='d-flex justify-content-between'>
              <div><small class='text-muted'>{{task.created_user}} {{ task.created_date }}</small></div>
              
            </div>
            
            
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
          //task_id: this.$route.params.id,
          task: [],
          newTaskComment: ""
      }
  },
  components: {
    Navbar
  },
  computed: {
     comments: function() {
          return this.$store.state.task_comments
      },
  },
  created() {
    
    this.task = this.$store.state.tasks[this.$route.params.id];
    this.$store.dispatch("loadTaskComments",this.task.id)
    console.log(this.comments)
    //this.task = 
  },
  mounted() {
      //this.task = this.$store.state.tasks[this.task_id];
      //console.log(this.$store.state.tasks[this.task_id])


      
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
      params.append('task_id', this.task.id);
      params.append('comment_text', this.newTaskComment);
      axios.post(ENDPOINT_PATH , params, optionAxios).then((result) => {
        console.log(result);
      });
    }
  }
};
</script>
