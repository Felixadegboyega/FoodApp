<template>
  <div class="p-4">
	<div class="container-fluid pt-5">
		<div class="row">
			<div class="col-12">
				<h6>Edit Food Informations</h6>
				<input type="text" @keyup="search" id="thesearch" class="form-control" placeholder="Search Food Name">
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="card shadow-sm p-0 m-4 foodCards" v-bind:key="i" v-for="(std, i) in allFoodInfo">
				<img :src="getPics(std.picture)" alt="Food Picture">
				<span style="font-size:0.6rem !important" class="float-right ml-auto rounded-bottom small p-1 badge-primary">{{std.status}}</span>
				<div class="ml-3 mb-3 mr-3 card-body p-0">
					<div><b>{{std.name}}</b></div>
					<div class="small">Available From {{std.timeFrom}}:00 to {{std.timeTo}}:00 </div>
					<div class="small">Price per Plate: {{std.pricePPlate}} </div>
					<button class="btn btn-sm btn-outline-primary mt-3 mr-2" @click="showEdit(i)">Edit</button>
					<button class="btn btn-sm btn-outline-danger mt-3" @click="deleteit(i)">Delete</button>
				</div>
				<div class="bg-light pt-3 text-light editFood" style="display:none">
					<h6 class="ml-3">Edit Food</h6>
					<div class="ml-3 mr-3">
						<div class="form-group form-inline">
							<label for="">Food Name</label>
							<input type="text" v-model="std.name" class="w-50 mr-4 ml-auto form-control" placeholder="Food Name">
						</div>
						<div class="form-group">
							<label for="">Time Available in 24hrs Format</label>
							<div class="form-group form-inline">
								<label for="" class="mr-2">From: </label>
								<input class="form-control w-25" v-model="std.timeFrom">
								<label for="" class="ml-2 mr-2">To:</label>
								<input class="form-control w-25" v-model="std.timeTo">
							</div>
						</div>
						<div class="form-group">
							<input type="file" class="PicsFile form-control" placeholder="" aria-describedby="helpId">
						</div>
						<button @click="canceledit(i)" class="btn-sm btn text-white w-25  btn-warning mb-3 mr-3">Cancel</button>
						<button @click="update(i)" class="btn-sm btn btn-primary w-25 mb-3">Save</button>
					</div>
				</div>
			</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'EditFood',
  props:["allFoodInfo"],
  data(){
	return{
		picture:"",
	}
  },
  beforeCreate(){
    if(sessionStorage.AdminO == null){
      this.$router.push(`/admin/adminlogin`)
    }
  },	
  methods:{
	getPics(i){
		return require('./img/' + i);
	},
	search(){
		let getAllFoods = document.getElementsByClassName("foodCards");
		let search = document.getElementById("thesearch").value;
		for (let i = 0; i < getAllFoods.length; i++) {
			let myRegex = new RegExp(search, "i");
			let hh = (getAllFoods[i].childNodes[2].childNodes[0].childNodes[0]);
			if (hh.innerText.search(myRegex) == -1){
				getAllFoods[i].style.display = "none";
			} else{
				getAllFoods[i].style.display = ""
			}
		}
	},
	deleteit(i){
		this.allFoodInfo.splice(i, 1);
		localStorage.setItem("MainFoodArray", JSON.stringify(this.allFoodInfo));
	},
	showEdit(i){
		let getEdits = document.getElementsByClassName("editFood");
		getEdits[i].style.display = "block"
		getEdits[i].classList.add("editAnimate")
	},
	update(i){
		let getEdits = document.getElementsByClassName("editFood");
		getEdits[i].style.display = "none"
		let myArray = this.allFoodInfo
		myArray[i].picture = document.getElementsByClassName("PicsFile")[i].files[0].name
		localStorage.setItem("MainFoodArray", JSON.stringify(myArray))
	},
	canceledit(i){
		let getEdits = document.getElementsByClassName("editFood");
		getEdits[i].style.display = "none"
	}
	
  }
}
</script>

<style scoped>
.foodCards{
  width:270px;
  height:340px;
  overflow:hidden;
}
.foodCards img{
  height:190px;
}
.editFood{
	margin-top: -280px;
	background-color: #636363e6 !important;
}
.editAnimate{
	animation: editAnimation .8s ease !important;
}
@keyframes editAnimation {
    from {margin-top: 100px;}
    to {margin-top: -280px;}
}
</style>
