<template>
    <div class="modal" v-if="open">
        <div class="modal-bg" @click="$emit('onClose')"></div>
        <div class="modal-container" v-if="title">
            <div class="modal-title-wrapper">
                <div class="modal-title">{{ title }}</div>
                <button class="modal-btn" v-html="icons.x" @click="$emit('onClose')"></button>
            </div>
            <slot @click.stop></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { icons } from "@/assets/icons";
import { defineComponent, watch } from "vue";

export default defineComponent({
    name: 'Modal',
    props: {
        open: null,
        title: String,
    },
    setup(props) {
        watch(() => props.open, (newState) => {
            document.body.style.overflow = newState ? 'hidden' : 'auto';
        });

        return {
            icons
        }
    },
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

    $border-radius: 10px;

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

    .modal-container {
        background: white;
        border-radius: $border-radius;
        padding: 5px;
        overflow: hidden;

        .modal-title-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 13px 25px;
            background: var(--element-background);
            border-radius: calc($border-radius - 2.5px);
            height: 100%;

            .modal-title {
                font-size: 15px;
                font-family: var(--font-semibold);
                color: white;
            }

            .modal-btn {
                @include rm-default();
                height: 15px;
                cursor: pointer;

                &:hover {
                    svg {
                        fill: rgb(214, 214, 214);
                        stroke: rgb(214, 214, 214);
                    }
                }

                svg {
                    fill: white;
                    stroke: white;
                }
            }
        }

        .modal-content {
            padding: 18px 25px;
            max-width: 600px;
            width: 100%;
            display: flex;
            flex-direction: column;
            row-gap: 15px;
            border-left: none;
            border-right: none;
        }
    }
}
</style>