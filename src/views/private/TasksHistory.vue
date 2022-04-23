<template>
  <div class="tasks">
    <navbar />
    <div class="container p-1">
      <div class="d-flex justify-content-between">
        <div>
         <label for="dt_ini">Desde</label>
    <b-form-datepicker id="dt_ini" @input="get_history()" :date-format-options="{ day: '2-digit', month: '2-digit', year: 'numeric' }" v-model="date_ini" class="mb-2"></b-form-datepicker>
    
         
          </div>
          <div>
              <label for="dt_end">Hasta</label>
    <b-form-datepicker id="dt_end"  @input="get_history()" :date-format-options="{ day: '2-digit', month: '2-digit', year: 'numeric' }" v-model="date_end" class="mb-2"></b-form-datepicker>
        </div>
      </div>
      <div>
          <b>Tareas Abiertas</b>
          <div class="list-group">
            <router-link
              :to="'/task/' + item.id"
              v-for="item in history.open"
              v-bind:key="item.id"
              class="list-group-item list-group-item-action p-1"
            >
            {{ item.title }}
             <div class="d-flex justify-content-between">
                <div>
                  <small> {{ item.date  }}</small>
                </div>
                
              </div>
            </router-link>
            </div>
        
          <b>Tareas Cerradas</b>
          <div class="list-group">
            <router-link
              :to="'/task/' + item.id"
              v-for="item in history.close"
              v-bind:key="item.id"
              class="list-group-item list-group-item-action p-1"
            >
            {{ item.title }}
            <div class="d-flex justify-content-between">
                <div>
                  <small> {{ item.date  }}</small>
                </div>
                
              </div>
            </router-link>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/_layout/NavbarPrivate";
import axios from "axios"
import moment from "moment"
moment.locale('es');

export default {
  name: "TasksHistory",
  data() {
    return {
      apiServer: process.env.VUE_APP_RUTA_API,
      date_ini: '2022-03-01',
      date_end: '2022-04-30',
      history: []
      
    };
  },
  components: {
    Navbar,
  },
  computed: {
    
    session: function() {
      
      return this.$store.state.session;
    },
    
  },
  created() {
     this.get_history();
  },
  
  methods: {
      get_history: function() {
          var user_token = localStorage.getItem('token');
      const ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "tasks_history/"+this.date_ini+"/"+this.date_end;
      var AxiosOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${user_token}`
        }
      }
      axios
        .get(ENDPOINT_PATH, AxiosOptions)
        .then((result) => {
          this.history = result.data.activity
          console.log(this.history);

        })
      },
  moment: function () {
    return moment();
  }
},
filters: {
  humandate: function (date) {
    return moment(date).fromNow();
  }
}
};
</script>