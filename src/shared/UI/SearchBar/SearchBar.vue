<template>
    <div class="searchbar" :data-search-visible="store.state.searchBox">
        <div class="searchbar-content">
            <!--  -->
            <form class="searchbar-input-wrapper" @submit.prevent>
                <!--  -->
                <fieldset ref="fieldset" :class="{ focus: inputFocus }">
                    <input type="text" class="searchbar-input" placeholder="Search for jobs" @focus="inputFocus = true"
                        @blur="inputFocus = false" v-model="input" ref="inputRef">

                    <button v-html="icons.x" class="searchbar-input-button"
                        @click.stop="() => { input = ''; inputRef?.focus() }" v-show="input.length > 0">
                    </button>

                </fieldset>
                <!--  -->
                <button class="searchbar-button">Найти</button>
            </form>
            <!--  -->
            <router-link to="/" class="searchbar-link">
                <div v-html="icons.slider"></div>
            </router-link>
            <!--  -->
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from "@/app/store/store";
import { defineComponent, ref } from "vue";
import { icons } from "@/shared/assets/icons";

export default defineComponent({
    name: 'SearchBar',
    setup() {
        const inputFocus = ref<boolean>(false);
        const input = ref<string>('')

        const store = useStore();
        const inputRef = ref<HTMLInputElement>();

        return {
            store,
            icons,
            input,
            inputRef,
            inputFocus,
        }
    }
})
</script>

<style scoped lang="scss">
@import '@/shared/assets/style.scss';

.searchbar {
    display: none;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    @include rm-default();

    &[data-search-visible='true'] {
        display: flex;
    }

    .searchbar-content {
        width: 100%;
        max-width: 800px;
        @include flex(center, center, 7px);

        fieldset,
        button,
        a {
            @include input-style(8px);
            @include flex(center, center);
            line-height: 100%;
            height: 40px;
        }

        .searchbar-input-wrapper {
            display: flex;
            column-gap: 7px;
            width: 100%;

            fieldset {
                width: 100%;
                border: 1px solid rgb(171, 171, 171);
                background: transparent;
                padding: 0;
                padding-right: 5px;
                @include flex(space-between, center);

                &.focus {
                    border: 1px solid #1785e5;

                    &:hover {
                        border-color: #1785e5;
                    }
                }

                &:hover {
                    border-color: gray;
                }

                .searchbar-input {
                    font-size: 14px;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    padding-left: 15px;

                    &::placeholder {
                        color: rgb(169, 169, 169);
                    }
                }

                .searchbar-input-button {
                    height: 28px;
                    @include rm-default();
                    cursor: pointer;
                }
            }

            .searchbar-button {
                background: #1785e5;
                cursor: pointer;
                color: white;
                padding: 5px 15px;
            }
        }

        .searchbar-link {
            width: 40px;

            * {
                fill: rgb(54, 54, 54);
                height: 15px;
            }
        }
    }
}
</style>@/shared/data/store