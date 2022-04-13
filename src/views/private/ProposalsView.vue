<template>
  <div class="proposals">
    <navbar />
    <div class="container p-1">
      <div class="d-flex justify-content-between">
        <div>pedent</div>
        <div>
          <router-link to="/proposal/new" tag="button" class="btn"
            ><font-awesome-icon icon="plus" class="text-success"
          /></router-link>
        </div>
      </div>

      <div>
        <div>
          <b-tabs>
            <b-tab active>
              <template #title>
                <i class="fa-solid fa-question"></i> Votar
              </template>
              <p class="p-3">Tab contents 1</p>
            </b-tab>

            <b-tab>
              <template #title>
                <i class="fa-solid fa-check text-success"></i> Aprobado
              </template>
              <p class="p-3">Tab contents 2</p>
            </b-tab>

            <b-tab>
              <template #title>
                <i class="fa-solid fa-xmark text-danger"></i> Rechazado
              </template>
              <p class="p-3">Tab contents 3</p>
            </b-tab>
          </b-tabs>
        </div>
      </div>
      <div class="list-group">
        <router-link
          :to="'/proposal/' + proposal.id"
          v-for="proposal in proposals"
          v-bind:key="proposal.id"
          class="list-group-item list-group-item-action p-1"
        >
          {{ proposal.title }}
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
          <div class="d-flex justify-content-between">
            <div>
              <small>{{ proposal.end_date }}</small>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/_layout/NavbarPrivate";

export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    proposals: function () {
      var proposals = this.$store.state.proposals;

      return proposals;
    },
  },
  created() {
    this.$store.dispatch("loadProposals");
  },
};
</script>