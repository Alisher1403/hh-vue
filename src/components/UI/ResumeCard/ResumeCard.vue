<template>
    <div class="resume-card">
        <div class="content">

            <h2 class="title">
                <router-link to="/resume-edit/25">{{ resume.title }}</router-link>
            </h2>

            <p class="updated">Обновлено
                <span>
                    {{ date.getDate() }}
                    {{ months.rus[date.getMonth()] }}
                    {{ date.getFullYear() }}
                    в
                    {{ date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    }) }}
                </span>
            </p>

            <div class="stats">
                <h5 class="stats-title">Статистика за неделю</h5>
                <div class="stats-content">
                    <p>
                        <strong>{{ resume.views.length }}&nbsp;</strong>
                        <router-link to="/">просмотра</router-link>
                    </p>
                    <span class="divider"></span>
                    <p>
                        <strong>{{ resume.invitation.length }}&nbsp;</strong>
                        <router-link to="/">приглашений</router-link>
                    </p>
                </div>
            </div>

            <div class="btns">
                <button class="custom-btn unrounded">Поднять в поиске</button>
                <button class="custom-btn unrounded" white>
                    <span>{{ store.state.recommendedVacancies.length }}</span>
                    вакансии
                </button>
            </div>

            <ul class="links">
                <li class="link"><router-link to="/">Поднять в поиске</router-link></li>
                <li class="link"><router-link to="/">Изменить видимость</router-link></li>
                <li class="link"><router-link to="/resume-editor">Редактировать</router-link></li>
                <li class="link"><router-link to="/">Дублировать</router-link></li>
            </ul>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { iResume, months } from "@/data/interfaces";
import { useStore } from "@/data/store";

export default defineComponent({
    name: 'ResumeCard',
    setup() {
        const store = useStore();

        const resume: iResume = {
            title: 'Frontend Developer',
            updated: Date.now().toString(),
            views: ['1', '2', '3'],
            invitation: ['1'],
        }

        const date = new Date(+resume.updated);

        return {
            resume,
            date,
            months,
            store,
        }
    }
})
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.resume-card {
    padding: 22px;
    /* border: 1px solid var(--line-color); */
    box-shadow: 0 0 15px rgb(226, 226, 226);
    border-radius: 8px;

    .content {
        .title {
            display: inline-block;
            margin-bottom: 12px;

            a {
                @include link-style();
                font-size: 20px;

                &:hover {
                    color: rgb(210, 0, 0);
                }
            }
        }

        .updated {
            font-size: 14px;
            margin-bottom: 18px;

            span {
                text-transform: lowercase;
            }
        }

        .stats {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 20px;

            .stats-title {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 14px;
            }

            .stats-content {
                display: flex;
                align-items: center;
                column-gap: 22px;

                p {
                    font-size: 16px;
                    line-height: 100%;

                    strong {
                        font-size: 18px;
                        font-weight: 600;
                    }

                    span {
                        color: var(--text-color);
                    }

                    a {
                        @include link-style();
                        text-decoration: none;
                    }
                }

                .divider {
                    height: 24px;
                    width: 0.5px;
                    background: var(--line-color);
                }
            }
        }

        .btns {
            display: flex;
            column-gap: 8px;
            margin-bottom: 20px;
        }

        .links {
            display: flex;
            column-gap: 20px;

            .link {
                a {
                    @include link-style();
                }
            }
        }
    }
}
</style>