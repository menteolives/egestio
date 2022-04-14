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
          :to="'/proposal/det/' + proposal.id"
          v-for="proposal in proposals"
          v-bind:key="proposal.id"
          class="list-group-item list-group-item-action p-1"
        >
          {{ proposal.title }}
          <div>
            <b-progress class="mt-2" style="height:10px;" :max="proposal.votes_max" striped>
              <b-progress-bar :value="proposal.votes_Y" variant="success"></b-progress-bar>
              <b-progress-bar :value="proposal.votes_N" variant="danger"></b-progress-bar>
              <b-progress-bar :value="proposal.votes_A" variant="secondary"></b-progress-bar>
            </b-progress>

            <div class="d-flex justify-content-between">
              <small>Votado {{percentage(proposal.votes_total,proposal.votes_max)}} % ({{proposal.votes_total}} votos)</small>
              <div>
                <small class="text-success mr-2" ><b>Si</b> 
                  {{ percentage(proposal.votes_Y,proposal.votes_max) }}%
                  ({{proposal.votes_Y}})
                  </small>
                <small class="text-danger mr-2"><b>No</b>
                  {{ percentage(proposal.votes_N,proposal.votes_max) }}%
                  ({{proposal.votes_N}})
                </small>
                <small class="text-secondary"><b>Abs</b> 
                  {{ percentage(proposal.votes_A,proposal.votes_max) }}%
                  ({{proposal.votes_A}})
                </small>

                
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
  methods: {
    percentage( value,maxValue) {
      var num =Math.round((100 * value) / maxValue);
  return parseInt(num) || 0;
},
  },
  created() {
    this.$store.dispatch("loadProposals");
  },
};
</script>