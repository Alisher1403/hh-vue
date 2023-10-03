<template>
    <div class="resume-editor">
        <div class="container">
            <div class="resume-wrapper">
                <!-- ================ RESUME CONTENT ================= -->
                <div class="resume-content">

                    <!------------------ SECTOR 1 ------------------->
                    <Faq :data="resume"/>

                    <!------------------ SECTOR 2 ------------------->
                    <div class="resume-sector-2 sector" v-if="resume.contact">
                        <div class="content">
                            <h4 class="title">Контакты</h4>
                            <ul>
                                <li v-for="(contact, index) in contactEdit.list.array" :key="index">
                                    <div class="content">
                                        <div class="contact">
                                            <span class="contact-name">{{ contact.name }}</span>:
                                            <a class="contact-link" :href="contact.type + contact.value"
                                                :target="contact.type !== 'tel:' ? '_blank' : ''">{{ contact.value }}</a>
                                            <span class="text-block" v-if="contact.preferred"> — предпочитаемый способ
                                                связи</span>
                                        </div>
                                        <div class="todo-editor" v-if="contactChange">
                                            <button v-html="icons.trash" class="editor-button"
                                                @click="contactEdit.list.delete('id', contact.id)"></button>
                                            <button v-html="icons.edit" class="editor-button"
                                                @click="contactEdit.setOne(contact)"></button>
                                            <button v-html="icons.chevronUp" class="editor-button"></button>
                                            <button v-html="icons.chevronDown" class="editor-button"></button>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="contactChange">
                                    <button class="custom-btn" size="small">
                                        <p text>Добавить еще</p>
                                        <div v-html="icons.plus" icon></div>
                                    </button>
                                </li>
                            </ul>
                            <!--  -->
                            <Modal :open="contactEdit.modal.value" @onClose="contactEdit.modal.value = false"
                                :title="'Контакт'">
                                <div class="modal-content">
                                    <a-row :gutter="10">
                                        <a-col flex="100px">
                                            <h4 class="input-subtitle input-subtitle-margin">Название</h4>
                                            <a-input v-model:value="contactEdit.data.name" placeholder="Название"></a-input>
                                        </a-col>
                                        <a-col flex="auto">
                                            <h4 class="input-subtitle input-subtitle-margin">Ссылка на сайт</h4>
                                            <a-input v-model:value="contactEdit.data.value" placeholder="Ссылка"></a-input>
                                        </a-col>
                                    </a-row>

                                    <div>
                                        <h4 class="input-subtitle input-subtitle-margin">Тип связи</h4>
                                        <a-select :options="[
                                            {
                                                value: 'tel:',
                                                label: 'Номер Телефона',
                                            },
                                            {
                                                value: 'mailto:',
                                                label: 'Email',
                                            },
                                            {
                                                value: '',
                                                label: 'Другое',
                                            }
                                        ]" style="width: 100%;" v-model:value="contactEdit.data.type"></a-select>
                                    </div>

                                    <a-row :gutter="10" :align="'middle'">
                                        <a-col>
                                            <h4 class="input-subtitle">Предпочтительный вид связи</h4>
                                        </a-col>
                                        <a-col>
                                            <a-switch v-model:checked="contactEdit.data.preferred"></a-switch>
                                        </a-col>
                                    </a-row>

                                    <a-row justify="end" :gutter="5">
                                        <a-col>
                                            <button class="custom-btn btn-unrounded" style="width: 90px;"
                                                @click="contactEdit.data = contactEdit.initialData">Save</button>
                                        </a-col>
                                        <a-col>
                                            <button class="custom-btn btn-unrounded" white
                                                style="width: 90px;">Cancel</button>
                                        </a-col>
                                    </a-row>
                                </div>
                            </Modal>
                            <!--  -->
                        </div>
                        <!-- EDITING -->
                        <button class="resume-editor-link" @click="contactChange = true"
                            v-if="!contactChange">Редактировать</button>
                        <EditorButtons v-if="contactChange" @save="resumeData.setContact()"
                            @cancel="() => { resumeData.cancel('contact') }" />
                    </div>

                    <!------------------ SECTOR 3 ------------------->
                    <div class="resume-sector-3 sector">
                        <div class="content">
                            <p>{{ resume.move ? 'готов к переезду' : 'не готов к переезду' }},&nbsp;</p>
                            <p>{{ resume.bTrip ? 'готов к командировкам' : 'не готов к командировкам' }}</p>
                        </div>
                        <!-- EDITING -->
                        <button class="resume-editor-link" @click="tripChange = true"
                            v-if="!tripChange">Редактировать</button>
                        <EditorButtons v-if="tripChange" @save="resumeData.setContact()"
                            @cancel="() => { resumeData.cancel('contact') }" />
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 4 ------------------->
                    <div class="resume-sector-4 sector">
                        <div class="content">

                            <div class="user-position title">
                                <h2>{{ resume.position }}</h2>
                            </div>

                            <p class="user-salary">Зарплата: <span>{{ resume.salary }}{{ resume.currency }}</span></p>

                            <div class="user-specialization">
                                <p class="title">Специализации: </p>
                                <ul class="spec-list">
                                    <li class="spec-li" v-for="spec in resume.specialization" :key="spec">{{ spec }}</li>
                                </ul>
                            </div>

                            <p class="user-employment">Занятость: {{ ResumeOptions.employment[resume.employment] }}</p>
                            <p class="user-schedule">График работы: {{ ResumeOptions.schedule[resume.schedule] }}</p>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 5 ------------------->
                    <div class="resume-sector-5 sector">
                        <div class="content">
                            <h2 class="title">Ключевые навыки</h2>

                            <ul class="user-skills" v-if="!skillsChange" v-memo="[resumeData.skills.value]">
                                <li class="skill" v-for="skill in resume.skills" :key="skill">
                                    <div class="skill-icon" v-html="skillsIcons[skill.toLocaleLowerCase()]?.icon"></div>
                                    <p class="skill-name text-block">{{ skillsIcons[skill.toLocaleLowerCase()] ?
                                        skillsIcons[skill.toLocaleLowerCase()].name : skill }}
                                    </p>
                                </li>
                            </ul>

                            <!-- EDITING -->
                            <a-select v-if="skillsChange" class="skills-select" style="width: 100%;" mode="tags"
                                v-model:value="resumeData.skills.value" autofocus v-memo="[resumeData.skills.value]">
                                <a-select-option class="user-portfolio-scoped-style" v-for="el in Object.keys(skillsIcons)"
                                    :key="el" :value="el.toLocaleLowerCase()" :getPopupContainer="antParentNode">
                                    <div class="skill-icon" v-html="skillsIcons[el.toLocaleLowerCase()]?.icon"></div>
                                    <p class="skill-name text-block">{{ skillsIcons[el.toLocaleLowerCase()]?.name }}</p>
                                </a-select-option>
                            </a-select>
                        </div>

                        <button class="resume-editor-link" @click="skillsChange = true"
                            v-if="!skillsChange">Редактировать</button>

                        <EditorButtons v-if="skillsChange" justify-end
                            @save="() => { resume['skills'] = resumeData.skills.value; skillsChange = false }"
                            @cancel="() => { resumeData.skills.value = resume['skills'].map(el => el.toLocaleLowerCase()); skillsChange = false }" />
                    </div>

                    <!------------------ SECTOR 6 ------------------->
                    <div class="resume-sector-6 sector">
                        <div class="content">
                            <div class="title">Обо мне</div>
                            <div class="user-aboutMe" v-html="resume.aboutMe" v-if="!aboutMeChange"></div>
                        </div>

                        <div v-if="aboutMeChange">
                            <ckeditor :editor="ClassicEditor" v-model="resumeData.aboutMe.value"
                                v-memo="[resumeData.aboutMe.value]"></ckeditor>
                        </div>

                        <!-- EDITING -->
                        <button class="resume-editor-link" v-if="!aboutMeChange"
                            @click="aboutMeChange = true">Редактировать</button>

                        <EditorButtons v-if="aboutMeChange" justify-end
                            @save="() => { resume['aboutMe'] = resumeData.aboutMe.value; aboutMeChange = false }"
                            @cancel="() => { resumeData.aboutMe.value = resume['aboutMe']; aboutMeChange = false }" />
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 7 ------------------->
                    <div class="resume-sector-7 sector">
                        <div class="content">
                            <h2 class="title">Портфолио</h2>
                            <ul class="user-portfolio-list">
                                <li class="user-portfolio" v-for="portfolio in resume.portfolio"
                                    :key="resume.portfolio.indexOf(portfolio)">
                                    <div class="content" @click="portfolioDialog(portfolio)">
                                        <img class="portfolio-image" :src="portfolio.img" alt="">
                                        <img class="portfolio-bg" :src="portfolio.img" alt="">
                                    </div>
                                </li>
                            </ul>

                        </div>

                        <div :open="portfolioCheckout !== null" class="portfolio-dialog" @click="portfolioDialog(null)">
                            <div class="dialog-content" @click.stop>
                                <div class="dialog-show">
                                    <img :src="portfolioCheckout?.img" class="portfolio-image" alt="">
                                </div>
                                <div class="dialog-description" v-if="portfolioCheckout?.title">
                                    <h2 class="title">{{ portfolioCheckout.title }}</h2>
                                    <div class="description text-block" v-html="portfolioCheckout.description"></div>
                                </div>

                            </div>
                            <button v-html="icons.x" class="exit-button" @click.stop="portfolioDialog(null)"></button>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 8 ------------------->
                    <div class="resume-sector-8 sector">
                        <div class="content">
                            <h2 class="title">Высшее образование</h2>
                            <ul class="user-education-list timeline-list">
                                <li class="user-education timeline-li" v-for="education in resume.education"
                                    :key="resume.education.indexOf(education)">
                                    <div class="graduation timeline-date">
                                        <strong>{{ education.graduatedAt }}</strong>
                                        <br>
                                        {{ education.location }}
                                    </div>
                                    <div class="content">
                                        <h4 class="timeline-title">{{ education.institution }} ({{
                                            ResumeOptions.educationDegree[education.degree] }})</h4>
                                        <p>{{ education.faculty }}, {{ education.specialization }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 9 ------------------->
                    <div class="resume-sector-9 sector">
                        <div class="content">
                            <h2 class="title">Повышение квалификации, курсы</h2>
                            <ul class="user-education-list timeline-list">
                                <li class="user-education timeline-li" v-for="course in resume.courses"
                                    :key="resume.courses.indexOf(course)">
                                    <div class="graduation timeline-date">
                                        <strong>{{ course.graduatedAt }}</strong>
                                        <br>
                                        {{ course.location }}
                                    </div>
                                    <div class="content">
                                        <h4 class="timeline-title">{{ course.organization }}</h4>
                                        <p>{{ course.name }}, {{ course.specialization }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 10 ------------------->
                    <div class="resume-sector-10 sector">
                        <div class="content">
                            <h2 class="title">Знание языков</h2>
                            <ul class="user-languages">
                                <li>{{ resume.motherLang }}</li>
                                <li v-for="language in resume.languages" :key="resume.languages.indexOf(language)">
                                    <span>{{ language.name }}</span> — {{ ResumeOptions.languagesLevel[language.level] }}
                                </li>
                            </ul>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <!------------------ SECTOR 11 ------------------->
                    <div class="resume-sector-11 resume-sector-7 sector">
                        <div class="content">
                            <h2 class="title">Дипломы, Сертификаты</h2>
                            <ul class="user-certificate-list">
                                <li class="user-certificate" v-for="certificate in resume.certificates"
                                    :key="resume.certificates.indexOf(certificate)">
                                    <div class="content">
                                        <img class="certificate-image" :src="certificate.img" alt="">
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 12 ------------------->
                    <div class="resume-sector-12 sector">
                        <div class="content">
                            <h2 class="title">Карьерный рост, Опыт</h2>
                            <ul class="career-list timeline-list">
                                <li class="career timeline-li" v-for="career in resume.career"
                                    :key="resume.career.indexOf(career)">
                                    <strong class="career-year">{{ career.year }}</strong>
                                    <div class="content">
                                        <h4 class="timeline-title">{{ career.name }}</h4>
                                        <div class="career-description" v-html="career.description"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 13 ------------------->

                    <div class="resume-sector-13 sector">
                        <div class="content">
                            <h2 class="title">Гражданство, время в пути до работы</h2>
                            <div class="content">
                                <p class="user-citizenship text-block">Гражданство:
                                    <span v-for="citizenship in resume.citizenship" :key="citizenship">
                                        {{ citizenship }}{{ resume.citizenship.indexOf(citizenship) + 1 !=
                                            resume.citizenship.length
                                            ? ',' : null }}
                                    </span>
                                </p>
                                <p class="user-workPermission text-block">Разрешение на работу:
                                    <span v-for="work in resume.workPermission" :key="work">
                                        {{ work }}{{ resume.workPermission.indexOf(work) !=
                                            resume.citizenship.length
                                            ? ', ' : null }}
                                    </span>
                                </p>
                                <p class="user-workPermission text-block">Желательное время в пути до работы: {{
                                    ResumeOptions.travel[resume.travel] }}
                                </p>
                            </div>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                </div>

                <!--  -->

                <!-- ================ RESUME TOOLS ================= -->
                <div class="resume-tools">
                    <div class="content">
                        <div class="header">
                            <div class="top">
                                <a-select v-model:value="langOptionsValue" :options="langOptions"
                                    :getPopupContainer="antParentNode"></a-select>
                                <div class="top-btns">
                                    <button data-title="Download" data-title-top v-html="icons.download"></button>
                                    <button data-title="Print" data-title-top v-html="icons.print"></button>
                                    <button data-title="Delete" data-title-top v-html="icons.trash"></button>
                                </div>
                            </div>
                            <div class="tools-visibility">
                                <a-select v-model:value="visiblityOptionsValue" :options="visiblityOptions"
                                    :getPopupContainer="antParentNode"></a-select>
                            </div>
                        </div>

                        <hr class="break" break-left>

                        <div class="tools-resume-completion">
                            <h2 class="tools-title title">Завершенность резюме</h2>
                            <div class="content">

                                <div class="tools-diagram">
                                    <svg height="100%" width="100%" class="svg-chart"
                                        :style="{ strokeDasharray: '315%', strokeDashoffset: (315 / 100) * (100 - completed) + '%' }">
                                        <circle r="50%" y="100%" x="100%" fill="none"></circle>
                                    </svg>
                                    <svg class="svg-bg" height="100%" width="100%">
                                        <circle r="50%" y="100%" x="100%" fill="none"></circle>
                                    </svg>
                                    <div class="tools-percentage title">{{ completed }}%</div>
                                </div>

                                <div class="tools-remainders">
                                    <p class="text-block">Еще вы можете указать:</p>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                </div>
                <!--  -->
            </div>
        </div>
    </div>
</template>

<!-- ============================================================================================================================ -->

<script lang="ts">
import { defineComponent, Ref, watch } from "vue";
import { ref } from "vue";
import { months, ResumeOptions, iUserResume } from "@/app/store/interfaces";
import type { SelectProps } from 'ant-design-vue';
import { icons, skillsIcons } from "@/app/assets/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UseTodo } from "@/hooks";
import { EditorButtons, Modal } from "@/shared/UI";
import Faq from "./ui/FaqSector.vue";

export default defineComponent({
    name: 'Resume',
    components: {
        EditorButtons,
        Modal,
        Faq,
    },
    setup() {
        const resume: iUserResume = {
            userName: 'Чинбердиев Алишер Акромович',
            gender: 'M',
            img: '',
            dob: 1047582000000,
            contact: [{
                id: 1,
                name: 'phone',
                value: '+998 (97) 777-31-91',
                type: 'tel:',
                preferred: false
            },
            {
                id: 2,
                name: 'gmail',
                value: 'alisherchinberdiyev1403@gmail.com',
                type: 'mailto:',
                preferred: true
            },
            {
                id: 3,
                name: 'telegram',
                value: 'https://t.me/alisher2552',
                type: '',
                preferred: false
            },
            ],
            city: 'Tashkent',
            move: false,
            bTrip: false,
            position: 'Front-end Developer',
            specialization: ['Программист', 'разработчик'],
            salary: 400,
            currency: 'dollar',
            employment: 'part',
            schedule: 'flexible',
            skills: [
                "HTML",
                "CSS3",
                "JavaScript-js",
                "TypeScript-ts",
                "Sass",
                "Git",
                "Vue",
                "React",
                "Angular",
                "C#",
                "C",
                "C++",
                "Redux",
                "Vuex",
                "react-router-dom react router",
                "Java",
                "Kotlin",
                "Swift",
                "Laravel",
                "php",
                "Sql",
                'MySql',
                'PostgreSQL',
                'Vue-Router'
            ],
            aboutMe: `- Привет, меня зовут Алишер и я студент 4го курса в Сингапурском Университете. Здесь я 3 года изучал основы программирования.`,
            portfolio: [{
                title: 'My Project',
                description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                img: 'https://colorlib.com/wp-content/uploads/sites/2/library-website-design-1.jpg'
            },
            {
                title: 'My Vue Project',
                description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                img: 'https://colorlib.com/wp/wp-content/uploads/sites/2/portfolio-website-builders.jpg'
            },
            {
                title: 'My React Project',
                description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                img: 'https://cdn.dribbble.com/userupload/4060584/file/original-a2dcb88a24da79db509636a26cd98052.png?resize=400x0'
            },
            {
                title: 'My React Project, lorem ipsum dolor site amet',
                description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
                img: 'https://i.pinimg.com/564x/2d/a5/bf/2da5bff0fa28e5256b1f22a15c3ba70b.jpg'
            },
            ],
            education: [{
                degree: 'bachelor',
                institution: 'MDIS Tashkent',
                faculty: 'Computer Information',
                specialization: 'IT',
                graduatedAt: '2024',
                location: 'Uzbekistan, Tashkent'
            },
            {
                degree: 'bachelor',
                institution: 'MDIS Tashkent',
                faculty: 'Computer Information',
                specialization: 'IT',
                graduatedAt: '2024',
                location: 'Uzbekistan, Tashkent'
            },
            ],
            motherLang: 'Uzbek',
            languages: [{
                name: 'english',
                level: 'b2'
            },
            {
                name: 'russian',
                level: 'b1'
            },
            ],
            courses: [{
                name: 'Web Development',
                organization: 'Proweb',
                specialization: 'Frontend',
                graduatedAt: '2023',
                location: 'Uzbekistan, Tashkent'
            },
            {
                name: 'Python Programming',
                organization: 'Proweb',
                specialization: 'Backend',
                graduatedAt: '2023',
                location: 'Uzbekistan, Tashkent'
            },
            ],
            certificates: [{
                name: 'MDIS Tashkent',
                img: 'https://edit.org/images/cat/diplomas-certificates-big-2020042416.jpg'
            },
            {
                name: 'Proweb',
                img: 'https://img.freepik.com/premium-vector/diploma-certificate-template_23-2148569141.jpg'
            },
            ],
            career: [{
                year: '2014',
                name: 'First Programming',
                description: 'The first computer programming course I have, there I learnt basics of Microsoft Office Applications'
            },
            {
                year: '2020',
                name: 'Mdis Tashkent entrance',
                description: 'The first computer programming course I have, there I learnt basics of Microsoft Office Applications'
            },
            {
                year: '2023',
                name: 'Prowen Edicaton Center',
                description: 'The first computer programming course I have, there I learnt basics of Microsoft Office Applications'
            },
            ],
            citizenship: ['Узбекистан'],
            workPermission: ['Узбекистан', 'Россия'],
            travel: '1.30',
            car: '',
            langSelected: 'rus',
        };

        /**
         * ! --------------------------------------- Resume Tools Codes ---------------------------------------- !
         */

        const langOptionsValue = ref<string>(resume.langSelected)
        const langOptions = ref<SelectProps['options']>([{
            value: 'rus',
            label: 'Русский'
        },
        {
            value: 'eng',
            label: 'English'
        }
        ]);

        const visiblityOptionsValue = ref<string>('all');
        const visiblityOptions = ref<SelectProps['options']>([{
            value: 'all',
            label: 'Видно всем'
        },
        {
            value: 'selected_companies',
            label: 'Видно выбранным компаниям'
        },
        {
            value: 'selected_companies_hidden',
            label: 'Скрыто от выбранных компаний'
        },
        {
            value: 'only_links',
            label: 'Видно только по прямой ссылке'
        },
        {
            value: 'none',
            label: 'Не видно никому'
        }
        ]);

        /**
         * ! ------------------------------ RESUME EDITING BOOLEAN STATES ---------------------------------- !
         */

        const completed = ref<number>(65);

        const portfolioCheckout = ref<{
            title: string,
            description: string,
            img: string
        } | null>(null);

        function portfolioDialog(portfolio: {
            title: string,
            description: string,
            img: string
        } | null): void {
            document.body.style.overflow = portfolio == null ? 'auto' : 'hidden';
            portfolioCheckout.value = portfolio;
        }

        const calculatedDob = ref<number>();

        const faqChange = ref<boolean>(false);
        const skillsChange = ref<boolean>(false);
        const aboutMeChange = ref<boolean>(false);
        const contactChange = ref<boolean>(false);
        const tripChange = ref<boolean>(false);

        const antParentNode = (trigger: any): void => trigger.parentNode;

        /**
         * ! ------------------------------------- RESUME DATA STATES --------------------------------------- !
         */

        class ResumeData {
            date: Date;
            gender: Ref;
            dob: Ref;
            skills: Ref;
            aboutMe: Ref;
            contact: Ref;

            constructor() {
                this.date = new Date(resume.dob);
                this.gender = ref<'M' | 'F' | null>(resume.gender);
                this.dob = ref<{ d: number, m: number, y: number }>({ d: this.date.getDate(), m: this.date.getMonth() + 1, y: this.date.getFullYear() });
                this.skills = ref<Array<string>>([...resume.skills].map(el => el.toLocaleLowerCase()));
                this.aboutMe = ref<string>(resume.aboutMe);
                this.contact = ref<Array<{ id: number | string; name: string; value: string; type: string; preferred?: boolean | null }>>(resume.contact);
            }

            public setFaq() {
                resume.gender = this.gender.value;
                faqChange.value = false;
                getAge();
            }

            public setContact(): void {
                contactChange.value = false;
            }

            public cancel(method: string): void {
                const cancelMethods = {
                    faq: (): void => {
                        resumeData.gender.value = resume['gender'];
                        faqChange.value = false;
                    },
                    contact: (): void => {
                        contactChange.value = false;
                    }
                }
                type ObjectKey = keyof typeof cancelMethods;
                const methodName = method as ObjectKey;
                cancelMethods[methodName]();
            }
        }

        const resumeData = new ResumeData();

        console.log({
            ...new ResumeData()
        });

        /**
         * ! ------------------------------------- OTHER ADDITIONAL STATES --------------------------------------- !
         */

        function getAge(): void {
            const d = new Date();
            const birthDay = new Date(resume.dob);
            calculatedDob.value = d.getFullYear() - birthDay.getFullYear() - +(d.getMonth() < birthDay.getMonth() || (d.getMonth() === birthDay.getMonth() && d.getDate() < birthDay.getDate()))
        }

        interface ContactType {
            id: number, name: string, value: string, type: string, preferred: boolean
        }

        const contactEdit = {
            list: ref<UseTodo>(new UseTodo(resumeData.contact.value)).value,
            modal: ref<boolean>(false),
            initialData: ref<ContactType>({ id: Date.now(), name: '', value: '', type: '', preferred: false }).value,
            data: ref<ContactType>({ id: Date.now(), name: '', value: '', type: '', preferred: false }).value,
            setOne: function (contact: ContactType) {
                this.modal.value = true, this.data = contact, this.initialData = { ...contact }
            }
        }

        function canceContactlEdit(): void {
            contactEdit.data = { id: Date.now(), name: '', value: '', type: '', preferred: false };
        }

        /**
        * ? ---------------------- BUILT IN VUE METHODS --------------------------- ?
        */

        watch(contactEdit, (data) => {
            // if (!faqChange.value) {
            console.log(data);
            // }
        })


        /**
         * ? ---------------------- RETURNING STATES  AND FUNCTIONS --------------------------- ?
         */

        return {
            resume,
            months,
            ResumeOptions,
            langOptionsValue,
            langOptions,
            icons,
            skillsIcons,
            visiblityOptionsValue,
            visiblityOptions,
            completed,
            portfolioCheckout,
            portfolioDialog,
            calculatedDob,
            faqChange,
            skillsChange,
            tripChange,
            ClassicEditor,
            aboutMeChange,
            contactChange,
            antParentNode,
            resumeData,
            getAge,
            contactEdit,
            canceContactlEdit,
        }

    },
    /**
     * ? ------------------------------------- OTHER BUILT-IN METHODS --------------------------------------- !
     */
});
</script>
<style>
@import url("./style.scss");
</style>