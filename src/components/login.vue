<template>
  <div class="pt-5 pb-5">
    <div class="mt-5 mx-auto card shadow-sm">
      <h6 class="card-header">Login With E-mail or Phone Number</h6>
      <div class="form-group m-3">
        <input type="text" v-model="emailOrPhone" class="form-control" placeholder="Phone Number or E-mail" >
      </div>
      <div class="form-group ml-3 mr-3">
        <!-- <label for="">Password</label> -->
        <input type="password" v-model="password" class="form-control" placeholder="Password" >
      </div>
      <div v-if="condition === false" class="loginalert alert alert-danger mr-3 ml-3 small p-1">Make sure the email or username you enter match your password</div>
      <div class="form-group ml-3 mr-3">
        <button @click="checkInfo" class="btn-outline-primary btn btn-block">Log In</button>
      </div>
      
      <div class="small ml-3 mb-2">
        <span>Don't have an account? </span>
        <router-link to="signup">Sign Up</router-link> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data(){
    return{
      emailOrPhone:"",
      password:"",
      userArray:"",
      condition :""
    }
  },
  mounted(){
    if(localStorage.UsersArray != ""){
      this.userArray = JSON.parse(localStorage.getItem("UsersArray"))
    }
  },
  methods:{
    checkInfo(){
      for (let i = 0; i < this.userArray.length; i++) {
        if((this.userArray[i].email == this.emailOrPhone || this.userArray[i].phoneNumber == this.emailOrPhone)  && this.userArray[i].password == this.password){
          sessionStorage.setItem("Online", this.userArray[i].id)
          window.location = `/account/${this.userArray[i].id}`
          this.condition = true;
        }else{
          this.condition = false;
        }
      }
    }
    // 
  }
}
</script>

<style scoped>
.card{
  max-width: 320px;
}
.loginalert{
  max-width:270px
}

</style>
