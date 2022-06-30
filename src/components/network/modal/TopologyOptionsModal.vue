<template>
    <custom-sweet-modal ref="topologyOptionsModal" id="sweet_modal_style" overlay-theme="dark" :overlayClosing="false" @close="closeModal"  blocking>
        <div>
            <ToggleButton :prevLabel="editLabel" :nextLabel="readLabel" :flag="isNotEditable" @toggle="toggleButton" />
            <div>
                <h1>Topology Options</h1>
            </div>
            <table v-if="isNotEditable">
                <tbody>
                <tr>
                    <td v-for="(item, idx) in optionsKeys" :key="idx">{{ item }}</td>
                </tr>
                <tr>
                    <td  v-for="(item, idx) in optionsKeys" :key="idx">
                        {{ options[item] === true ? 'Yes' : options[item] === false ? 'No' : options[item] }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </custom-sweet-modal>
</template>
<script>
import ToggleButton from '@/components/common/ToggleButton.vue';

export default {
    name: 'TopologyOptionsModal',
    props: {
        optionsKeys: Array,
        options: Object,
    },
    components: {
        ToggleButton
    },
    computed: {
    },
    watch: {
    },
    data() {
        return {
            editLabel: '편집하기',
            readLabel: '돌아가기',
            isNotEditable: true,
        };
    },
    methods: {
        openModal() {
            this.$refs.topologyOptionsModal.open();
        },

        closeModal() {
            this.$refs.topologyOptionsModal.close();
        },

        toggleButton(param) {
            /*
            하위 컴포넌트에서는 상위 컴포넌트에서 보낸 props를 직접적으로 수정하지 말고,
            별도의 변수에 담아 수정하고  [1]
            emit을 통해 상위 컴포넌트로 보낸 다음 [2]
            상위 컴포넌트에서 받은 변수를 가지고 원래 전역변수를 수정 [3]
            */
            this.isNotEditable = param; // [3]
        }

    },
}
</script>
<style lang="">
    
</style>