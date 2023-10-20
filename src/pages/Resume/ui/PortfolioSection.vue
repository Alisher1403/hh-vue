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

    <div :open="checkout" class="portfolio-dialog" @click="checkout = false">
      <div class="dialog-content" @click.stop>
        <div class="dialog-show">
          <img :src="checkoutItem?.img" class="portfolio-image" alt="" />
        </div>
        <div class="dialog-description" v-if="checkoutItem?.title">
          <h2 class="title">{{ checkoutItem.title }}</h2>
          <div class="description text-block" v-html="checkoutItem.description"></div>
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
    const checkout = ref<boolean>(false);
    const checkoutItem = ref<iPortfolio>();

    function portfolioDialog(portfolio: iPortfolio): void {
      document.body.style.overflow = portfolio == null ? "auto" : "hidden";
      checkout.value = true;
      checkoutItem.value = portfolio;
    }

    return { resume, icons, checkout, checkoutItem, portfolioDialog };
  },
});
</script>

<style lang="scss">
@import "@/shared/assets/style.scss";

.resume-sector-7 {
  padding: 20px auto;

  .user-portfolio-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .user-portfolio {
      height: 200px;
      aspect-ratio: 1/1;
      cursor: pointer;

      @include media(450px) {
        height: 150px;
      }

      @include media(350px) {
        height: 130px;
      }

      .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
        padding: 7px;

        .portfolio-image {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }

        .portfolio-bg {
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: -1;
          filter: blur(20px) saturate(2);
        }

        .portfolio-name {
          white-space: nowrap;
          width: 100%;
          @include text();
        }
      }
    }
  }

  .portfolio-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px;
    justify-content: center;
    align-items: center;
    background: gray;
    z-index: 1000;
    height: 100%;
    width: 100%;
    display: none;
    background: rgba(0, 0, 0, 0.388);

    @include media(550px) {
      padding: 80px;
    }

    &[open="true"] {
      display: flex;
      opacity: 0;
      visibility: collapse;
      animation: open-dialog 0.3s forwards;

      @keyframes open-dialog {
        100% {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .dialog-content {
      display: inline-flex;
      max-height: 70%;
      width: 100%;
      max-width: 1000px;
      background: white;
      border-radius: 15px;
      overflow: hidden;

      @include media(550px) {
        flex-direction: column;
        align-items: center;
        max-height: 100%;
        max-width: auto;
        width: auto;
        padding-left: 6px;
      }

      .dialog-show {
        overflow-y: scroll;
        width: 60%;
        border-right: 0.5px solid var(--border-color);

        @include media(550px) {
          width: 100%;
          max-height: 450px;
          height: 100%;
          border: none;
        }

        /* padding-left: 10px; */

        .portfolio-image {
          object-fit: contain;
          width: 100%;
        }
      }

      .dialog-description {
        padding: 20px;
        width: 40%;
        overflow-y: scroll;

        @include media(550px) {
          width: 100%;
          height: 100%;
          border-top: 0.5px solid var(--border-color);
        }

        .description {
          line-height: 160%;
        }
      }
    }

    .exit-button {
      position: absolute;
      top: 3vh;
      height: 40px;
      right: 3vh;
      cursor: pointer;
      @include rm-default();

      @include media(550px) {
        height: 35px;
      }

      svg {
        fill: var(--text-color);
      }
    }
  }
}
</style>
