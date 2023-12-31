<template>
  <nav>
    <div class="container">
      <div class="nav-content">
        <!------------------------------------------ Left ------------------------------------------>

        <div class="nav-left">
          <router-link to="/" class="nav-logo">Constant</router-link>
          <!--  -->
          <ul class="nav-links">
            <li class="nav-link-li" v-for="link in navLinks" v-bind:key="link.id">
              <router-link :to="link.to" v-if="!link.options" class="nav-link">{{ link.name }}</router-link>
              <!--  -->
              <a-dropdown :trigger="['click']" v-if="link.options">
                <div :to="link.to" class="nav-link" :data-option="link.options && 'true'">
                  {{ link.name }}
                </div>

                <template #overlay>
                  <a-menu>
                    <a-menu-item v-for="option in link.options" :key="option.id">
                      <router-link :to="option.to">{{ option.name }}</router-link>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <!--  -->
            </li>
          </ul>
          <!--  -->
        </div>

        <!------------------------------------------ Right ------------------------------------------>

        <div class="nav-right">
          <button class="nav-search" @click="store.state.searchBox = !store.state.searchBox">
            <div v-html="icons.search" class="nav-icon"></div>
            <span>Поиск</span>
          </button>

          <router-link to="" class="nav-resume">Создать Резюме</router-link>

          <button class="nav-btn" v-for="navBtn in navIcons" v-bind:key="navBtn.id" @click="(e) => navBtn.onClick(e)">
            <div v-html="navBtn.icon" class="nav-icon"></div>
          </button>
        </div>

        <!--  -->
      </div>
    </div>
  </nav>
</template>

<!------------------------------------------------ SCRIPT ------------------------------------------------>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../index";
import { icons } from "@/shared/assets/icons";

export default defineComponent({
  name: "Navigation",
  setup() {
    const store = useStore();

    interface NavLink {
      id: number;
      name: string;
      to: string;
      options?: NavLink[];
    }

    interface NavIcons {
      id: number;
      name: string;
      icon: string;
      onClick(e?: MouseEvent): void;
    }

    const navLinks: NavLink[] = [
      { id: 1, name: "Мои резюме", to: "/resume" },
      { id: 2, name: "Отклики", to: "/" },
      {
        id: 3,
        name: "Помощь",
        to: "/",
        options: [
          { id: 1, name: "Вопросы и ответы", to: "/" },
          { id: 2, name: "Обратная связь", to: "/" },
        ],
      },
    ];

    const navIcons: NavIcons[] = [
      {
        id: 1,
        name: "Chats",
        icon: icons.chats,
        onClick: (): void => {
          console.log(4321);
        },
      },
      {
        id: 2,
        name: "Liked",
        icon: icons.like,
        onClick: (): void => {
          console.log(4321);
        },
      },
      {
        id: 3,
        name: "Chats",
        icon: icons.notification,
        onClick: (): void => {
          console.log(4321);
        },
      },
      {
        id: 4,
        name: "Chats",
        icon: icons.account,
        onClick: (): void => {
          console.log(4321);
        },
      },
    ];

    return {
      store,
      navLinks,
      navIcons,
      icons,
    };
  },
});
</script>

<!------------------------------------------------ STYLE ------------------------------------------------>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";

$resume-btn: #23a025;

nav {
  /* background: #222324; */
  background: #f6f8fa;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);

  * {
    font-size: 16px;
    text-decoration: none;
    color: rgb(55, 55, 55);
  }

  .nav-content {
    @include flex(space-between, center);

    .nav-left {
      @include flex(center, center, 30px);

      .nav-logo {
        font-size: 25px;
      }

      .nav-links {
        @include flex(center, center, 20px);

        .nav-link-li {
          .nav-link {
            cursor: pointer;
            padding: 7px 2px;

            &[data-option] {
              border-bottom: 1px dashed rgb(210, 210, 210);
            }

            &[aria-current="page"] {
              color: #77a9d5;
            }

            &:hover {
              color: #77a9d5;
              border-color: #77a9d5;
            }
          }
        }
      }
    }

    .nav-right {
      @include flex(center, center, 25px);

      .nav-btn {
        @include flex(center, center);
        @include rm-default();
        cursor: pointer;

        &:hover {
          .nav-icon {
            stroke: #77a9d5;
            fill: #77a9d5;
          }
        }
      }

      .nav-icon {
        height: 26px;
        stroke: var(--icon-color);
        fill: var(--icon-color);
      }

      .nav-search {
        @include rm-default();
        @include flex(center, center, 10px);
        cursor: pointer;

        .nav-icon {
          height: 20px;
        }

        &:hover {
          * {
            color: #77a9d5;
            stroke: #77a9d5;
            fill: #77a9d5;
          }
        }
      }

      .nav-resume {
        border: 1px solid $resume-btn;
        color: $resume-btn;
        line-height: 100%;
        padding: 10px;
        border-radius: 40px;
      }
    }
  }
}
</style>
