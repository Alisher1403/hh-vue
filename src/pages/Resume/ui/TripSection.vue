<template>
  <div class="resume-sector-3 sector">
    <div class="content" v-if="!editing">
      <p>{{ resume.city }},&nbsp;</p>
      <p>{{ getOptionsValue.move[resume.move] }},&nbsp;</p>
      <p>{{ getOptionsValue.bTrip[resume.bTrip] }}</p>
    </div>
    <!-- EDITING -->
    <div v-if="editing">
      <div class="">
        <p class="input-title">Город</p>
        <a-input v-model:value="city" style="max-width: 250px" />
      </div>
      <div class="margin-top">
        <p class="input-title">Переезд</p>
        <a-select style="width: 150px" v-model:value="move">
          <a-select-option v-for="(option, key) in ResumeOptions.move" :key="option" :value="key">{{ option }}</a-select-option>
        </a-select>
      </div>
      <div class="margin-top">
        <p class="input-title">Готовность к командировкам</p>
        <a-select style="width: 150px" v-model:value="bTrip">
          <a-select-option v-for="(option, key) in ResumeOptions.bTrip" :key="option" :value="key">{{ option }}</a-select-option>
        </a-select>
      </div>
    </div>
    <button class="resume-editor-link" @click="editing = true" v-if="!editing">Редактировать</button>
    <EditorButtons v-if="editing" @save="saveData()" @cancel="cancelData()" />
  </div>
</template>

<script lang="ts">
import { interfaces } from "../../index";
import { useStore } from "../../index";
import { EditorButtons } from "@/shared/UI";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    EditorButtons,
  },
  setup() {
    const store = useStore();
    const { ResumeOptions, getOptionsValue } = interfaces;
    const resume = store.state.resume;
    const editing = ref<boolean>(false);

    const move = ref<string>(resume.move);
    const bTrip = ref<string>(resume.bTrip);
    const city = ref<string | null>(resume.city);

    function saveData() {
      editing.value = false;
      resume.move = move.value;
      resume.bTrip = bTrip.value;
      resume.city = city.value;
    }

    function cancelData() {
      editing.value = false;
      move.value = resume.move;
      bTrip.value = resume.bTrip;
      city.value = resume.city;
    }

    return {
      resume,
      editing,
      saveData,
      cancelData,
      ResumeOptions,
      getOptionsValue,
      move,
      bTrip,
      city,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";

.resume-sector-3 {
  .content {
    display: flex;
    @include text();
  }
}
</style>
