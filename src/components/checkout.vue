<template>
  <div class="pt-5">
    <div v-if="condition != true" class="mt-5 mx-auto fit card shadow-sm">
      <h6 class="card-header">Confirm Your Details to CheckOut</h6>
      <div class="form-group m-3">
        <input type="text" v-model="conFE" class="form-control" placeholder="Phone Number or E-mail" >
      </div>
      <div class="form-group ml-3 mr-3">
        <input type="password" v-model="conFP" class="form-control" placeholder="Password" >
      </div>
      <!-- <div v-if="condition === false" class=	"loginalert alert alert-danger mr-3 ml-3 small p-1">Make sure the email or username you enter match your password</div> -->
      <div class="form-group ml-3 mr-3">
        <button @click="checkInf" class="btn-outline-primary btn btn-block">Confirm</button>
      </div>
      
      <div class="small ml-3 mb-2">
        <span>Don't have an account? </span>
        <router-link to="signup">Sign Up</router-link> 
      </div>
    </div>


	<div class="container-fluid pb-4">
		<div class="row">
			<div class="col-12 mx-auto pt-5 col-md-6">
				<div class="card p-2 pt-1" v-if="condition === true">
					<div class="form-group">
						<label for="" class="small">Phone Number or E-mail</label>
						<input type="text" v-model="conFE" class="small form-control" placeholder="Phone Number or E-mail" >
					</div>
					<div class="small form-group">
						<label for="">Shipping Address:</label>
						<input type="text" v-model="address" class="form-control" placeholder="Address">
					</div>
					<div class="small">
						Account Details to Pay to: <br>
						Account No: 0493497726, Account Name: Adegboyega Felix Oluwaferanmi 
					</div>
					<button type="button" id="confirmBut" @click="confirm" class="btn-sm btn-outline-primary confirm-btn btn m-4">Confirm</button>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'CheckOut',
  data(){
	return{
		address:"",
		conFE:"",
		conFP:"",
		id:"",
		userArray:"",
		condition:"",
		tran:"",
		formtran:"",
		orderArray:[]
	}
  },
  mounted(){
	
	if(localStorage.UsersArray != ""){
		this.userArray = JSON.parse(localStorage.getItem("UsersArray"))
	}
	if(sessionStorage.Online != ""){
		for (let i = 0; i < this.userArray.length; i++) {
			const element = this.userArray[i];
			if (element.id == sessionStorage.Online) {
				this.tran = this.userArray[i].transaction
				this.id = this.userArray[i].id
				this.conFE = this.userArray[i].phoneNumber
			}
			
		}
		this.condition = true
	}
  },
  methods:{
	checkInf(){
		for (let i = 0; i < this.userArray.length; i++) {
			if((this.userArray[i].email == this.conFE || this.userArray[i].phoneNumber == this.conFE)  && this.userArray[i].password == this.conFP){
				this.tran = this.userArray[i].transaction
				this.id = this.userArray[i].id
				sessionStorage.setItem("Online", this.userArray[i].id)
				this.condition = true;
			}
		}
	},
	confirm(){
		// let getTime = new Date()
		let getC = JSON.parse(localStorage.getItem("myCart"))
		if(this.address != ""){
			if(this.tran == ""){
				// alert("hey")
				for (let r = 0; r < getC.length; r++) {
					if(getC[r].status == "Available"){
						let carO = {
							foodName:getC[r].foodName,
							noOfPlate:getC[r].qty,
							priceP:getC[r].price,
							TotalA:getC[r].qty*getC[r].price,
							picture:getC[r].foodPics,
							mobileAddress:this.conFE,
							address:this.address
						}
						this.tran = [carO, ...this.tran]
						
					}
				}	
				if(localStorage.orderArray == ""){
					this.orderArray = [...this.tran]
					localStorage.setItem("orderArray", JSON.stringify(this.orderArray))
				} else{
					this.orderArray = [...localStorage.orderArray]
					this.orderArray = [...this.orderArray, ...this.tran]
					localStorage.setItem("orderArray", JSON.stringify(this.orderArray))
				}
				for (let q = 0; q < this.userArray.length; q++) {
					if (this.userArray[q].email == this.conFE || this.userArray[q].phoneNumber == this.conFE){
						this.userArray[q].transaction = this.tran
					}
				}
				localStorage.setItem("UsersArray", JSON.stringify(this.userArray))
				getC = ""
				localStorage.setItem("myCart", JSON.stringify(getC))
				window.location = `/account/${this.id}`
			} else{
				for (let s = 0; s < this.tran.length; s++) {
					this.formtran = [...this.tran]
				}
				for (let r = 0; r < getC.length; r++) {
					if(getC[r].status == "Available"){
						let carO = {
							foodName:getC[r].foodName,
							noOfPlate:getC[r].qty,
							priceP:getC[r].price,
							TotalA:getC[r].qty*getC[r].price,
							picture:getC[r].foodPics,
							mobileAddress:this.conFE,
							address:this.address
						}
						this.formtran = [carO, ...this.formtran]
					}
				}
				if(localStorage.orderArray == ""){
					this.orderArray = [...this.formtran]
					localStorage.setItem("orderArray", JSON.stringify(this.orderArray))
				} else{
					this.orderArray = [...this.orderArray, ...this.formtran]
					localStorage.setItem("orderArray", JSON.stringify(this.orderArray))
				}
				for (let q = 0; q < this.userArray.length; q++) {
					if (this.userArray[q].email == this.conFE || this.userArray[q].phoneNumber == this.conFE){
						this.userArray[q].transaction = this.formtran
					}
				}
				localStorage.setItem("UsersArray", JSON.stringify(this.userArray))
				getC = ""
				localStorage.setItem("myCart", JSON.stringify(getC))
				window.location = `/account/${this.id}`
				console.log(this.orderArray)
			}
		} else {
			alert("please input an Address")
		}
	}
  }
}
</script>

<style scoped>
.card{
	width: 320px;
	margin:Auto
}
</style>
