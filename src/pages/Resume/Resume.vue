<template>
    <div>{{ resume.name }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: 'Resume',
    setup() {
        const resume = ref({
            name: 'Alisher'
        })

        return {
            resume,
        }
    }
})
</script>

<style></style>