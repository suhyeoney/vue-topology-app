<template>
    <button @click="toggleButton">{{ flag ? prevLabel : nextLabel }}</button>
</template>
<script>

export default {
    name: 'ToggleButton',
    props: {
        prevLabel:String,
        nextLabel: String,
        flag: Boolean
    },
    methods: {
        toggleButton() {
            /*
            하위 컴포넌트에서는 상위 컴포넌트에서 보낸 props를 직접적으로 수정하지 말고,
            별도의 변수에 담아 수정하고  [1]
            emit을 통해 상위 컴포넌트로 보낸 다음 [2]
            emit으로 받은 변수를 가지고 상위 컴포넌트에서 원래 전역변수를 수정 (@toggle="toggleButton") [3]
            */
            let flagToggled = !this.flag; // [1]
            this.$emit('toggle', flagToggled); // [2]
        }
    }
}
</script>
<style lang="">
    
</style>