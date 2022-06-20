<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'

export default {
  name: 'SampleTopology',
  components: {
    D3Network
  },
  props: {
    msg: String
  },
  data() {
    return {
        nodes: [
            {id: 1, name: "Node1"},
            {id: 2, name: "Node2"}
        ],
        links: [
            {sid: 1, tid: 2, _color: "red"}
        ],
        options: {
            force: 3000,
            nodeSize:15,
            nodeLabels: true,
            linkWidth: 5
        }
    }
  }
}
</script>

<style>
</style>
