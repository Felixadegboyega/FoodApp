<template>
  <div class="pt-5 pb-5">
		<div class="mt-5 mx-auto card shadow-sm">
      <h6 class="card-header">Admin Login</h6>
      <div class="form-group m-3">
        <label for="">Username</label>
        <input type="text" v-model="username" class="form-control" placeholder="Username" >
      </div>
      <div class="form-group ml-3 mr-3">
        <label for="">Password</label>
        <input type="password" v-model="password" class="form-control" placeholder="Password" >
      </div>
	<button class="btn-outline-primary border card-footer btn btn-block" @click="checkAd">Log In</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data(){
    return{
      username:"",
      password:""
    }
  },
  methods:{
    checkAd(){
      if(this.username == "Likzjoiy" && this.password == "likzjoiy"){
        sessionStorage.setItem("AdminO", this.username)
        this.$router.push("/admin/addfood")
      }
    }
  }
}
</script>

<style scoped>
.card{
  width:300px
}
</style>
