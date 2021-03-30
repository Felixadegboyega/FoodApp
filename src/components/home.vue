<template>
  <div>
    <div class="container-fluid">
      <div class="row head">
        <div class="text-white col-sm-8 my-auto mr-sm-auto">
          <div class="fit mx-auto">
            <h1>Welcome to Lorem Foodz</h1>
            <div>...serve you with maximum satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props:["allFoodInfo"],
}
</script>

<style scoped>
.head{
  height:85vh;
  background-image: url(./img/back.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;
  background-attachment: fixed;
  background-blend-mode: color-burn;
  background-color: #7b4b2379;
  transition:1s ease-in;
}
</style>
