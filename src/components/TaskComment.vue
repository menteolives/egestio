<template>
  <li class="list-group-item d-flex">
    <div>
      <div
        class="
          profile_icon
          border border-success
          rounded-circle
          mr-2
          text-center
          align-middle
          text-success
        "
        
      >
        <span>{{ comment.created_user }}</span>
      </div>
    </div>
    <div>
      <small
        ><b>{{ comment.created_user }}</b> {{ comment.created_date }}</small
      >
      <br />
      {{ comment.text }}
    </div>
  </li>
</template>

<script>
export default {
  name: "TaskComment",
  props: {
    comment: {},
  },
};
</script>

<style>
  .profile_icon {
    font-weight: bold;
          width: 50px;
          height: 50px;
          line-height: 35px;
          font-size: 40px;
          border-width: 4px !important;
          overflow:hidden;
  }
</style>