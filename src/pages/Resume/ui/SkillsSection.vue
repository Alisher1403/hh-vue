<template>
  <div class="resume-sector-5 sector">
    <div class="content">
      <h2 class="title">Ключевые навыки</h2>

      <ul class="user-skills" v-if="!editing" v-memo="[skills]">
        <li class="skill" v-for="skill in resume.skills" :key="skill">
          <div class="skill-icon" v-html="skillsIcons[skill.toLocaleLowerCase()]?.icon"></div>
          <p class="skill-name text-block">
            {{ skillsIcons[skill.toLocaleLowerCase()] ? skillsIcons[skill.toLocaleLowerCase()].name : skill }}
          </p>
        </li>
      </ul>

      <!-- EDITING -->
      <a-select v-if="editing" class="skills-select" style="width: 100%" mode="tags" v-model:value="skills" autofocus v-memo="[skills]">
        <a-select-option
          class="user-portfolio-scoped-style"
          v-for="(_, el) in skillsIcons"
          :key="el"
          :value="el.toLocaleLowerCase()"
          :getPopupContainer="antParentNode"
        >
          <div class="skill-icon" v-html="skillsIcons[el.toLocaleLowerCase()]?.icon"></div>
          <p class="skill-name text-block">{{ skillsIcons[el.toLocaleLowerCase()]?.name }}</p>
        </a-select-option>
      </a-select>
    </div>

    <button class="resume-editor-link" @click="editing = true" v-if="!editing">Редактировать</button>

    <EditorButtons
      v-if="editing"
      justify-end
      @save="
        () => {
          resume['skills'] = skills;
          editing = false;
        }
      "
      @cancel="
        () => {
          skills = resume['skills'].map((el) => el.toLocaleLowerCase());
          editing = false;
        }
      "
    />
  </div>
</template>

<script lang="ts">
import { useStore } from "../../index";
import { skillsIcons } from "@/shared/assets/icons";
import { EditorButtons } from "@/shared/UI";
import { defineComponent, ref } from "vue";
import { antParentNode } from "@/shared/constants";

export default defineComponent({
  components: { EditorButtons },
  setup() {
    const store = useStore();
    const resume = store.state.resume;

    const editing = ref<boolean>(false);

    const skills = ref<string[]>(resume.skills);

    return { resume, editing, skills, skillsIcons, antParentNode };
  },
});
</script>

<style lang="scss">
@import "@/shared/assets/style.scss";
@import "../style.scss";

.resume-sector-5 {
  padding: 20px auto;

  $skills-gap: 8px;
  $skills-list-padding: 7px 0;
  $skills-icon-size: 40px;

  .content {
    @mixin skill-block {
      @include list-block-style();
      display: flex;
      align-items: center;
      padding: 0;
      column-gap: 2px;
      border-radius: 40px;
      padding: 0px 10px;
      overflow: hidden;
      height: $skills-height;

      .skill-name {
        line-height: 100%;
        margin-bottom: 0;
      }

      .skill-icon {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: -2px;

        svg {
          height: 70%;
          aspect-ratio: 1/1;
          object-fit: contain;
          display: flex;
          justify-content: center;
        }
      }
    }

    .skill-icon {
      height: $skills-icon-size;
    }

    .user-skills {
      display: flex;
      flex-wrap: wrap;
      gap: $skills-gap;
      padding: $skills-list-padding;
      border: 0.5px solid transparent;
      border-right: none;
      border-left: none;
      margin: 0;

      .skill {
        @include skill-block();
      }
    }

    .skills-select {
      .ant-select-selector {
        padding: $skills-list-padding;
        border-radius: 0 !important;
        border-right: none;
        border-left: none;
        box-shadow: none;
        box-sizing: content-box;
      }

      .ant-select-selection-overflow {
        display: flex;
        gap: $skills-gap;

        * {
          margin: 0;
          padding: 0;
        }
      }

      .ant-select-selection-item {
        height: auto;
        background: transparent;
        border: none;
        padding: 0;

        .ant-select-selection-item-content {
          @include skill-block();
        }

        .ant-select-selection-item-remove {
          position: absolute;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          background: rgb(240, 75, 75);
          border-radius: 50%;
          height: 12px;
          aspect-ratio: 1/1;
          animation: x-appear 0.2s forwards;
          opacity: 0;

          @keyframes x-appear {
            100% {
              opacity: 1;
            }
          }

          span {
            height: 60%;
            aspect-ratio: 1/1;

            svg {
              height: 100%;
              width: 100%;
              fill: white;
            }
          }
        }

        .anticon-close {
          vertical-align: 0;
          line-height: 0;
        }
      }
    }
  }
}
</style>
