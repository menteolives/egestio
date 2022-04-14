
<template>
  <div class="proposalnew">
    
    <b-modal id="modal-vote" ok-only ok-title="Cancelar" title="Votar propuesta">
    <h5>{{proposal.title}}</h5>
    
      
      <div class='d-flex justify-content-around'>
       <button class="btn btn-success btn-lg" v-on:click="btnProposalVoteClick('Y')" data-value="Y"> SI</button>
        <button class="btn btn-secondary btn-lg" v-on:click="btnProposalVoteClick('A')" data-value="A"> Abstención</button>
         <button class="btn btn-danger btn-lg" v-on:click="btnProposalVoteClick('N')" data-value="N"> NO</button>
  </div>
  </b-modal>
    <navbar />
    <div class="container p-1">
      <h4>Detalles de propuesta</h4>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{proposal.title}}</h5>
          <b-button variant="btn btn-primary" v-b-modal.modal-vote>Votar</b-button>
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
                <small class="text-success mr-2" ><b>Si</b> 60%</small>
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
<style>
  .modal-dialog {
   position:fixed;
   top:auto;
   right:0;
   left:0;
   bottom:0;
}  
</style>
<script>
import Navbar from '@/components/_layout/NavbarPrivate';
import axios from "axios";

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
  methods: {
    btnProposalVoteClick: function(vote_value) {
      var user_token = localStorage.getItem("token");
      var optionAxios = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `${user_token}`,
        },
      };
      // var user_token = localStorage.getItem('token')
      var ENDPOINT_PATH = process.env.VUE_APP_RUTA_API + "proposal/voted";
      console.log(ENDPOINT_PATH);
      const params = new URLSearchParams();
      params.append("proposal_id", this.proposal.id);
      params.append("vote_value", vote_value);
      axios.post(ENDPOINT_PATH, params, optionAxios).then((result) => {
        console.log(result);
        //this.task.status = 9;
        //this.$store.state.tasks[this.task.id].status = 9;
      });
    }
  }
};
</script>
