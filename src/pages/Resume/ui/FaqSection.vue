<template>
  <div class="resume-sector-1 sector">
    <div class="left">
      <h1 class="user-name title">{{ resume.userName }}</h1>

      <div class="user-date" v-if="!editing">
        <span v-if="resume.gender"> {{ resume.gender == "M" ? "Мужчина, " : resume.gender == "F" ? "Женщина, " : null }}</span>
        <span>{{ calculatedDob }} лет</span>,
        <span>родился {{ dob.d }} {{ months["rus"][dob.m] }} {{ dob.y }}</span>
      </div>

      <!-- EDITING -->
      <div class="edit user-faq-edit" v-if="editing">
        <a-select
          :options="[
            {
              value: null,
              label: '...',
            },
            {
              value: 'M',
              label: 'Мужчина',
            },
            {
              value: 'F',
              label: 'Женщина',
            },
          ]"
          v-model:value="gender"
          style="width: 120px"
        >
        </a-select>

        <a-input-number v-model:value="dob.d" />
        <a-select v-model:value="dob.m">
          <a-select-option v-for="(month, index) in months['rus']" :key="index" :value="index">
            {{ month }}
          </a-select-option>
        </a-select>
        <a-input-number v-model:value="dob.y" />
      </div>

      <!-- EDITING -->
      <button class="resume-editor-link" v-if="!editing" @click="editing = true">Редактировать</button>

      <EditorButtons
        v-if="editing"
        @save="saveData()"
        @cancel="
          () => {
            editing = false;
          }
        "
      />
    </div>

    <div class="right">
      <router-link to="" class="resume-editor-link">
        <div v-html="icons.user"></div>
        <img :src="resume.img" class="user-image" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/app/store/store";
import { icons } from "@/shared/assets/icons";
import { months } from "@/app/store/interfaces";
import { EditorButtons } from "@/shared/UI";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {
    EditorButtons,
  },
  setup() {
    const store = useStore();

    const editing = ref<boolean>(false);
    const resume = store.state.resume;
    const calculatedDob = ref<number>();

    const date = new Date(resume.dob);
    const gender = ref<"M" | "F" | null>(resume.gender);
    const dob = ref<{ d: number; m: number; y: number }>({
      d: date.getDate(),
      m: date.getMonth(),
      y: date.getFullYear(),
    });

    function getAge(): void {
      const d = new Date();
      const birthDay = new Date(resume.dob);
      calculatedDob.value =
        d.getFullYear() -
        birthDay.getFullYear() -
        +(d.getMonth() < birthDay.getMonth() || (d.getMonth() === birthDay.getMonth() && d.getDate() < birthDay.getDate()));
    }

    function saveData() {
      resume.gender = gender.value;
      resume.dob = new Date(dob.value.y, dob.value.m, dob.value.d).getTime();
      editing.value = false;
      getAge();
    }

    onMounted(() => {
      getAge();
    });

    return { icons, months, resume, dob, gender, editing, calculatedDob, saveData };
  },
});

// import { iUserResume, months } from "@/app/store/interfaces";
// import type { PropType } from "vue";
// const props = defineProps({
//   data: {
//     type: Object as PropType<iUserResume>,
//     required: true,
//   },
// });
</script>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";

.resume-sector-1 {
  @include flex(space-between, center);
  padding-right: 30px;
  padding-top: 10px;

  .left {
    .user-name {
      font-size: 35px;
      margin-bottom: 10px;
    }

    .user-date {
      @include text();
      margin-bottom: 5px;
    }
  }

  .right {
    display: flex;
    flex-direction: column;

    .resume-editor-link {
      border-radius: 50%;
      border: 0.5px solid var(--border-color);
      overflow: hidden;

      .user-image {
        height: 140px;
        aspect-ratio: 1/1;
        object-fit: cover;
      }
    }
  }

  .user-faq-edit {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
