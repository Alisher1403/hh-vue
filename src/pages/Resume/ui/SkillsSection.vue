<template>
  <div class="resume-sector-5 sector">
    <div class="content">
      <h2 class="title">Ключевые навыки</h2>

      <SkillsSelect :value="resume.skills" @setter="(e) => (skills = e)" :open="editing" v-memo="[skills, editing]" />
    </div>

    <button class="resume-editor-link" @click="editing = true" v-if="!editing">Редактировать</button>

    <EditorButtons v-if="editing" justify-end @save="saveData()" @cancel="cancelData()" />
  </div>
</template>

<script lang="ts">
import { useStore } from "../../index";
import { skillsIcons } from "@/shared/assets/icons";
import { EditorButtons, SkillsSelect } from "@/shared/UI";
import { defineComponent, ref } from "vue";
import { antParentNode } from "@/shared/constants";

export default defineComponent({
  components: { EditorButtons, SkillsSelect },
  setup() {
    const store = useStore();
    const resume = store.state.resume;

    const editing = ref<boolean>(false);

    const skills = ref<string[]>(resume.skills);

    function saveData() {
      resume.skills = skills.value;
      editing.value = false;
    }

    function cancelData() {
      skills.value = resume.skills;
      editing.value = false;
    }

    return { resume, editing, skills, skillsIcons, antParentNode, saveData, cancelData };
  },
});
</script>

<style lang="scss">
@import "@/shared/assets/style.scss";
@import "../style.scss";

.resume-sector-5 {
  padding: 20px auto;
}
</style>
