<template>
  <div class="pt-5 pb-5">
    <div class="fit mx-auto signup mt-5 p-3 p-sm-4 rounded shadow-sm border">
      <h6>Sign Up</h6><hr>
      <div class="form-inline form-group">
        <label class="mr-4">First Name:</label>
        <input v-model="userfirstname" name="" id="firstname" class="ml-auto w-50 form-control" placeholder="First Name">
      </div>
      <div class="form-inline form-group">
        <label class="mr-4">Middle Name:</label>
        <input v-model="usermiddlename" class="input-small ml-auto w-50 form-control" placeholder="Middle Name">
      </div>
      <div class="form-inline form-group">
        <label class="mr-4">Last Name:</label>
        <input v-model="userlastname" id="lastname" class="ml-auto w-50 form-control" placeholder="Last Name">
      </div>
      <div class="form-inline form-group">
        <label class="mr-4">Email:</label>
        <input v-model="useremail" type="email" name="" id="email" class="ml-auto w-50 form-control" placeholder="E-mail">
      </div>
      <div class="form-inline form-group">
        <label class="mr-4">Phone Number:</label>
        <input v-model="phoneNumber" id="phone" class="ml-auto w-50 form-control" placeholder="Phone Number">
      </div>
      <div class="form-inline form-group">
        <label class="mr-4">Password:</label>
        <input v-model="password" type="password" id="password" class="ml-auto w-50 form-control" placeholder="Password">
      </div>
      <div class="form-group mt-4 mx-auto">
        <button type="submit" data-toggle="modal" data-target="#signUpconfirm" @click="signUp" class="btn-sm btn-primary btn btn-block">Sign Up</button>
      </div>
      <div class="small">
        <span>Already have an account? </span>
        <router-link to="login" >Log In</router-link> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data(){
    return{
      userfirstname:"",
      usermiddlename:"",
      userlastname:"",
      useremail:"",
      phoneNumber:"",
      password:"",
      id:"",
    }
  },
  methods:{
    signUp(){
      let userObj = {
        firstName:this.userfirstname, 
        middleName:this.usermiddlename, 
        lastName:this.userlastname, 
        email: this.useremail, 
        phoneNumber:this.phoneNumber, 
        password:this.password, 
        id:this.id,
        transaction:"",
        cart:""
      };
      if(this.userfirstname != "" && this.userlastname != "" && this.useremail != "" && this.phoneNumber != "" && this.password != ""){
        let allUserArray = [];
        if(localStorage.UsersArray == ""){
          userObj.id = `${this.userfirstname}1`;
          allUserArray = [...allUserArray, userObj];
          userObj.cart = JSON.parse(localStorage.myCart) 
          localStorage.setItem("UsersArray", JSON.stringify(allUserArray))
          sessionStorage.Online = userObj.id
          window.location = `/account/${userObj.id}`
        } else{
          let getUsersArray = JSON.parse(localStorage.getItem("UsersArray"))
          for (let i = 0; i < getUsersArray.length; i++) {
            const element = getUsersArray[i];
            allUserArray = [...allUserArray, element];
          }
          let thelenght = getUsersArray.length + 1
          userObj.id = `${this.userfirstname}${thelenght}`
          allUserArray = [...allUserArray, userObj]
          userObj.cart = JSON.parse(localStorage.myCart);
          localStorage.setItem("UsersArray", JSON.stringify(allUserArray));
          console.log(JSON.parse(localStorage.myCart))
          sessionStorage.Online = userObj.id;
          window.location = `/account/${userObj.id}`
        }
      }
      this.userfirstname = ""
      this.usermiddlename = ""
      this.userlastname = ""
      this.useremail = ""
      this.phoneNumber = ""
      this.password = ""
    }
  }
}
</script>

<style scoped>
.signup{
  max-width: 320px;
}
</style>
