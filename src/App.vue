<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="gotoMain">메인 View로 이동</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
methods: {
  movePage(page) {
    this.$router.push({ name: page });
  },

  gotoMain() {
    this.movePage('Main');
  },
},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: auto;
}
</style>
