<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/adminpage">Admin</router-link> -->
    </div>
    <nav class="fixed-top navbar-dark navbar bg-secondary navbar-expand-sm navvv">
        <!-- <a class="navbar-brand" href="#">Likz</a> -->
        <button @click="showNav" class="ml-auto navbar-toggler navbar-toggler-icon d-lg-none"></button>
        <div class="d-none d-sm-inline navbar-collapse">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link text-light" to="/">Home </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-light" to="/allfood">Menu</router-link>
                </li>
                <!-- <li class="nav-item">
                    <a class="btn nav-link text-light" @click="moveTo('here')">Contact</a>
                </li> -->
            </ul>
            <div class="form-inline my-2 my-lg-0">
                <router-link v-if="online == ''" class="nav-link p-2 text-light" to="/login">Log In</router-link>
                <router-link v-if="online == ''" class="nav-link p-2 text-light" to="/signup">Sign Up</router-link>
                <a v-if="online != ''" class="nav-link p-2 user btn" @click="getHref">
                  <img class="rounded-top" src="./components/img/online.png" alt="cart">
                </a>
                <router-link class="nav-link p-2" to="/myCart">
                  <img class="rounded-top" src="./components/img/cart.png" alt="cart">
                  <sup class="text-white">{{numberInCart}}</sup>
                </router-link>
                
            </div>
        </div>
    </nav>

    <div style="display:none; width:fit-content" class="navvv smallnav fixed-top mr-auto pl-4 pr-4 pt-2 d-sm-none navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
                <router-link class="nav-link text-light" to="/">Home </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link text-light" to="/allfood">Menu</router-link>
            </li>
            <li class="nav-item">
                <a class="btn nav-link text-light" @click="moveTo('here')">Contact</a>
            </li>
            <li class="nav-item" v-if="online == ''">
              <router-link class="nav-link text-light" to="/login">Log In</router-link>
            </li>
            <li class="nav-item" v-if="online == ''">
              <router-link class="nav-link text-light" to="/signup">Sign Up</router-link>
            </li>
            <li class="nav-item">
              <a v-if="online != ''" class="nav-link btn fit p-0" @click="getHref">
                <img class="rounded-top" src="./components/img/online.png" alt="cart">
              </a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/mycart">
                <img class="rounded-top" src="./components/img/cart.png" alt="cart">
              </router-link>
            </li>
        </ul>
    </div>

    



    <router-view class="components" v-on:addnumberincart="add" v-on:editCartNumber="editCartNo" v-bind:allFoodInfo="getFoods"/>




    <div class="footer bg-dark container-fluid pb-2 pt-2 p-sm-5" ref="here">
      <div class="row">
        <div class="col-sm-4 col-6">
          <ul>
            <li class="nav-item list-unstyled">
              <a href="/" class="text-light small">Home</a>
            </li>
            <li class="nav-item list-unstyled">
              <a href="/allfood" class="text-light small">Menu</a>
            </li>
            <li class="nav-item list-unstyled">
              <a href="/signup" class="text-light small">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="bg-light">
      <div class="row p-0">
        <div class="col-12 small text-light mx-auto text-center">copyright &copy; Licode 2020</div>
      </div>
    </div>
  </div>
</template>


<script>  
export default {
  data(){
    return{
      getFoods:"",
      online:"",
      numberInCart:0,
    }
  },
  methods:{
    showNav(){
      let getNav = document.getElementById("collapsibleNavId")
      if(getNav.style.display == "none"){
        getNav.style.display = "block"
        getNav.classList.add("navAnimate")
        getNav.classList.remove("navRemove")
      } else {
        getNav.classList.remove("navAnimate")
          getNav.style.display = "none"
      }
    },
    moveTo(p) {
      let element = this.$refs[p];
      element.scrollIntoView({behavior:'smooth'});
    },
    getHref(){
      window.location = `/account/${this.online}`
    },
    add(){
      this.numberInCart++
    },
    editCartNo(){
      this.numberInCart--
    },
    ck(){
      // if(localStorage.myCart != "" && sessionStorage.Online == ""){ 
      if(localStorage.myCart != ""){
        this.numberInCart = (JSON.parse(localStorage.myCart).length)
      }
      // } else{
      //   if(localStorage.UsersArray != ""){
      //     for (let i = 0; i < JSON.parse(localStorage.UsersArray).length; i++) {
      //       const element = JSON.parse(localStorage.UsersArray)[i];
      //       if(element.id == sessionStorage.Online && element.cart != ""){ 
      //         this.numberInCart = (element.cart).length
      //       }
      //     }
      //   }
      // }
    }
  },
  mounted(){
    if(localStorage.MainFoodArray == null) {
      localStorage.setItem("MainFoodArray", "");
    }
    if(localStorage.UsersArray == null) {
      localStorage.setItem("UsersArray", "");
    }
    if(localStorage.myCart == null) {
      localStorage.setItem("myCart", "");
    }
    if(localStorage.orderArray == null) {
      localStorage.setItem("orderArray", "");
    }
    if(sessionStorage.Online == null){
      sessionStorage.setItem("Online", "")
    }
    if(sessionStorage.Online != ""){
      this.online = sessionStorage.Online
    }
    this.ck()
    if(localStorage.MainFoodArray != ""){
    let getFoodArray = JSON.parse(localStorage.getItem("MainFoodArray"));
    let getTime = new Date();
    for (let i = 0; i < getFoodArray.length; i++) {
      let H = getTime.getHours();
      if (H >= getFoodArray[i].timeFrom && H < getFoodArray[i].timeTo){
        getFoodArray[i].status = "Available"
        localStorage.setItem("MainFoodArray", JSON.stringify(getFoodArray))
      }
       else{
        getFoodArray[i].status = "Not Available"
        localStorage.setItem("MainFoodArray", JSON.stringify(getFoodArray));
      }
    }
    this.getFoods = getFoodArray
    }
  }
}
</script>

<style scoped>
.navvv{
  background-color: #a07654 !important;
}
.components{
  min-height: calc(100vh - 250px) !important;
  /* background-image: url('components/img/back.jpg'); */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-blend-mode: color-burn; */
}
.navbar{
  height:60px
}
.smallnav{
  height:100vh;
  z-index: +10000 !important;
}
.navAnimate{
	animation: editAnimation .8s ease !important;
}
@keyframes editAnimation {
    from {margin-left: -100px;}
    to {margin-left: 0px;}
}
.navRemove{
  animation: editAnimation2 .8s ease !important;
}
@keyframes editAnimation2 {
    from {margin-left: 0px;}
    to {margin-left: -100px;}
}
.footer{
  background-color:#a07654 !important
}
</style>
