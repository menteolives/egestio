<template>
  <div class="projectedit">
    <navbar/>
    <div class="container">
    <h1>Edición proyecto</h1>
     <div class="mb-3">
  <label class="form-label">Título</label>
  <input type="text" class="form-control" name="name" maxlength="150" placeholder="Nombre del proyecto" v-model="project_name">
  <button class='btn btn-success btn-block' v-on:click="btnSaveClick">Guardar</button>
</div>
    <div>
 
 <div>
  x
</div>


</div>
  </div></div>
</template>

<script>
import Navbar from '@/components/_layout/NavbarPrivate';
import axios from "axios";

export default {
  name: 'ProjectEditView',
  data() {
    return {
      apiServer: process.env.VUE_APP_RUTA_API,
      editMode: "",
      project_id: 0,
      project_name: ""
    }
  },
  components: {
    Navbar
  },
  mounted () {
    
    console.log(this.$route)
    console.log(this.$route.params.id);
    if(this.$route.params.id == undefined) {
      this.editMode = "insert"
    }
    else {
         this.editMode = "update";
         this.project_id = this.$route.params.id;
    }
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
      var ENDPOINT_PATH = this.apiServer+"project";
      
     console.log(ENDPOINT_PATH);
      const params = new URLSearchParams();
      params.append('project_id', this.project_id);
      params.append('project_name', this.project_name);
      console.log(this.project_name);
      
      console.log(this.editMode);
      axios.post(ENDPOINT_PATH , params, optionAxios).then((result) => {
        console.log(result);
        
        
        this.$router.push("/projects");
      })
    }
  }
};
</script>