<template>
  <div class="card">
    <div class="card-body">
      <div>
        <span v-for="tag in task.tags" v-bind:key="tag">{{ tag }}</span>
        <h4>{{ task.title }}</h4>
        <div class="d-flex justify-content-between">
          <div>
            <small>
              <font-awesome-icon icon="user" class="text-muted" />
              <b>{{ task.do_user }}</b>
              <font-awesome-icon
                icon="calendar-check"
                class="ml-2 text-muted"
              />
              <b>{{ task.due_date }}</b>
            </small>
          </div>
          <div>
            <router-link :to="'/project/det/' + task.project_id">
              <small class="text-muted"
                ><font-awesome-icon :icon="task.project_icon" />
                {{ task.project_name }}</small
              >
            </router-link>
          </div>
        </div>
      </div>
      <div v-html="task.text"></div>
      <div class="d-flex justify-content-between">
        <div>
          <small class="text-muted"
            >{{ task.created_user }} {{ task.created_date }}</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskDet",
  props: {
    task: {},
  },
};
</script>