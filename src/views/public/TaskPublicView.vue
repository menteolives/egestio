<template>
  <div class="taskdet">
      <TaskDet :task="task" />
      <div class="card mt-3">
        <ul class="list-group list-group-flush">
          <TaskComment v-for="comment in task.comments" v-bind:key="comment.comment_id" :comment="comment" />
        </ul>
    </div>
  </div>
</template>
<script>
import TaskComment from "@/components/TaskComment";
import TaskDet from "@/components/TaskDet"
import axios from "axios";

export default {
  name: "TaskDetView",
  metaInfo() {
    return {
      title: this.task.title,
    }
  },
  data() {
    return {
     task: [],
    };
  },
  components: {
    TaskDet,
    TaskComment
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_RUTA_API+"public_task/"+this.$route.params.token)
      .then(
          response => {
              this.task = response.data.task
              //si existe token de usuario comprueba y redirige a la sección privada
              if(localStorage.getItem('token')) {
                  this.$router.push("/task/"+this.task.id);
                //this.$store.state.user_token = localStorage.getItem('token');
                //this.$store.dispatch("checkToken","task/det/"+this.task.id);
            }
        }
)
  },
};
</script>