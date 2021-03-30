<template>
    <div class="row pt-5">
      <div class="col-md-5 p-2 p-md-5">
         <div class="pl-md-5">
            <img src="./img/profile.png" alt=""> <br>
            {{firstName}}  {{middleName}} <br>
            {{eMail}} <br> <br>
            <button @click="signOut" class="shadow-sm btn text-dark btn-light ">
              Sign Out
              <img src="./img/signOut.png" alt="">
            </button>
          </div>
      </div>
      <div class="col-md-7 p-2 p-md-5">
        <button class="btn transaction btn-sm btn-info mt-4" data-toggle="collapse" data-target=".transactionDiv">My transaction</button>
        <div class="collapse mt-3 transactionDiv mx-auto ">
          <table class="table text-center table-striped table-responsive">
            <thead>
              <tr>
                <th class="border-0">S/N</th>
                <th class="border-0">Food Name</th>
                <th class="border-0">No of Plate</th>
                <th class="border-0">Price Per Plate</th>
                <th class="border-0">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-bind:key="i" v-for="(tra, i) in transaction">
                <td class="border-0">{{i+=1}}</td>
                <td class="border-0">{{tra.foodName}}</td>
                <td class="border-0">{{tra.noOfPlate}}</td>
                <td class="border-0">{{tra.priceP}}</td>
                <td class="border-0">{{tra.TotalA}}</td>
              </tr> 
            </tbody>
          </table>
        </div>
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
th{
  color:gray
}
.transaction{
  background-color: #A07654;
  border: none;
  box-shadow: none !important;
}
</style>
