<template>
    <custom-sweet-modal ref="topologyOptionsModal" id="sweet_modal_style" overlay-theme="dark" :overlayClosing="false" @close="closeModal"  blocking>
        <div>
            <ToggleButton :prevLabel="editLabel" :nextLabel="readLabel" :flag="isReadable" @toggle="toggleButton" />
            <div>
                <h1>Topology Options</h1>
            </div>
            <table>
                <tbody>
                <tr>
                    <td v-for="(item, idx) in optionsKeys" :key="idx">{{ item }}</td>
                </tr>
                <tr v-if="isReadable">
                    <!-- <td  v-for="(item, idx) in optionsKeys" :key="idx">
                        {{ options[item] === true ? 'Yes' : options[item] === false ? 'No' : options[item] }}
                    </td> -->
                    <td  v-for="item in optionsKeys" :key="item">
                        <div v-if="typeof(redefinedOptions[item]) === 'boolean'">
                            <input type="checkbox" v-model="redefinedOptions[item]" disabled />
                        </div>
                        <div v-else>
                            {{ redefinedOptions[item] }}
                        </div>
                    </td>
                </tr>
                <tr v-else>
                    <td  v-for="item in optionsKeys" :key="item">
                        <div v-if="typeof(redefinedOptions[item]) === 'boolean'">
                            <input type="checkbox" v-model="redefinedOptions[item]" />
                        </div>
                        <div v-else>
                            <input type="text" v-model="redefinedOptions[item]" />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </custom-sweet-modal>
</template>
<script>
import ToggleButton from '@/components/common/ToggleButton.vue';
import _ from 'lodash';

export default {
    name: 'TopologyOptionsModal',
    props: {
    },
    components: {
        ToggleButton
    },
    computed: {
        // redefinedOptions() {
        //     return this.$store.getters.options;
        // },
        optionsKeys() {
            return Object.keys(this.$store.state.nodeStore.options);
        }
    },
    watch: {
    },
    data() {
        return {
            editLabel: '편집하기',
            readLabel: '변경내역 저장 후 돌아가기',
            isReadable: true,
            isEditComplete: null,
            redefinedOptions: _.cloneDeep(this.$store.state.nodeStore.options)
        };
    },
    methods: {
        openModal() {
            this.$refs.topologyOptionsModal.open();
        },

        closeModal() {
            this.isReadable = true;
            this.isEditComplete = null;
            this.redefinedOptions = {...this.$store.state.nodeStore.options};
            this.$refs.topologyOptionsModal.close();
        },

        toggleButton(param) {
            /*
            하위 컴포넌트에서는 상위 컴포넌트에서 보낸 props를 직접적으로 수정하지 말고,
            별도의 변수에 담아 수정하고  [1]
            emit을 통해 상위 컴포넌트로 보낸 다음 [2]
            emit으로 받은 변수를 가지고 상위 컴포넌트에서 원래 전역변수를 수정 (@toggle="toggleButton") [3]
            */
            this.isReadable = param; // [3]
            if(this.isReadable)  { // 편집모드에서 보기모드로 토글링되었을 경우, 옵션변경내역 커밋
                const paramOptions = {
                    force: Number(this.redefinedOptions.force),
                    nodeSize: Number(this.redefinedOptions.nodeSize),
                    nodeLabels: this.redefinedOptions.nodeLabels,
                    linkWidth: Number(this.redefinedOptions.linkWidth)
                };
                this.$store.commit('nodeStore/setOptions', paramOptions);
                this.isEditComplete = true;
            }
        }   

    },
}
</script>
<style lang="">
    
</style>