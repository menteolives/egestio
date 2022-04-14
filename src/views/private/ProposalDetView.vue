
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
            <b-progress class="mt-2" :max="proposal.votes_max" striped>
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
percentage( value,maxValue) {
  
   var num =Math.round((100 * value) / maxValue);
  return parseInt(num) || 0;
},
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
        this.proposal["votes_"+vote_value] = parseInt(this.proposal["votes_"+vote_value])+1;
        this.proposal.votes_total = parseInt(this.proposal.votes_total)+1;
        //this.task.status = 9;
        //this.$store.state.tasks[this.task.id].status = 9;
      });
    }
  }
};
</script>
