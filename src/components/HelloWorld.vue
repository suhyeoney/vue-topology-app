<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <div>
      노드명
      <input type="text" v-model="inputNodeName" @keyup.enter="createNode" />
      <button @click="createNode" :disabled="inputNodeName.length === 0">생성</button>
    </div>
    <span id="hintMessage">{{ hintMessage }}</span>
  </div>
</template>

<script>
import { EventBus } from '../utils/eventBus';

export default {
  name: 'HelloWorld',
  data() {
    return {
      inputNodeName: '',
      hintMessage: '',
      tempInputNodeName: ''
    }
  },
  props: {
    msg: String
  },
  watch: {
    inputNodeName(newVal) {
      newVal.length == 0 ? this.hintMessage = '생성할 노드명을 입력해주세요.' : this.hintMessage = '';
      EventBus.$on('clear', (response) => {
        if(response == 'CLEAR') {
          this.init();
        }
      });
    },
  },
  methods: {
    init() {
      this.inputNodeName = '';
      this.hintMessage = '';
    },
    createNode() {
      // 글로벌 변수(tempInputNodeName)로 저장한 노드명과 같으면, 이미 생성되어 있는 중복 노드로 판단
      if(this.inputNodeName == this.tempInputNodeName) {
         this.hintMessage = '이미 존재하는 노드명입니다';
         return;
      }
      this.$store.commit('createNode', this.inputNodeName);
      EventBus.$off('responseIsDuplicate');
      EventBus.$on('responseIsDuplicate', response => {
        // 직전(가장 최근)에 생성한 노드명을 글로벌 변수(tempInputNodeName)에 저장
        // 중복 플래그로 중복 여부 판단
        this.tempInputNodeName = response.value;
        response.flag ? this.hintMessage = '이미 존재하는 노드명입니다.' : this.hintMessage = '';
      });
    },
  },
  mounted() {
    this.init();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#hintMessage {
  color: red;
}
</style>
