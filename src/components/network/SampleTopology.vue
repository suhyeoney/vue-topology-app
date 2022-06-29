<template>
  <div id="app">
    <button @click="openTopologyOptionsModal">토폴로지 옵션세팅</button>
    <h1>{{ msg }}</h1>
    <div v-if="nodes.length !== 0">
      <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
    </div>
    <div v-else>
      ##### 생성된 노드가 없습니다.  #####
    </div>
    <div v-if="nodes.length !== 0">
      <span>{{ inputNodeName }} 노드가 생성되었습니다.</span>
      <br>
      <span>총 {{ nodes.length }} 개의 노드가 생성되었습니다.</span>
      <br>
      <button @click="clear">초기화</button>
    </div>
    <TopologyOptionsModal 
    ref="topologyOptions" 
    @openModal="openTopologyOptionsModal" 
    :optionsKeys="Object.keys(options)"
    :options="options"
    ></TopologyOptionsModal>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import TopologyOptionsModal from './modal/TopologyOptionsModal.vue';
import _ from 'lodash';
import { EventBus } from '@/utils/eventBus';

export default {
  name: 'SampleTopology',
  components: {
    D3Network,
    TopologyOptionsModal
  },
  props: {
    msg: String,
  },
  computed: {
    inputNodeName: {
      get() {
        return this.$store.state.inputNodeName;
      },
      set(newValue) {
        console.log(newValue);
        this.$store.state.inputNodeName = newValue;
      }
    }
  },
  watch: {
    inputNodeName(newVal) {
      let originNodes = _.cloneDeep(this.nodes);
      const isDuplicate = originNodes.find((node) => node.name == newVal) != null ? true : false;
      if(isDuplicate) {
        EventBus.$emit('responseIsDuplicate', 
        {
          'flag': true,
          'value': newVal
        });
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
        EventBus.$emit('responseIsDuplicate', 
        {
          'flag': false,
          'value': newVal
        });
      }
    },
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
    openTopologyOptionsModal() {
      console.log('Open Topology Options Modal');
      this.$refs.topologyOptions.openModal();
    },


    setLinkColor(node) { // 빨, 주, 노, 초, 파
      let remains = node.connected % 5;
      if(remains == 1) return 'red';
      else if(remains == 2) return 'orange';
      else if(remains == 3) return 'yellow';
      else if(remains == 4) return 'green';
      else return 'blue';
    },

    clear() {
      this.nodes = [];
      this.links = [];
      this.receivedNewNode = '';
      EventBus.$emit('clear', 'CLEAR');
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
