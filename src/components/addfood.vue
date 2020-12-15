<template>
  <div class="pt-5 pb-5 mt-5">
    <div class="mx-auto card shadow-sm mt-4">
      <h6 class="card-header bg-secondary text-light">Add Food</h6>
      <div class="form-group ml-3 mr-3 mt-3 form-inline">
        <label for="#foodname">Food Name:</label>
        <input id="foodname" type="text" v-model="foodObj.name" class="w-50 ml-auto m-0 form-control" placeholder="Food Name">
      </div>
      <div class="form-group ml-3 mr">
        <label for="#foodTime">Time Available</label> <br>
        <div class="form-group form-inline">
          <label for="">From:</label>
          <input id="foodTime" v-model="foodObj.timeFrom" max="24" min="0" type="" class="foodTime w-25 ml-3 form-control">
          <label for="" class="ml-4">To:</label>
          <input id="foodTime" v-model="foodObj.timeTo" max="24" min="0" type="" class="foodTime w-25 ml-4 form-control">
        </div>
      </div>
      <div class="form-group form-inline ml-3 mr-3">
        <label for="">Price in Naira</label>
        <input v-model="foodObj.pricePPlate" placeholder="Price Per Plate" class="ml-auto w-50 form-control">
      </div>
      <div class="form-group ml-3 mr-3">
        <input id="foodPics" type="file" class="foodPics form-control">
      </div>
      <button @click="addFood" class="m-3 btn btn-outline-secondary">Upload</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Addfood',
  props:[],
  data(){
    return{
      foodObj:{
        name:"",
        timeFrom:"",
        timeTo:"",
        picture:"",
        status:"",
        pricePPlate:"",
        qty:1
      },
    }
  },
  beforeCreate(){
    if(sessionStorage.AdminO == null){
      this.$router.push(`/admin/adminlogin`)
    }
  },
  methods:{
    addFood(){
      let foodObj = this.foodObj;
      if(foodObj.timeFrom.search("PM") != -1 && foodObj.timeFrom.search(12) == -1 ){
        foodObj.timeFrom = foodObj.timeFrom.slice(0,2)
        foodObj.timeFrom = parseInt(foodObj.timeFrom)
        foodObj.timeFrom += Number(12);
      } else{
        foodObj.timeFrom = foodObj.timeFrom.slice(0,2);
        foodObj.timeFrom = parseInt(foodObj.timeFrom)
      }
      if(foodObj.timeTo.search("PM") != -1 && foodObj.timeTo.search(12) == -1){
        foodObj.timeTo = foodObj.timeTo.slice(0,2)
        foodObj.timeTo = parseInt(foodObj.timeTo)
        foodObj.timeTo += Number(12);
      }else {
        foodObj.timeTo = foodObj.timeTo.slice(0,2)
        foodObj.timeTo = parseInt(foodObj.timeTo)
      }
      foodObj.picture = document.getElementById("foodPics").files[0].name;
      let allFoodArray = []
      if (localStorage.MainFoodArray == "" ) {
        allFoodArray = [foodObj, ...allFoodArray];
        localStorage.setItem("MainFoodArray", JSON.stringify(allFoodArray))
      } else{
        let getFoodArray = JSON.parse(localStorage.getItem("MainFoodArray"));
        for (let i = 0; i < getFoodArray.length; i++) {
          const element = getFoodArray[i];
          if(element.name == foodObj.name){
            alert("Food Already In Menu")
            return
          }
          allFoodArray = [element, ...allFoodArray];
        }
        allFoodArray = [foodObj, ...allFoodArray];
        localStorage.setItem("MainFoodArray", JSON.stringify(allFoodArray))
      }
      foodObj.name = "";
      foodObj.timeFrom = ""
      foodObj.timeTo = ""
      foodObj.picture = ""
      foodObj.status = ""
    },
  }
}
</script>

<style scoped>
.card{
  width:320px
}
.foodTime{
  width:80px !important;
}
.foodPics{
  max-width:290px;
}

</style>
