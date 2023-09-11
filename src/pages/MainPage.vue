<template>
    <main>
        <div class="container">
            
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SearchBox } from "@/components/UI";
import "@/database.ts"

export default defineComponent({
    name: 'MainPage',
    components: {
        SearchBox
    }
});
</script>

<style></style>