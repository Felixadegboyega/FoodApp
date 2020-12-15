<template>
  <div class="pt-3">

    <ul class="nav fixed-top adminnav nav-tabs bg-light nav-stacked">
      <li class="nav-item ml-sm-3">
        <router-link to="/admin/adminlogin" class="nav-link">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/editfood" class="nav-link">Edit Food Info</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/addfood" class="nav-link">Add Food</router-link>
      </li>
      <li class="nav-item mr-sm-3">
        <router-link to="/admin/orderRequest" class="nav-link">Order Request</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Admin',
}
</script>

<style scoped>
.adminnav{
  top:60px;
}

</style>
