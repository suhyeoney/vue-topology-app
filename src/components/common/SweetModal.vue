<script>
import { SweetModal } from 'sweet-modal-vue';

export default {
    name: 'SweetModal',
    extends: SweetModal, // extends : "하나만" 상속 가능 하지만 style, template 가져올수 있다. ( 기능 + ui or ui 분리 )
    props: {
        // 하위 컴포넌트(SweetModal.vue)는 props 옵션을 사용해 수신할 것으로 기대되는 props를 명시적으로 선언해야 함
        overlayClosing: { // value : true or false
            type: Boolean, 
            required: false,
            default: true
        }
    },
    methods: {
        // https://github.com/visma-meglerfront/sweet-modal-vue/blob/master/src/components/SweetModal.vue 소스를 커스토마이징 
        _onOverlayClick(event) {
            if (!event.target.classList || event.target.classList.contains('sweet-modal-clickable')) {
                if (this.blocking) {
                    if (this.pulseOnBlock) {
                        this.bounce();
                    }
                }
                else {
                    this.close(this.overlayClosing);
                }
            }
        },

        close(p) {
            this._unlockBody();
            if(this.overlayClosing || typeof p  === 'undefined') {
                this.visible = false;
                setTimeout(() => this.is_open = false, 300);
            } else {
                this.$emit('close');
            }
        }
    }
}
</script>
<style lang="">
    
</style>