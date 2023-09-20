<template>
  <Navigation />
  <div class="container">
    <SearchBar />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Navigation } from "./components/UI";
import { SearchBar } from "./components/UI";

export default defineComponent({
  components: {
    Navigation,
    SearchBar,
  }
})
</script>

<style>
@import url(./assets/style.scss);
</style>
