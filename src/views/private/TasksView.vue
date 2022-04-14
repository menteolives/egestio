<template>
  <div class="tasks">
    <navbar />
    <div class="container p-1">
      <div class="d-flex justify-content-between">
        <div>
          <router-link :to="'/tasks/'+session.user_name">Mis tareas</router-link>
          </div>
          <div>
        <router-link to="/task/edit" tag="button" class="btn"
          ><font-awesome-icon icon="plus" class="text-success"
        /></router-link></div>
      </div>
      <div>
        <div>
          <div class="list-group">
            <router-link
              :to="'/task/' + task.id"
              v-for="task in tasks_sorted"
              v-bind:key="task.id"
              class="list-group-item list-group-item-action p-1"
            >
              {{ task.title }}
              <div class="d-flex justify-content-between">
                <div>
                  <small>{{ task.do_user }} {{ task.due_date | humandate }}</small>
                </div>
                <div>
                  <small class="text-muted"
                    ><font-awesome-icon
                      v-if="task.project_icon"
                      :icon="task.project_icon"
                    />
                    {{ task.project_name }}</small
                  >
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/_layout/NavbarPrivate";
import moment from "moment"
moment.locale('es');

export default {
  name: "TasksView",
  data() {
    return {
      apiServer: process.env.VUE_APP_RUTA_API
      
    };
  },
  components: {
    Navbar,
  },
  computed: {
    users: function () {
      return this.$store.state.users;
    },
    session: function() {
      
      return this.$store.state.session;
    },
    tasks_sorted: function(orderby="due_date") {
      var tasks = Object.values(this.tasks);
      console.log(tasks);
        tasks.sort(( a, b) => {
            return new Date(a[orderby]) - new Date(b[orderby]);
        }).reverse();
        console.log(tasks);
        return tasks;
    },
    tasks: function () {
      var tasks = this.$store.state.tasks;
      if(this.$route.params.user) {
        //filtra las tareas del usuario
        tasks = Object.values(tasks).filter(task => task.do_user === this.$store.state.session.user_name)

      }
      return tasks;
      
    },
  },
  created() {
    console.log(this.$store.state.session.user_name);
    this.$store.dispatch("loadUsers");
    this.$store.dispatch("loadTasks");
  },
  mounted() {},
  methods: {
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