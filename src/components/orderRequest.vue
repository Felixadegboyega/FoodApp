<template>
  <div class="pt-5">
    <table class="table mt-5 text-center">
      <thead>
        <tr>
          <th></th>
          <th style="width:180px">Name</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
          <th style="width:300px">Address</th>
          <th>Mobile Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="i" v-for="(ord, i) in request">
          <td style="width:150px; height:120px !important">
            <img :src="require(`./img/${ord.picture}`)" alt=""  class="w-100 h-100">
          </td>
          <td class="pt-4">{{ord.foodName}}</td>
          <td class="pt-4">{{ord.noOfPlate}}</td>
          <td class="pt-4">{{ord.priceP}}</td>
          <td class="pt-4">{{ord.TotalA}}</td>
          <td class="pt-4">{{ord.address}}</td>
          <td class="pt-4">{{ord.mobileAddress}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OrderRequest',
  data(){
    return{
      request:""
    }
  },
  beforeCreate(){
    if(sessionStorage.AdminO == null){
      this.$router.push(`/admin/adminlogin`)
    }
  },
  mounted(){
    if(localStorage.orderArray != ""){
      this.request = JSON.parse(localStorage.orderArray)
    }
  }
}
</script>

<style scoped>
</style>
