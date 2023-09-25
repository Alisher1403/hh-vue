<template>
    <div class="resume">
        <div class="container">
            <div class="resume-content">
                <div class="resume-top">
                    <h1 class="resume-top-title">Мои резюме</h1>
                    <button class="resume-top-button">Создать резюме</button>
                </div>
                <!--  -->
                <ActiveSeek />

                <ul class="resume-list">
                    <li>
                        <ResumeCard />
                    </li>
                    <li>
                        <ResumeCard />
                    </li>
                    <li>
                        <ResumeCard />
                    </li>
                </ul>
                <!--  -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ActiveSeek, ResumeCard } from "@/shared/UI";

export default defineComponent({
    name: 'ResumePage',
    components: {
        ActiveSeek,
        ResumeCard
    }
})
</script>

<style scoped lang="scss">
@import '@/app/assets/style.scss';

.resume {
    padding: 50px 0;

    .resume-content {
        .resume-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .resume-top-title {
                font-size: 30px;
            }

            .resume-top-button {
                padding: 12px;
                border-radius: 5px;
                border: 1px solid rgb(171, 171, 171);
                cursor: pointer;
            }
        }

        .resume-list {
            margin: 50px 0;
            display: flex;
            flex-direction: column;
            row-gap: 12px;
        }
    }
}
</style>