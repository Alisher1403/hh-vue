<template>
    <div class="editor-btns" v-once v-bind="positionProps">
        <button class="editor-btn" @click="$emit('save')">Сохранить</button>
        <button class="editor-btn" transparent @click="$emit('cancel')">Отменить</button>
    </div>
</template>

<script lang="ts">
export default {
    props: ['positionProps']
}
</script>

<style lang="scss" scoped>
@import '@/assets/style.scss';

.editor-btns {
    display: flex;
    column-gap: 5px;

    &[justify-start] {
        justify-content: flex-start;
    }

    &[justify-center] {
        justify-content: center;
    }

    &[justify-end] {
        justify-content: flex-end;
    }

    $bg: var(--btn-bg);
    $bg-hover: var(--btn-bg-hover);
    $transition: var(--btn-bg-transition);
    margin-top: 20px;

    .editor-btn {
        background-color: $bg;
        border-radius: 25px;
        cursor: pointer;
        @include text();
        border: none;
        font-size: 14px;
        padding: 10px 15px;
        border: 1px solid $bg;
        color: white;
        transition: 0.2s;

        &:hover {
            background-color: $bg-hover;
        }

        &[transparent] {
            background-color: transparent;
            color: $bg;
            border: 1px solid $bg;
            transition: 0.2s;

            &:hover {
                color: white;
                background-color: $bg;
            }
        }
    }
}
</style>