
<template>
  <div class="taskedit">
      <navbar/>
      <div class="container">
    
    <div class="mb-1">
  <label class="form-label">Tarea</label>
  <input type="text" ref="task_title" class="form-control" name="title" maxlength="150" placeholder="Título de la tarea" v-model="task.title">
  
</div>
<div class="mb-1">
  <label class="form-label">Proyecto</label>
  {{ task.project_id }}
  <b-form-select
      v-model="task.project_id"
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
      v-model="task.do_user"
      :options="users"
      
      value-field="user_name"
      text-field="user_name"
      disabled-field="notEnabled"
    ></b-form-select>
  </div>
  <div class="col">
    <label class="form-label">Cuando</label>
    <input type="date" class="form-control" name="due_date" v-model="task.due_date">
  </div>
</div>
<div class="mb-1">
  <label class="form-label">Descripción</label>
  
  <vue-editor v-model="task.text" :editor-toolbar="editorToolbar" ></vue-editor>
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
      task: {
        "id":"0",
        "title":"x",
        "text":"x",
        "due_date":"",
        "do_user":"",
        "project_id":"",
        "type":"task",
        "project_icon": ""


      },
      //type:"task",
      //task_id: 0,
      //task_title: "",
      //task_text: "",
      //task_type: "task",
      //task_due_date: "",
      //task_do_user:"",
      //project_id: "",
      projects: this.$store.state.projects,
      editorToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ]
    }
    
  },
  computed: {
    users () {
          return this.$store.getters.users
      }
  },
  components: {
    Navbar,
    VueEditor
  },
  created() {
    //comprueba que tengamos los datos necesarios
    if(this.$store.state.projects.length === 0 ) {
      this.$store.dispatch("loadProjects")
    }
  },
  mounted() {
    this.$refs.task_title.focus()
    console.log(this.$route)
    console.log(this.$route.params.id);
    if(this.$route.params.id == undefined) {
      this.editMode = "insert";
      console.log(this.$store.state.session);
      this.task.do_user = this.$store.state.session.user_name
      this.task.project_id = 1;
      this.task.project_icon = "globe"
      this.task.project_name = "General"
      
    }
    else {
      this.editMode = "update"
      this.task = this.$store.state.tasks[this.$route.params.id];
      
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
      params.append('task_id', this.task.id);
      params.append('edit_mode', this.editMode);
      params.append('task_type', this.task.type);
      params.append('task_title', this.task.title);
      params.append('task_text', this.task.text);
      params.append('task_due_date', this.task.due_date);
      params.append('task_do_user', this.task.do_user);
      params.append('project_id', this.task.project_id);
      console.log(this.task.project_id);
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
        if(this.editMode == "insert") {
          this.task.id = result.data.task_id;
          
          
          //this.$store.state.tasks.push(new_task);
          console.log(result);
        }
        
        
        this.$router.push("/task/det/"+this.task.id);
      })
    }
  }
};
</script>

