<template>
  <Navigation />
  <div class="container">
    <SearchBar />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SearchBar } from "@/shared/UI";
import { Navigation } from "@/widgets";
import "#/index"

export default defineComponent({
  components: {
    Navigation,
    SearchBar,
  }
})
</script>

<style>
@import '@/shared/assets/style.scss';
</style>
