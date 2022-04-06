<template>
  <div class="tasks">
    <navbar />
    <div class="container p-0">
      <div class="d-flex justify-content-between">
        <div></div>
        <router-link to="/task/edit" tag="button" class="btn"
          ><font-awesome-icon icon="plus" class="text-success"
        /></router-link>
      </div>
      <div>
        <div>
          <div class="list-group">
            <router-link
              :to="'/task/det/' + task.id"
              v-for="task in tasks"
              v-bind:key="task.id"
              class="list-group-item list-group-item-action p-1"
            >
              {{ task.title }}
              <div class="d-flex justify-content-between">
                <div>
                  <small>{{ task.do_user }} {{ task.due_date }}</small>
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

export default {
  name: "TasksView",
  data() {
    return {
      apiServer: process.env.VUE_APP_RUTA_API,
    };
  },
  components: {
    Navbar,
  },
  computed: {
    users: function () {
      return this.$store.state.users;
    },
    tasks: function () {
      return this.$store.state.tasks;
    },
  },
  created() {
    this.$store.dispatch("loadUsers");
    this.$store.dispatch("loadTasks");
  },
  mounted() {},
};
</script>