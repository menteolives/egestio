
<template>
  <div class="proposalnew">
      <navbar/>
      <div class="container p-1">
   
    <div class="card">
     
      <div class="card-body p-2">
        <h5 class='card-title'>Nueva propuesta</h5>
    <div class="mb-3">
  <label class="form-label">Título</label>
  <input type="text" class="form-control" name="title" maxlength="150" placeholder="Título de la propuesta" v-model="title">
</div>
<div class="mb-3">
  <label class="form-label">Descripción</label>
   <vue-editor
          v-model="text"
          :editor-toolbar="editorToolbar"
        ></vue-editor>
  
</div>
<div class="row mb-1">
        <div class="col">
          
        </div>
        <div class="col">
          <label class="form-label">Vencimiento</label>
          <input
            type="date"
            class="form-control"
            name="due_date"
            v-model="end_date"
          />
        </div>
      </div>
<button class='btn btn-success btn-block' v-on:click="btnProponerClick">Proponer</button>

      </div>
    </div>
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
      
      end_date: "",
      title: "",
      text: "",
       editorToolbar: [
        ["bold", "italic", "underline","link"],
        
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }],
        
      ]
    }
    
  },
  components: {
    Navbar,
    VueEditor
  },
  methods: {
    btnProponerClick: function() {
       var user_token = localStorage.getItem("token");

      var optionAxios = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `${user_token}`,
        },
      };
      // var user_token = localStorage.getItem('token')
      var ENDPOINT_PATH = this.apiServer + "proposal";
     console.log(ENDPOINT_PATH);
      const params = new URLSearchParams();
      
      params.append('title', this.title);
      params.append('text', this.text);
      params.append('end_date', this.end_date);
      axios.post(ENDPOINT_PATH , params, optionAxios).then((result) => {
        console.log(result);
      })
    }
  }
};
</script>

