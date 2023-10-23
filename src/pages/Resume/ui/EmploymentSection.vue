<template>
  <div class="resume-sector-4 sector">
    <div class="content" v-if="!editing">
      <div class="user-position title">
        <h2>{{ resume.position }}</h2>
      </div>
      <p class="user-salary">
        Зарплата: <span>{{ resume.salary }}{{ getOptionsValue.currencies[resume.currency] }}</span>
      </p>
      <div class="user-specialization">
        <p class="title">Специализации:</p>
        <ul class="spec-list">
          <li class="spec-li" v-for="spec in resume.specialization" :key="spec">{{ spec }}</li>
        </ul>
      </div>

      <p class="user-employment">Занятость: {{ ResumeOptions.employment[resume.employment] }}</p>
      <p class="user-schedule">График работы: {{ ResumeOptions.schedule[resume.schedule] }}</p>
    </div>

    <!-- Editing -->

    <div class="editing" v-if="editing">
      <!--  -->
      <div>
        <p class="input-title">Должность</p>
        <a-input style="width: 100%; max-width: 500px" v-model:value="position" />
      </div>
      <!--  -->
      <div class="margin-top">
        <p class="input-title">Зарплата</p>
        <div class="input-group">
          <a-input style="width: 150px" v-model:value="salary" />
          <a-select style="width: 100px" v-model:value="currency">
            <a-select-option v-for="(option, key) in getOptionsValue.currencies" :key="option" :value="key">{{ key }}</a-select-option>
          </a-select>
        </div>
      </div>
      <!--  -->
      <div class="margin-top">
        <p class="input-title">Специализации</p>
        <a-select style="width: 100%; max-width: 500px" v-model:value="specialization" mode="tags"></a-select>
      </div>
      <!--  -->
      <div class="margin-top">
        <p class="input-title">Занятость</p>
        <a-select style="width: 250px" v-model:value="employment">
          <a-select-option v-for="(option, key) in ResumeOptions.employment" :key="key" :value="key">{{ option }}</a-select-option>
        </a-select>
      </div>
      <!--  -->
      <!--  -->
      <div class="margin-top">
        <p class="input-title">График работы</p>
        <a-select style="width: 250px" v-model:value="schedule">
          <a-select-option v-for="(option, key) in ResumeOptions.schedule" :key="key" :value="key">{{ option }}</a-select-option>
        </a-select>
      </div>
      <!--  -->
    </div>

    <router-link to="" class="resume-editor-link" v-if="!editing" @click="editing = true">Редактировать</router-link>
    <EditorButtons v-if="editing" @save="saveData()" @cancel="cancelData()" />
  </div>
</template>

<script lang="ts">
import { interfaces } from "../../index";
import { useStore } from "../../index";
import EditorButtons from "@/shared/UI/EditorButtons/EditorButtons.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { EditorButtons },
  setup() {
    const store = useStore();
    const { getOptionsValue, ResumeOptions } = interfaces;
    const resume = store.state.resume!;

    if (!resume) return;

    const editing = ref<boolean>(false);

    const position = ref<string>(resume.position);
    const salary = ref<number | null>(resume.salary);
    const currency = ref<string>(resume.currency);
    const specialization = ref<string[]>(resume.specialization);
    const employment = ref<string>(resume.employment);
    const schedule = ref<string>(resume.schedule);

    function saveData() {
      resume.position = position.value;
      resume.salary = salary.value;
      resume.currency = currency.value;
      resume.specialization = specialization.value;
      resume.employment = employment.value;
      resume.schedule = schedule.value;
      editing.value = false;
    }
    function cancelData() {
      position.value = resume.position;
      salary.value = resume.salary;
      currency.value = resume.currency;
      specialization.value = resume.specialization;
      employment.value = resume.employment;
      schedule.value = resume.schedule;
      editing.value = false;
    }

    return {
      resume,
      editing,
      position,
      salary,
      currency,
      specialization,
      employment,
      schedule,
      ResumeOptions,
      getOptionsValue,
      saveData,
      cancelData,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";

.resume-sector-4 {
  margin: 20px 0;

  .content {
    .user-position {
      font-size: 18px;
    }

    .user-salary {
      @include text();
      font-size: calc(var(--paragraph-size) + 5px);
      margin-bottom: 10px;

      span {
        @include text();
        font-size: calc(var(--paragraph-size) + 6px);
        font-family: var(--font-semiBold);
      }
    }

    .user-specialization {
      .title {
        @include text();
        margin-bottom: 5px;
      }

      .spec-list {
        margin-bottom: 15px;

        .spec-li {
          padding: 5px 0;
          padding-left: 25px;
          position: relative;
          @include text();

          &::before {
            content: "";
            position: absolute;
            left: 7px;
            width: 13px;
            display: block;
            height: 0.5px;
            background: var(--text-color);
            top: 50%;
            transform: translate(0, -50%);
          }
        }
      }
    }

    .user-employment {
      @include text();
      margin-bottom: 10px;
    }

    .user-schedule {
      @include text();
      margin-bottom: 10px;
    }
  }
}
</style>
