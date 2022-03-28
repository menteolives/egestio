
<template>
  <div class="taskedit">
      <navbar/>
      <div class="container">
    <h1>Nueva tarea</h1>
    <div class="mb-3">
  <label class="form-label">Título</label>
  <input type="text" class="form-control" name="title" maxlength="150" placeholder="Título de la tarea" v-model="task_title">
  
</div>
<div class="row mb-3">
  <div class="col">
    <label class="form-label">Quien</label>
    <input type="text" class="form-control" maxlength="15" name="do_user" v-model="task_do_user">
    
  </div>
  <div class="col">
    <label class="form-label">Cuando</label>
    <input type="date" class="form-control" name="due_date" v-model="task_due_date">
  </div>
</div>
<div class="mb-3">
  <label class="form-label">Descripción</label>
  
  <vue-editor v-model="task_text"></vue-editor>
</div>

<button class='btn btn-success btn-block' v-on:click="btnSaveClick">Guardar</button>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/_layout/NavbarPrivate';
import { VueEditor } from "vue2-editor";
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      apiServer: process.env.VUE_APP_RUTA_API,
      editMode: "",
      task: [],
      type:"task",
      task_id: 0,
      task_title: "",
      task_text: "",
      task_type: "task",
      task_due_date: "",
      task_do_user:""
    }
    
  },
  components: {
    Navbar,
    VueEditor
  },
  mounted() {
    console.log(this.$route)
    console.log(this.$route.params.id);
    if(this.$route.params.id == undefined) {
      this.editMode = "insert"
    }
    else {
      this.editMode = "update"
      this.task_id = this.$route.params.id
      this.task = this.$store.state.tasks[this.task_id];
      this.task_title = this.task.title;
      this.task_text = this.task.text;
      this.task_type = this.task.type;
      this.task_due_date = this.task.due_date;
      this.task_do_user = this.task.do_user;
    }
    console.log(this.editMode);
    console.log(this.task);
    //console.log(this.$router.params.id == undefined);
    /*if(this.$router.params.id)
    console.log(this.$router.params.id);
    else console.log("no")*/
  },
  methods: {
    btnSaveClick: function() {
      var user_token = localStorage.getItem('token')

       var optionAxios = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${user_token}`
            }
        }
      // var user_token = localStorage.getItem('token')
      var ENDPOINT_PATH = this.apiServer+"task";
      
     console.log(ENDPOINT_PATH);
      const params = new URLSearchParams();
      params.append('task_id', this.task_id);
      params.append('edit_mode', this.editMode);
      params.append('task_type', this.task_type);
      params.append('task_title', this.task_title);
      params.append('task_text', this.task_text);
      params.append('task_due_date', this.task_due_date);
      params.append('task_do_user', this.task_do_user);
      console.log(this.title);
      /*
      const params = {
        task_id: this.task_id,
        edit_mode: this.editMode,
        task_type: this.task_type,
        task_title: this.task_title,
        task_text: this.task_text
      }*/
      console.log(this.editMode);
      axios.post(ENDPOINT_PATH , params, optionAxios).then((result) => {
        console.log(result);
        
        this.$router.push("/task/det/"+this.task_id);
      })
    }
  }
};
</script>

