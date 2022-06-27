import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        inputNodeName: ''
    },
    getters: {
        inputNodeName: state => state.inputNodeName
    },
    mutations: {
        // create: (state, data) => (state.inputNodeName = data)
        create: (state, payload) => {
            state.inputNodeName = payload;
            console.log(state);
        }
    },
});