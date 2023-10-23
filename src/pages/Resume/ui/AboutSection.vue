<template>
  <div class="resume-sector-6 sector">
    <div class="content">
      <div class="title">Обо мне</div>
      <div class="user-aboutMe" v-html="resume.aboutMe" v-if="!editing"></div>
    </div>

    <div v-if="editing">
      <ckeditor :editor="ClassicEditor" v-model="aboutMe" v-memo="[aboutMe]"></ckeditor>
    </div>

    <!-- EDITING -->
    <button class="resume-editor-link" v-if="!editing" @click="editing = true">Редактировать</button>

    <EditorButtons v-if="editing" justify-end @save="saveData()" @cancel="cancelData()" />
  </div>
</template>

<script lang="ts">
import { EditorButtons } from "@/shared/UI";
import { useStore } from "@/widgets";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    EditorButtons,
  },
  setup() {
    const store = useStore();
    const resume = store.state.resume!;

    if (!resume) return;

    const editing = ref<boolean>(false);

    const aboutMe = ref<string>(resume.aboutMe);

    function saveData() {
      editing.value = false;
      resume.aboutMe = aboutMe.value;
    }

    function cancelData() {
      aboutMe.value = resume.aboutMe;
      editing.value = false;
    }

    return { resume, editing, aboutMe, ClassicEditor, saveData, cancelData };
  },
});
</script>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";
@import "../style.scss";

.resume-sector-6 {
  padding: 20px auto;

  .user-aboutMe {
    @include text();
  }
}
</style>
