<template>
  <div class="pt-3">
  <div class="thcartBox mx-auto bg-light pt-5">
    <h5 class="ml-5 d-inline-block title">My Cart</h5>
    <router-link v-if="cart != ''" to="/checkOut" class="float-right d-inline-block btn btn-sm btn-outline-secondary ml-auto mr-4">Checkout</router-link><br>
    <div v-if="cart == ''" class="text-center text-muted p-5" style="font-size:2rem !important">
      Cart is Empty
    </div>
    <div v-if="cart != ''" class="ml-sm-4 mr-sm-4 mt-4 mb-4 alert alert-warning alert-dismissible fade show" role="alert">
      <button type="button" class="ml-5 close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <small>Please Note that when Checking Out, only available foods will be ordered</small> 
    </div>
    
    <div class="text-right mr-4">
      <b class="ml-auto" v-if="cart != ''">Total: <span>{{total}}</span></b>
    </div>
    <div class="d-inline-block cartDiv ml-1 ml-sm-5" v-bind:key="i" v-for="(std, i) in cart">
          <div class="d-flex">
            <div class="cartImg">
            <img class="rounded" :src="require(`./img/${std.foodPics}`)" alt="">
          </div>
          <div>
            <div class="ml-3">{{std.foodName}}</div>
              <small class="ml-3 status">{{std.status}}</small><br>
              <small class="ml-3 d-inline">Price: {{std.price}}</small>
              <span class="small ml-3">Qty: </span>
              <input @keyup="setBac(i, std.foodName, std.status, std.price, std.qty, std.price*std.qty, std.foodPics)"  v-model="std.qty" min=1 class="qty d-inline form-control"> <br>
              <div class="small ml-3">
                Total: <span class="tot">{{std.price*std.qty}}</span>
              </div>
            <button class="btn btn-sm btn-danger mt-1 ml-3" @click="del(i)">Delete</button>
          </div>
          </div>
      <hr/>
    </div>
  </div>
  


  </div>
</template>

<script>
export default {
  name: 'Cart',
  data(){
    return{
      cart:"",
      total:"",
    }
  },
  mounted(){
    // if(localStorage.myCart != "" && sessionStorage.Online == ""){
      let getCart = JSON.parse(localStorage.getItem("myCart"))
        this.cart = getCart
      let newA = [];
      if(this.cart != ""){
        this.cart.forEach(foodindex => newA.push(foodindex.TotalA))
        let sum  = newA.reduce(function(x,y){
          return x+y
        })
        this.total = sum
      }
    // } else{
    //   for (let i = 0; i < JSON.parse(localStorage.getItem("UsersArray")).length; i++) {
    //     const element = JSON.parse(localStorage.getItem("UsersArray"))[i];
    //     console.log(sessionStorage.Online)
    //     if(element.id == (sessionStorage.Online)){
    //       let newA = [];
    //       this.cart = element.cart
    //       this.cart.forEach(foodindex => newA.push(foodindex.TotalA))
    //       let sum  = newA.reduce(function(x,y){
    //         return x+y
    //       })
    //       this.total = sum
    //     }
    //   }
    // }
  },
  methods:{
    setBac(i, a, b, c, d, e, f){
      let backObj = {foodName:a, status:b, price:c, qty:d, TotalA:e, foodPics:f}
      // if(localStorage.myCart != "" && sessionStorage.Online == ""){
        let getC = JSON.parse(localStorage.getItem("myCart"))
        getC[i] = backObj
        localStorage.setItem("myCart", JSON.stringify(getC));
        let newA = [];
        getC.forEach(foodindex => newA.push(foodindex.TotalA))
        let sum  = newA.reduce(function(x,y){
          return x+y
        })
        this.total = sum
      // } else {
      //   let getUs =JSON.parse(localStorage.getItem("UsersArray"))
      //   for (let j = 0; j < getUs.length; j++) {
      //     const element = getUs[j];
      //     if(element.id == sessionStorage.Online){
      //       element.cart[i] = backObj
      //       localStorage.setItem("UsersArray", JSON.stringify(getUs)) 
      //       let newA = [];
      //       element.cart.forEach(foodindex => newA.push(foodindex.TotalA))
      //       let sum  = newA.reduce(function(x,y){
      //         return x+y
      //       })
      //       this.total = sum
      //     }
      //   }
      // }
    },
    del(i){
      // if(sessionStorage.Online == ""){
        this.cart.splice(i, 1)
        localStorage.setItem("myCart", JSON.stringify(this.cart))
        this.$emit("editCartNumber")
      // } else{
      //   let getUs = JSON.parse(localStorage.getItem("UsersArray"))
      //   for (let j = 0; j < getUs.length; j++) {
      //     const element = getUs[j];
      //     if(element.id == sessionStorage.Online ){
      //       this.cart.splice(i, 1)
      //       element.cart.splice(i,1)
      //       console.log(element.cart)
      //       localStorage.setItem("UsersArray", JSON.stringify(getUs))
      //       this.$emit("editCartNumber")
      //     }
      //   }
      // }
    },
  },
}
</script>

<style scoped>
.qty{
  width:40px;
  height:30px;
  box-shadow: none !important;
  padding-right:0px !important;
  padding-left:4px !important;
  user-select: none !important;
}
.cartImg img{
  width:160px !important;
  height: 130px !important;
}
.thcartBox{
  min-height: calc(100vh - 60px);
}
.title{
  color: gray;
}
</style>
