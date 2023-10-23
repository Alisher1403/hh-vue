<template>
  <div class="resume">
    <div class="container">
      <div class="resume-content">
        <div class="resume-top">
          <h1 class="resume-top-title">Мои резюме</h1>
          <button class="resume-top-button">Создать резюме</button>
        </div>
        <!--  -->
        <ActiveSeek />

        <ul class="resume-list" v-if="resumeList">
          <li v-for="resume in resumeList" :key="resume.id">
            <ResumeCard :data="resume" />
          </li>
        </ul>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { ActiveSeek, ResumeCard, useStore } from "@/shared/UI";

export default defineComponent({
  name: "ResumePage",
  components: {
    ActiveSeek,
    ResumeCard,
  },
  setup() {
    const store = useStore();
    const resumeList = computed(() => store.state.resumeList);

    onMounted(() => {
      store.dispatch("getResumeList");
    });

    return { resumeList, store };
  },
});
</script>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";

.resume {
  padding: 50px 0;

  .resume-content {
    .resume-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .resume-top-title {
        font-size: 30px;
      }

      .resume-top-button {
        padding: 12px;
        border-radius: 5px;
        border: 1px solid rgb(171, 171, 171);
        cursor: pointer;
      }
    }

    .resume-list {
      margin: 50px 0;
      display: flex;
      flex-direction: column;
      row-gap: 12px;
    }
  }
}
</style>
