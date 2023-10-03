<template>
    <div class="props.data-sector-1 sector">
        <div class="left">
            <h1 class="user-name title">{{ data.userName }}</h1>

            <div class="user-date" v-if="!editing">
                <span v-if="data.gender">
                    {{ data.gender == 'M' ? 'Мужчина, ' :
                        data.gender == 'F' ? 'Женщина, ' : null }}</span>
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
            <button class="data-editor-link" v-if="!editing" @click="editing = true">Редактировать</button>

            <EditorButtons v-if="editing" @save="resumeData.setFaq()" @cancel="() => { resumeData.cancel('faq') }" />
        </div>

        <div class="right">
            <router-link to="" class="data-editor-link">
                <div v-html="icons.user"></div>
                <img :src="data.img" class="user-image" alt="">
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { iUserResume } from "@/app/store/interfaces";
import { ref } from "vue";
import type { PropType } from 'vue'

const props = defineProps({
    data: {
        type: Object as PropType<iUserResume>,
        required: true,
    }
})

const editing = ref<boolean>(false);
const data = props.data;

</script>

<style></style>