<template>
  <div id="main">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <SampleTopology msg="여기부터는 Topology 영역입니다." />
  </div>
</template>
<script>
import HelloWorld from '../components/HelloWorld.vue'
import SampleTopology from '../components/network/SampleTopology.vue'

export default {
  name: 'Main',
  components: {
    HelloWorld,
    SampleTopology
  }
}
</script>
<style lang="">
  
</style>