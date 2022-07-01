import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import nodeStore from './modules/nodeStore';

export default new Vuex.Store({
    modules: {
        nodeStore: nodeStore,
    }

    // plugins: [
    //     createPersistedState({
    //     })
    // ]
});

/*
    화면 리프레시 > Vue 인스턴스 소멸 후 재생성됨에 따라 Vuex store의 모든 state가 초기화됨 
*/