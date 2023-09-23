<template>
    <div class="">{{ myObj.name }}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Test',
    setup() {
        const myObj = ref({ name: 'Alisher' });
        return {
            myObj
        }
    }
})
</script>

<style></style>