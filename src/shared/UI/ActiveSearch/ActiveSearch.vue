<template>
    <div class="resume-active">
        <div class="resume-active-left">
            <div class="resume-active-indicator"></div>
            <p class="resume-active-paragraph">Активно ищу работу</p>
        </div>
        <button class="resume-active-change">Изменить</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ActiveSeek'
})
</script>

<style scoped lang="scss">
@import '@/shared/assets/style.scss';

.resume-active {
    background: var(--element-background);
    padding: 16px 20px;
    border-radius: 9px;
    @include flex(space-between, center);

    .resume-active-left {
        @include flex(center, center, 20px);

        .resume-active-indicator {
            height: 8px;
            aspect-ratio: 1/1;
            background: rgb(0, 178, 0);
            border-radius: 2px;
        }

        .resume-active-paragraph {
            line-height: 100%;
        }
    }

    .resume-active-change {
        @include link-style();
        padding: 1px 0;
        border-bottom: 1px dashed var(--link-color);
    }
}
</style>