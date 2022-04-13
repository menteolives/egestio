<template>
  <div class="login">
    <div class="container p-1">
      <h1>Acceso</h1>
      <div class="card">
        <div class="card-body">

        
      <form>
        <p class="h4 text-center mb-4">Entrar</p>
        <label for="defaultFormLoginEmailEx" class="grey-text">Usuario</label>
        <input
          type="user"
          id="defaultFormLoginEmailEx"
          class="form-control"
          v-model="user"
          placeholder="Usuario"
        />
        <br />
        <label for="defaultFormLoginPasswordEx" class="grey-text"
          >Contraseña</label
        >
        <input
          type="password"
          id="defaultFormLoginPasswordEx"
          class="form-control"
          placeholder="Contraseña"
          v-model="pass"
        />
        <div class="text-center mt-4">
          <a class="btn btn-success btn-block" href="#" @click="login"
            >Entrar</a
          >
        </div>
      </form>
      </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      apiServer: process.env.VUE_APP_RUTA_API,
      user: "",
      pass: "",
    };
  },
  methods: {
    login: function () {
      var optionAxios = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const ENDPOINT_PATH = this.apiServer + "user/access";
      console.log(ENDPOINT_PATH);
      const params = new URLSearchParams();
      params.append("username", this.user);
      params.append("password", this.pass);
      axios.post(ENDPOINT_PATH, params, optionAxios).then((result) => {
        //guarda los datos de sesión
        //this.$store.state.session = result.data.user;
        console.log(result.data.data);
        if (result.data) {
          localStorage.setItem("token", result.data.user.token);
          localStorage.setItem("session", JSON.stringify(result.data.user));
          this.$store.dispatch("loadProjects");
          this.$router.push("tasks");
        } else {
          localStorage.removeItem("token");
          console.log("Acceso erróneo");
        }
        //console.log(result.data.token);
        //guarde en local storage el token para recordar próximas entradas
      });
    },
  },
};
</script>