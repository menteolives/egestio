
<template>
  <div class="proposalnew">
    <navbar />
    <div class="container p-1">
      <h4>Detalles de propuesta</h4>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{proposal.title}}</h5>
          <div v-html="proposal.text"></div>
          <div>
            <div class="progress" style="height: 10px">
              <div
                class="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                style="width: 60%"
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div
                class="progress-bar progress-bar-striped bg-danger"
                role="progressbar"
                style="width: 20%"
                aria-valuenow="20"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div
                class="progress-bar progress-bar-striped bg-secondary"
                role="progressbar"
                style="width: 20%"
                aria-valuenow="20"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div class="d-flex justify-content-between">
              <small>Votado 100% (7 votos)</small>
              <div>
                <small class="text-success mr-2"><b>Si</b> 60%</small>
                <small class="text-danger mr-2"><b>No</b> 20%</small>
                <small class="text-secondary"><b>Abs</b> 20%</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/_layout/NavbarPrivate';

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    proposal: function () {
      return this.$store.state.proposal;
    },
  },
  created() {
    this.$store.dispatch("loadProposal", this.$route.params.id);
    
  },
};
</script>
