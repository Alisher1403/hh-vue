<template>
    <div class="modal" v-if="open">
        <div class="modal-bg" @click="$emit('onClose')"></div>
        <slot @click.stop></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Modal',
    props: {
        open: null,
    },
    setup(props) {
        document.body.style.overflow = props.open ? 'hidden' : 'auto';
    }
});
</script>

<style lang="scss">
@import '@/assets/style.scss';

.modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    animation: modal-animation 0.3s forwards;
    opacity: 0;
    visibility: collapse;
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes modal-animation {
        100% {
            visibility: visible;
            opacity: 1;
        }
    }

    .modal-bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        width: 100%;
        background: var(--modal-bg);
        z-index: -1;
    }

    .modal-content {
        background: white;
        border-radius: 10px;
        padding: 20px;
        width: 500px;
    }
}
</style>