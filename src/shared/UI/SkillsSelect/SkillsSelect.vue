<template>
  <div class="skills-select-wrapper">
    <div v-if="!condition">
      <ul class="user-skills">
        <li class="skill" v-for="skill in list" :key="skill">
          <div class="skill-icon" v-html="skillsIcons[skill]?.icon"></div>
          <p class="skill-name text-block">
            {{ skillsIcons[skill] ? skillsIcons[skill].name : skill }}
          </p>
        </li>
      </ul>
    </div>
    <a-select
      class="skills-select"
      style="width: 100%"
      mode="tags"
      v-model:value="data"
      autofocus
      v-if="condition"
      :getPopupContainer="antParentNode"
    >
      <a-select-option class="user-portfolio-scoped-style" v-for="(value, key) in skillsIcons" :key="key" :value="el">
        <div class="skill-icon" v-html="value?.icon"></div>
        <p class="skill-name text-block">{{ value?.name }}</p>
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
import { skillsIcons } from "@/shared/assets/icons";
import { antParentNode } from "@/shared/constants";
import { computed, defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  props: {
    value: {
      type: Array as PropType<string[]>,
      required: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const data = ref<string[]>(props.value);

    watch(data, () => {
      emit("setter", data.value);
    });

    const list = computed((): string[] => props.value);
    const condition = computed(() => props.open);

    return { list, open, condition, data, skillsIcons, antParentNode };
  },
});
</script>

<style lang="scss">
@import "@/shared/assets/style.scss";

.skills-select-wrapper {
  $skills-gap: 8px;
  $skills-list-padding: 7px 0;
  $skills-icon-size: 30px;
  $skills-height: 40px;

  @mixin skill-block {
    padding: 10px;
    @include text();
    border: 1px solid var(--border-color);
    line-height: 100%;
    cursor: default;
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
      margin: 0 !important;
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

  .ant-select-item-option {
    display: flex;
    align-items: center;

    .ant-select-item-option-content {
      display: flex;
      align-items: center;
      column-gap: 7px;

      .skill-icon {
        height: $skills-icon-size;
        aspect-ratio: 1/1 !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .skill-name {
        line-height: 100%;
        margin-bottom: 0 !important;
      }
    }
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
      border: none;
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      border-radius: 0 !important;

      .ant-select-selection-overflow {
        display: flex;
        gap: $skills-gap;

        * {
          margin: 0;
          padding: 0;
        }

        .ant-select-selection-overflow-item {
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
  }
}
</style>
