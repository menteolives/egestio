
<template>
  <div class="tasknew">
      <navbar/>
      <div class="container">
    <h1>Nueva tarea</h1>
    <div class="mb-3">
  <label class="form-label">Título</label>
  <input type="text" class="form-control" name="title" maxlength="150" placeholder="Título de la tarea" v-model="title">
</div>
<div class="mb-3">
  <label class="form-label">Descripción</label>
  <textarea class="form-control" name="text" rows="3" maxlength="1000" v-model="text"></textarea>
</div>
<button class='btn btn-success btn-block' v-on:click="btnProponerClick">Proponer</button>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/_layout/NavbarPrivate';
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      apiServer: process.env.VUE_APP_RUTA_API,
      type:"task",
      title: "",
      text: ""
    }
    
  },
  components: {
    Navbar
  },
  methods: {
    btnProponerClick: function() {
       var optionAxios = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
       var user_token = localStorage.getItem('token')
      const ENDPOINT_PATH = this.apiServer+user_token+"/task";
     console.log(ENDPOINT_PATH);
      const params = new URLSearchParams();
      params.append('type', this.type);
      params.append('title', this.title);
      params.append('text', this.text);
      axios.post(ENDPOINT_PATH , params, optionAxios).then((result) => {
        console.log(result);
      })
    }
  }
};
</script>

