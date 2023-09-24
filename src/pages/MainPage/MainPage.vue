<template>
    <main>
        <div class="container">

        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SearchBar } from "@/components/UI";
import "@/database.ts"

export default defineComponent({
    name: 'MainPage',
    components: {
        SearchBar
    }
});
</script>

<style></style>