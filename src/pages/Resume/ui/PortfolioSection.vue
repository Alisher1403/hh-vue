<template>
  <div class="resume-sector-7 sector">
    <div class="content">
      <h2 class="title">Портфолио</h2>
      <ul class="user-portfolio-list">
        <li class="user-portfolio" v-for="portfolio in resume.portfolio" :key="resume.portfolio.indexOf(portfolio)">
          <div class="content" @click="portfolioDialog(portfolio)">
            <img class="portfolio-image" :src="portfolio.img" alt="" />
            <img class="portfolio-bg" :src="portfolio.img" alt="" />
          </div>
        </li>
      </ul>
    </div>

    <div :open="checkout !== null" class="portfolio-dialog" @click="portfolioDialog(null)">
      <div class="dialog-content" @click.stop>
        <div class="dialog-show">
          <img :src="checkout?.img" class="portfolio-image" alt="" />
        </div>
        <div class="dialog-description" v-if="checkout?.title">
          <h2 class="title">{{ checkout.title }}</h2>
          <div class="description text-block" v-html="checkout.description"></div>
        </div>
      </div>
      <button v-html="icons.x" class="exit-button" @click.stop="portfolioDialog(null)"></button>
    </div>

    <router-link to="" class="resume-editor-link">Редактировать</router-link>
  </div>
</template>

<script lang="ts">
import { useStore } from "../../index";
import { defineComponent, ref } from "vue";
import { icons } from "@/shared/assets/icons";

interface iPortfolio {
  title: string;
  description: string;
  img: string;
}

export default defineComponent({
  setup() {
    const store = useStore();
    const resume = store.state.resume;
    const checkout = ref<iPortfolio | null>(null);

    function portfolioDialog(portfolio: iPortfolio): void {
      document.body.style.overflow = portfolio == null ? "auto" : "hidden";
      checkout.value = portfolio;
    }

    return { resume, icons, checkout, portfolioDialog };
  },
});
</script>

<style></style>
