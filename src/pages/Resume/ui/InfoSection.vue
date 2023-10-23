<template>
  <div class="resume-sector-1 sector">
    <div class="left">
      <div v-if="!editing">
        <h1 class="user-name title">{{ resume.userName }}</h1>

        <div class="user-date">
          <span v-if="resume.gender"> {{ resume.gender == "M" ? "Мужчина, " : resume.gender == "F" ? "Женщина, " : null }}</span>
          <span>{{ calculatedDob }} лет</span>,
          <span>родился {{ dob.d }} {{ months["rus"][dob.m] }} {{ dob.y }}</span>
        </div>
      </div>

      <!-- EDITING -->
      <div class="edit user-faq-edit" v-if="editing">
        <a-input v-model:value="userName" />

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

      <EditorButtons v-if="editing" @save="saveData()" @cancel="cancelData()" />
    </div>

    <div class="right">
      <router-link to="" class="resume-editor-link">
        <div class="user-image-wrapper">
          <div v-html="icons.account" class="user-no-image" v-if="image == ''"></div>
          <img :src="image" class="user-image" alt="" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "../../index";
import { icons } from "@/shared/assets/icons";
import { interfaces } from "../../index";
import { EditorButtons } from "@/shared/UI";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {
    EditorButtons,
  },
  setup() {
    const store = useStore();
    const { months } = interfaces;

    const editing = ref<boolean>(false);
    const resume = store.state.resume!;

    if (!resume) return;

    const calculatedDob = ref<number>();

    const userName = ref<string>(resume.userName);
    const image = ref<string>(resume.img);
    const gender = ref<"M" | "F" | null>(resume.gender);
    const date = ref(new Date(resume.dob));
    const dob = ref<{ d: number; m: number; y: number }>({
      d: date.value.getDate(),
      m: date.value.getMonth(),
      y: date.value.getFullYear(),
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
      resume.userName = userName.value;
      resume.gender = gender.value;
      resume.dob = new Date(dob.value.y, dob.value.m, dob.value.d).getTime();
      editing.value = false;
      getAge();
    }

    function cancelData() {
      userName.value = resume.userName;
      gender.value = resume.gender;
      dob.value = {
        d: date.value.getDate(),
        m: date.value.getMonth(),
        y: date.value.getFullYear(),
      };
      editing.value = false;
    }

    onMounted(() => {
      getAge();
    });

    return { icons, months, resume, userName, image, dob, gender, editing, calculatedDob, saveData, cancelData };
  },
});
</script>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";

.resume-sector-1 {
  @include flex(space-between, center);
  padding-right: 30px;
  padding-top: 10px;

  .left {
    .user-name {
      font-size: calc(var(--title-size) + 5px);
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

      .user-image-wrapper {
        height: 140px;
        width: 140px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1/1;

        .user-no-image {
          height: 100%;
          width: 100%;
          fill: rgb(84, 84, 84);
          z-index: -1;
          position: absolute;
        }

        .user-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
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
