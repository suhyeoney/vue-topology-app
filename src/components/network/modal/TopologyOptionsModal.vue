<template>
    <custom-sweet-modal ref="topologyOptionsModal" id="sweet_modal_style" overlay-theme="dark" :overlayClosing="false" @close="closeModal"  blocking>
        <div>
            <button @click="isEditable">{{ isEditable ? '돌아가기' : '값 변경하기' }}</button>
            <div>
                <h1>Topology Options</h1>
            </div>
            <table v-if="!isEditable">
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
export default {
    name: 'TopologyOptionsModal',
    props: {
        optionsKeys: Array,
        options: Object,
    },
    components: {},
    computed: {
    },
    watch: {
        isEditable(newVal, oldVal) {
            console.log('편집 버튼 클릭');
            console.log(newVal);
            console.log(oldVal);
        }
    },
    data() {
        return {
            isEditable: false,
        };
    },
    methods: {
        openModal() {
            this.$refs.topologyOptionsModal.open();
        },

        closeModal() {
            this.$refs.topologyOptionsModal.close();
        },
    },
}
</script>
<style lang="">
    
</style>