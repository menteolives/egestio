
<template>
  <div class="taskedit">
      <navbar/>
      <div class="container">
    
    <div class="mb-1">
  <label class="form-label">Tarea</label>
  <input type="text" class="form-control" name="title" maxlength="150" placeholder="Título de la tarea" v-model="task_title">
  
</div>
<div class="mb-1">
  <label class="form-label">Proyecto</label>
  {{ project_id }}
  <b-form-select
      v-model="project_id"
      :options="projects"
      
      value-field="id"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>


</div>
<div class="row mb-1">
  <div class="col">
    <label class="form-label">Quien</label>
      <b-form-select
      v-model="task_do_user"
      :options="users"
      
      value-field="user_name"
      text-field="user_name"
      disabled-field="notEnabled"
    ></b-form-select>
  </div>
  <div class="col">
    <label class="form-label">Cuando</label>
    <input type="date" class="form-control" name="due_date" v-model="task_due_date">
  </div>
</div>
<div class="mb-1">
  <label class="form-label">Descripción</label>
  
  <vue-editor v-model="task_text" :editor-toolbar="editorToolbar" ></vue-editor>
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
      users: this.$store.state.users,
      editMode: "",
      task: [],
      type:"task",
      task_id: 0,
      task_title: "",
      task_text: "",
      task_type: "task",
      task_due_date: "",
      task_do_user:"",
      project_id: "",
      projects: this.$store.state.projects,
      editorToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ]
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
      this.editMode = "insert";
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
      this.project_id = this.task.project_id;
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
      params.append('project_id', this.project_id);
      console.log(this.project_id);
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

