<template>
  <div>
    <div class="container-fluid pt-5">
      <h6 class="ml-4 mt-4 title">All Foods</h6>
      <div class="row justify-content-center">
        <div class="rounded shadow-sm border p-0 m-4 col-12 foodCards" v-bind:key="i" v-for="(std, i) in allFoodInfo">
          <div class="small w-100 added mx-auto text-center alert-success" style="display:none">Added to Cart</div>
          <div class="d-flex">
            <img class="rounded-top" :src="require(`./img/${std.picture}`)" alt="">
            <div class="ml-1 mr-1 card-body p-0">
               <span style="font-size:0.6rem !important" class="float-right ml-auto rounded-bottom small p-1 badge-info">{{std.status}}</span>
              <div class="ml-3 foodName"><b>{{std.name}}</b></div>
              <div class="small ml-3">Available From {{std.timeFrom}}:00 to {{std.timeTo}}:00 </div>
              <div class="small ml-3">Price per Plate: {{std.pricePPlate}}</div>
              <input type="number" class="form-control pr-0 ml-3 position-absolute qty" v-model="std.qty" style="width:40px">
              <button @click="addToCart(i)" class="position-absolute addBut btn-sm btn btn-info">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: 'Allfood',
  props:["allFoodInfo"],
  data(){
    return{
    }
  },
  methods:{
    addToCart(i){
      let getFo = JSON.parse(localStorage.getItem("MainFoodArray"));
      let cartObj = {
        foodName:getFo[i].name, 
        foodPics:getFo[i].picture, 
        price: parseInt(getFo[i].pricePPlate), 
        status:getFo[i].status, 
        qty:parseInt(this.allFoodInfo[i].qty),
        TotalA:parseInt(this.allFoodInfo[i].pricePPlate)*parseInt(this.allFoodInfo[i].qty)
      }
      // console
      // if(sessionStorage.Online == ""){
        if(localStorage.myCart != ""){
          for (let p = 0; p < JSON.parse(localStorage.getItem("myCart")).length; p++) {
            const element = JSON.parse(localStorage.getItem("myCart"))[p];
            if (element.foodName == getFo[i].name){
              alert("Item is Already In Cart");
              return
            }
          }
        }
        let cartArray=[]
        if(localStorage.myCart != null && localStorage.myCart == ""){
          cartArray = [cartObj, ...cartArray]
          localStorage.setItem("myCart", JSON.stringify(cartArray));
          document.getElementsByClassName("added")[i].style.display = "block"
          document.getElementsByClassName("added")[i].classList.add("editAnimate")
          this.$emit("addnumberincart")
        } else if(localStorage.myCart != null && localStorage.myCart != ""){
          let getC = JSON.parse(localStorage.getItem("myCart"));
          for (let k = 0; k < getC.length; k++) {
            cartArray = [getC[k], ...cartArray]
          }
          cartArray = [cartObj, ...cartArray]
          localStorage.setItem("myCart", JSON.stringify(cartArray));
          document.getElementsByClassName("added")[i].style.display = "block"
          document.getElementsByClassName("added")[i].classList.add("editAnimate")
          this.$emit("addnumberincart")
        }
      // } else {
      //   let getU = JSON.parse(localStorage.getItem("UsersArray"))
      //   for (let i = 0; i < getU.length; i++) {
      //     const element = getU[i];
      //     // if(element.cart != ""){
      //     //     for (let j = 0; j < element.cart.length; j++) {
      //     //       const fed = element.cart[j];
      //     //       if(fed.foodName == getFo[i].name){
      //     //         alert("Food Already In Cart")
      //     //         return
      //     //       }
      //     //     }
      //     //   }
      //     if(element.id == sessionStorage.Online){
      //       let cartArray = []
            
      //       if (element.cart == ""){
      //         cartArray = [...cartArray, cartObj]
      //         element.cart = cartArray
      //         localStorage.setItem("UsersArray", JSON.stringify(getU))
      //         this.$emit("addnumberincart")
      //         console.log(getU[i])
      //         document.getElementsByClassName("added")[i].style.display = "block"
      //     document.getElementsByClassName("added")[i].classList.add("editAnimate")
      //       } else{
      //         cartArray = [...element.cart]
      //         cartArray = [...cartArray, cartObj]
      //         element.cart = cartArray
      //         localStorage.setItem("UsersArray", JSON.stringify(getU))
      //         this.$emit("addnumberincart")
      //         console.log(getU[i])
      //         document.getElementsByClassName("added")[i].style.display = "block"
      //     document.getElementsByClassName("added")[i].classList.add("editAnimate")
      //       }
      //     }
        // }
      // }
    }
  }
}
</script>

<style scoped>
.foodCards{
  max-width:350px;
  height:150px;
  overflow:hidden;
  user-select: none;
  transition: 2s ease-in-out !important;
  background-color: rgba(255, 255, 255, 0.767);
}
.foodCards:hover{
  transition:.2s ease-in !important ;
  margin-top:2px;
  box-shadow: 2px 2px 5px #7979793f, -2px 2px 5px #7979793f !important ;
}
.foodCards img{
  height:150px;
  width: 170px;
}
.added{
  border-radius:0 0 20px 20px;
  z-index: +1;
  position: absolute;
}
.editAnimate{
	animation: editAnimation .8s ease !important;
}
.addBut{
  bottom: 8px;
  right:5px;
  background-color: #A07654;
  border:none;
  box-shadow: none !important;
}
.qty{
  bottom:8px;
  height: 30px;
}
@keyframes editAnimation {
    from {margin-top: -50px;}
    to {margin-top: 0px;}
}
.foodName, .title{
  color:gray;
}
</style>
