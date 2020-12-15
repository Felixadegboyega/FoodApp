<template>
  <div class="pt-5">
    <div>
    </div>
    <div class="container-fluid pt-4">
      <div class="row">
        <div class="col-12">
          <button @click="signOut" class="shadow-sm btn text-dark btn-light ml-auto float-right">
            Sign Out
            <img src="./img/signOut.png" alt="">
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 mx-auto p-4">
          <div>
            <img src="./img/profile.png" alt=""> <br>
            {{firstName}}  {{middleName}} <br>
          {{eMail}} <br>
          </div>
          <button class="btn btn-sm btn-info mt-4" data-toggle="collapse" data-target=".transactionDiv">My transaction</button>
        </div>  
      </div>
    </div>
    <div class="collapse transactionDiv mx-auto ">
      <table class="table mx-auto text-center table-responsive border table-striped">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Food Name</th>
            <th>No of Plate</th>
            <th>Price Per Plate</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="i" v-for="(tra, i) in transaction">
            <td>{{i+=1}}</td>
            <td>{{tra.foodName}}</td>
            <td>{{tra.noOfPlate}}</td>
            <td>{{tra.priceP}}</td>
            <td>{{tra.TotalA}}</td>
          </tr> 
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data(){
    return{
      userParam:"",
      firstName:"",
      middleName:"",
      lastName:"",
      eMail:"",
      id:"",
      transaction:""
    }
  },
  beforeMount(){
    if(sessionStorage.Online != this.$route.params.id){
      window.location = `/login`
    }
  },
  mounted(){
    this.userParam = this.$route.params.id
    let getUserArray = JSON.parse(localStorage.getItem("UsersArray"));
    for (let i = 0; i < getUserArray.length; i++) {
      if(getUserArray[i].id == this.userParam){
        this.firstName = getUserArray[i].firstName;
        this.middleName = getUserArray[i].middleName;
        this.lastName = getUserArray[i].lastName;
        this.eMail = getUserArray[i].email;
        this.id = getUserArray[i].id;
        this.transaction = getUserArray[i].transaction;
      }
    }
    
  },
  methods:{
    signOut(){
      sessionStorage.setItem("Online", '');
      window.location = `/login`
    }
  }
  
}
</script>

<style scoped>
.table{
  max-width:fit-content !important
}
</style>
