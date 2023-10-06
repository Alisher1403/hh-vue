<template>
    <div class="resume-sector-1 sector">
        <div class="left">
            <h1 class="user-name title">{{ resume.userName }}</h1>

            <div class="user-date" v-if="!editing">
                <span v-if="resume.gender">
                    {{ resume.gender == 'M' ? 'Мужчина, ' :
                        resume.gender == 'F' ? 'Женщина, ' : null }}</span>
                <span>{{ calculatedDob }}
                    лет</span>,
            </div>

            <!-- EDITING -->
            <div class="edit user-faq-edit" v-if="editing">
                <a-select :options="[
                    {
                        value: null,
                        label: '...'
                    },
                    {
                        value: 'M',
                        label: 'Мужчина'
                    },
                    {
                        value: 'F',
                        label: 'Женщина'
                    },
                ]" v-model:value="resumeData.gender.value" style="width: 120px;">
                </a-select>

                <a-input-number v-model:value="resumeData.dob.value.d" />
                <a-select v-model:value="resumeData.dob.value.m">
                    <a-select-option v-for="(month, index) in months['rus']" :key="index" :value="index">
                        {{ month }}
                    </a-select-option>
                </a-select>
                <a-input-number v-model:value="resumeData.dob.value.y" />
            </div>

            <!-- EDITING -->
            <button class="resume-editor-link" v-if="!editing" @click="editing = true">Редактировать</button>

            <EditorButtons v-if="editing" @save="resumeData.setFaq()" @cancel="() => { editing = false }" />
        </div>

        <div class="right">
            <router-link to="" class="resume-editor-link">
                <div v-html="icons.user"></div>
                <img :src="resume.img" class="user-image" alt="">
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { icons } from "@/shared/assets/icons";
import { iUserResume, months } from "@/app/store/interfaces";
import { EditorButtons } from "@/shared/UI";
import { onMounted, ref, watch } from "vue";
import type { PropType } from 'vue'

const props = defineProps({
    data: {
        type: Object as PropType<iUserResume>,
        required: true,
    },
    setter: {
        type: Object,
        required: true,
    }
})

const editing = ref<boolean>(false);
const resume = props.data;
const calculatedDob = ref<number>();
const resumeData = props.setter;

function getAge(): void {
    const d = new Date();
    const birthDay = new Date(resume.dob);
    calculatedDob.value = d.getFullYear() - birthDay.getFullYear() - +(d.getMonth() < birthDay.getMonth() || (d.getMonth() === birthDay.getMonth() && d.getDate() < birthDay.getDate()))
}
watch(editing, () => {
    console.log(editing.value);
})

onMounted(() => {
    console.log(432);
    getAge();
})

</script>

<style scoped lang="scss">
@import '@/shared/assets/style.scss';

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