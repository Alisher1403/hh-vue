<template>
  <Navigation />
  <div class="container">
    <SearchBox />
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Navigation } from "./components/UI";
import { SearchBox } from "./components/UI";

export default defineComponent({
  components: {
    Navigation,
    SearchBox,
  }
})
</script>

<style>
@import url(./assets/style.scss);
</style>
