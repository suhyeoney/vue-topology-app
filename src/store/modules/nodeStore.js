const nodeStore = {
    namespaced: true,
    state: {
        inputNodeName: '',
        options: {
            force: 3000,
            nodeSize: 15,
            nodeLabels: true,
            linkWidth: 5
        }
    },
    getters: {
        inputNodeName: state => state.inputNodeName,
        options: state => state.options
    },
    mutations: {
        createNode: (state, payload) => {
            state.inputNodeName = payload;
        },

        setOptions: (state, payload) => {
            state.options.force = Number(payload.force);
            state.options.nodeSize = Number(payload.nodeSize);
            state.options.nodeLabels = payload.nodeLabels;
            state.options.linkWidth = Number(payload.linkWidth);
        },

        initialize: (state) => {
            state.inputNodeName = '';
        }
    },
}

export default nodeStore