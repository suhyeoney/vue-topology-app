<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
    <span v-if="inputNodeName !== ''">{{ inputNodeName }} 노드가 생성되었습니다.</span>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import _ from 'lodash';
import { EventBus } from '@/utils/eventBus';

export default {
  name: 'SampleTopology',
  components: {
    D3Network
  },
  props: {
    msg: String,
  },
  computed: {
    inputNodeName() {
      return this.$store.state.inputNodeName;
    }
  },
  watch: {
    inputNodeName(newVal, oldVal) {
      let originNodes = _.cloneDeep(this.nodes);
      const isDuplicate = originNodes.find((node) => node.name == newVal) != null ? true : false;
      console.log("oldVal : " + oldVal + ", newVal : " + newVal);
      if(isDuplicate) {
        EventBus.$emit('responseIsDuplicate', true);
      }
      else {
        this.receivedNewNode = newVal;
        this.nodes.push({
          id: this.nodes.length + 1,
          name: this.receivedNewNode,
          connected: 0
        });

        if(this.nodes.length > 1) {
          let randomlySelectedNodeId =  originNodes[Math.floor(Math.random() * originNodes.length)].id;
          let createdNodeId = this.nodes[this.nodes.length - 1].id;
          let randomlySelectedNode = this.nodes.find((node) => node.id == randomlySelectedNodeId);
          let createdNode =  this.nodes.find((node) => node.id == createdNodeId);
          randomlySelectedNode.connected++;
          createdNode.connected++;
        
          this.links.push({
            sid: randomlySelectedNodeId,
            tid: createdNodeId,
            _color: this.setLinkColor(randomlySelectedNode)
          });
        }
      }
    }
  },
  data() {
    return {
        nodes: [
          // connected : 노드가 다른 노드와 연결되어 있는 개수
            // {id: 1, name: 'Node1', connected: 1},
            // {id: 2, name: 'Node2', connected: 1}
        ],
        links: [
            // {sid: 1, tid: 2, _color: 'red'}
        ],
        options: {
            force: 3000,
            nodeSize:15,
            nodeLabels: true,
            linkWidth: 5
        },
        receivedNewNode: ''
    }
  },
  methods: {
    setLinkColor(node) { // 빨, 주, 노, 초, 파
      let remains = node.connected % 5;
      if(remains == 1) return 'red';
      else if(remains == 2) return 'orange';
      else if(remains == 3) return 'yellow';
      else if(remains == 4) return 'green';
      else return 'blue';
    }
  },
  created() {
    
  },
  mounted() {
  },
}
</script>

<style>
</style>
