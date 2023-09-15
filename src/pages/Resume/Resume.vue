<template>
    <div class="resume-editor">
        <div class="container">
            <div class="resume-wrapper">
                <!-- ================ RESUME CONTENT ================= -->
                <div class="resume-content">

                    <!------------------ SECTOR 1 ------------------->
                    <div class="resume-sector-1 sector">
                        <div class="left">
                            <h1 class="user-name title">{{ user.name }}</h1>

                            <div class="user-date" v-if="!faqChange">
                                <span v-if="user.gender != ''">{{ user.gender == 'M' ? 'Мужчина, ' : user.gender == 'F' ?
                                    'Женщина, '
                                    : null }}</span>
                                <span>{{ calculatedDob }}
                                    лет</span>,
                                <span v-if="user.dob">родился
                                    {{ dayjs(+user.dob).date() }}
                                    {{ months.rus[dayjs(+user.dob).month()] }}
                                    {{ dayjs(+user.dob).year() }}
                                </span>
                            </div>

                            <!-- EDITING -->
                            <div class="edit user-date-edit" v-if="faqChange">
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
                                ]" v-model:value="genderData" style="width: 120px;">
                                </a-select>

                                <a-date-picker v-model:value="dobData" :format="'DD.MM.YYYY'" />
                            </div>


                            <!-- EDITING -->
                            <button class="resume-editor-link" v-if="!faqChange"
                                @click="faqChange = true">Редактировать</button>

                            <div class="editor-btns align-start" v-if="faqChange">
                                <button class="editor-btn" @click="() => {
                                    user['gender'] = genderData; user['dob'] = `${dayjs(dobData).unix() * 1000}`, getAge();;
                                    ; faqChange = false
                                }">Сохранить</button>
                                <button class="editor-btn" transparent
                                    @click="() => { genderData = user['gender']; dobData = dayjs(dayjs(+user.dob), 'DD/MM/YYYY'); faqChange = false }">Отменить</button>
                            </div>
                        </div>

                        <div class="right">
                            <router-link to="" class="resume-editor-link">
                                <img :src="user.img" class="user-image" alt="">
                            </router-link>
                        </div>
                    </div>

                    <!------------------ SECTOR 2 ------------------->
                    <div class="resume-sector-2 sector" v-if="user.contact">
                        <h4 class="title">Контакты</h4>
                        <p class="contact" v-for="contact in user.contact" :key="user.contact.indexOf(contact)">
                            <span class="contact-name">{{ contact.name }}: </span>
                            <a class="contact-link" :href="contact.type + contact.value"
                                :target="contact.type !== 'tel:' ? '_blank' : ''">
                                {{ contact.value }}</a>
                        </p>
                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <!------------------ SECTOR 3 ------------------->
                    <div class="resume-sector-3 sector">
                        <div class="content">
                            <p>{{ user.move ? 'готов к переезду' : 'не готов к переезду' }},&nbsp;</p>
                            <p>{{ user.bTrip ? 'готов к командировкам' : 'не готов к командировкам' }}</p>
                        </div>
                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 4 ------------------->
                    <div class="resume-sector-4 sector">
                        <div class="content">

                            <div class="user-position title">
                                <h2>{{ user.position }}</h2>
                            </div>

                            <p class="user-salary">Зарплата: <span>{{ user.salary }}{{ user.currency }}</span></p>

                            <div class="user-specialization">
                                <p class="title">Специализации: </p>
                                <ul class="spec-list">
                                    <li class="spec-li" v-for="spec in user.specialization" :key="spec">{{ spec }}</li>
                                </ul>
                            </div>

                            <p class="user-employment">Занятость: {{ ResumeOptions.employment[user.employment] }}</p>
                            <p class="user-schedule">График работы: {{ ResumeOptions.schedule[user.schedule] }}</p>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 5 ------------------->
                    <div class="resume-sector-5 sector">
                        <div class="content">
                            <h2 class="title">Ключевые навыки</h2>

                            <ul class="user-skills" v-if="!skillsChange" v-memo="[skillsData]">
                                <li class="skill" v-for="skill in user.skills" :key="skill">
                                    <div class="skill-icon" v-html="skillsIcons[skill.toLocaleLowerCase()]?.icon"></div>
                                    <p class="skill-name text-block">{{ skillsIcons[skill.toLocaleLowerCase()] ?
                                        skillsIcons[skill.toLocaleLowerCase()].name : skill }}
                                    </p>
                                </li>
                            </ul>

                            <!-- EDITING -->
                            <a-select v-if="skillsChange" class="skills-select" style="width: 100%;" mode="tags"
                                v-model:value="skillsData" autofocus v-memo="[skillsData]">
                                <a-select-option class="user-portfolio-scoped-style" v-for="el in Object.keys(skillsIcons)"
                                    :key="el" :value="el.toLocaleLowerCase()" :getPopupContainer="antParentNode">
                                    <div class="skill-icon" v-html="skillsIcons[el.toLocaleLowerCase()]?.icon"></div>
                                    <p class="skill-name text-block">{{ skillsIcons[el.toLocaleLowerCase()]?.name }}</p>
                                </a-select-option>
                            </a-select>
                        </div>

                        <button class="resume-editor-link" @click="skillsChange = true"
                            v-if="!skillsChange">Редактировать</button>

                        <div class="editor-btns" v-if="skillsChange">
                            <button class="editor-btn"
                                @click="() => { user['skills'] = skillsData; skillsChange = false }">Сохранить</button>
                            <button class="editor-btn" transparent
                                @click="() => { skillsData = user['skills'].map(el => el.toLocaleLowerCase()); skillsChange = false }">Отменить</button>
                        </div>
                    </div>

                    <!------------------ SECTOR 6 ------------------->
                    <div class="resume-sector-6 sector">
                        <div class="content">
                            <div class="title">Обо мне</div>
                            <div class="user-aboutMe" v-html="user.aboutMe" v-if="!aboutMeChange"></div>
                        </div>

                        <div v-if="aboutMeChange">
                            <ckeditor :editor="ClassicEditor" v-model="aboutMeData" v-memo="[aboutMeData]"></ckeditor>
                        </div>

                        <!-- EDITING -->
                        <button class="resume-editor-link" v-if="!aboutMeChange"
                            @click="aboutMeChange = true">Редактировать</button>

                        <div class="editor-btns" v-if="aboutMeChange">
                            <button class="editor-btn"
                                @click="() => { user['aboutMe'] = aboutMeData; aboutMeChange = false }">Сохранить</button>
                            <button class="editor-btn" transparent
                                @click="() => { aboutMeData = user['aboutMe']; aboutMeChange = false }">Отменить</button>
                        </div>
                    </div>

                    <hr class="break">

                    <!------------------ SECTOR 7 ------------------->
                    <div class="resume-sector-7 sector">
                        <div class="content">
                            <h2 class="title">Портфолио</h2>
                            <ul class="user-portfolio-list">
                                <li class="user-portfolio" v-for="portfolio in user.portfolio"
                                    :key="user.portfolio.indexOf(portfolio)">
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
                                <li class="user-education timeline-li" v-for="education in user.education"
                                    :key="user.education.indexOf(education)">
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
                                <li class="user-education timeline-li" v-for="course in user.courses"
                                    :key="user.courses.indexOf(course)">
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
                                <li>{{ user.motherLang }}</li>
                                <li v-for="language in user.languages" :key="user.languages.indexOf(language)">
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
                                <li class="user-certificate" v-for="certificate in user.certificates"
                                    :key="user.certificates.indexOf(certificate)">
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
                                <li class="career timeline-li" v-for="career in user.career"
                                    :key="user.career.indexOf(career)">
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
                                    <span v-for="citizenship in user.citizenship" :key="citizenship">
                                        {{ citizenship }}{{ user.citizenship.indexOf(citizenship) + 1 !=
                                            user.citizenship.length
                                            ? ',' : null }}
                                    </span>
                                </p>
                                <p class="user-workPermission text-block">Разрешение на работу:
                                    <span v-for="work in user.workPermission" :key="work">
                                        {{ work }}{{ user.workPermission.indexOf(work) !=
                                            user.citizenship.length
                                            ? ', ' : null }}
                                    </span>
                                </p>
                                <p class="user-workPermission text-block">Желательное время в пути до работы: {{
                                    ResumeOptions.travel[user.travel] }}
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
import { defineComponent, watch } from "vue";
import "./style.scss";
import { ref } from "vue";
import { months, ResumeOptions, iUserResume } from "@/data/interfaces";
import type { SelectProps } from 'ant-design-vue';
import { icons, skillsIcons } from "@/assets/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as dayjs from 'dayjs'

export default defineComponent({
    name: 'Resume',
    setup() {
        const user: iUserResume = {
            name: 'Чинбердиев Алишер Акромович',
            gender: 'M',
            img: 'https://img.hhcdn.ru/photo/730478762.jpeg?t=1694572856&h=E7td_zjiTfgT0gqyeFO6uw',
            dob: '1047582000000',
            contact: [
                { name: 'phone', value: '+998 (97) 777-31-91', type: 'tel:', preferred: false },
                { name: 'gmail', value: 'alisherchinberdiyev1403@gmail.com', type: 'mailTo:', preferred: true },
                { name: 'telegram', value: 'https://t.me/alisher2552', type: '', preferred: false },
            ],
            city: 'Tashkent',
            move: false,
            bTrip: false,
            position: 'Front-end Developer',
            specialization: ['Программист', 'разработчик'],
            salary: 400,
            currency: '$',
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
            portfolio: [
                { title: 'My Project', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, img: 'https://colorlib.com/wp-content/uploads/sites/2/library-website-design-1.jpg' },
                { title: 'My Vue Project', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, img: 'https://colorlib.com/wp/wp-content/uploads/sites/2/portfolio-website-builders.jpg' },
                { title: 'My React Project', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, img: 'https://cdn.dribbble.com/userupload/4060584/file/original-a2dcb88a24da79db509636a26cd98052.png?resize=400x0' },
                { title: 'My React Project, lorem ipsum dolor site amet', description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, img: 'https://i.pinimg.com/564x/2d/a5/bf/2da5bff0fa28e5256b1f22a15c3ba70b.jpg' },
            ],
            education: [
                { degree: 'bachelor', institution: 'MDIS Tashkent', faculty: 'Computer Information', specialization: 'IT', graduatedAt: '2024', location: 'Uzbekistan, Tashkent' },
                { degree: 'bachelor', institution: 'MDIS Tashkent', faculty: 'Computer Information', specialization: 'IT', graduatedAt: '2024', location: 'Uzbekistan, Tashkent' },
            ],
            motherLang: 'Uzbek',
            languages: [
                { name: 'english', level: 'b2' },
                { name: 'russian', level: 'b1' },
            ],
            courses: [
                { name: 'Web Development', organization: 'Proweb', specialization: 'Frontend', graduatedAt: '2023', location: 'Uzbekistan, Tashkent' },
                { name: 'Python Programming', organization: 'Proweb', specialization: 'Backend', graduatedAt: '2023', location: 'Uzbekistan, Tashkent' },
            ],
            certificates: [
                { name: 'MDIS Tashkent', img: 'https://edit.org/images/cat/diplomas-certificates-big-2020042416.jpg' },
                { name: 'Proweb', img: 'https://img.freepik.com/premium-vector/diploma-certificate-template_23-2148569141.jpg' },
            ],
            career: [
                { year: '2014', name: 'First Programming', description: 'The first computer programming course I have, there I learnt basics of Microsoft Office Applications' },
                { year: '2020', name: 'Mdis Tashkent entrance', description: 'The first computer programming course I have, there I learnt basics of Microsoft Office Applications' },
                { year: '2023', name: 'Prowen Edicaton Center', description: 'The first computer programming course I have, there I learnt basics of Microsoft Office Applications' },
            ],
            citizenship: ['Узбекистан'],
            workPermission: ['Узбекистан', 'Россия'],
            travel: '1.30',
            car: '',
            langSelected: 'rus',
        }

        // ************************************* //

        const langOptionsValue = ref<string>(user.langSelected)
        const langOptions = ref<SelectProps['options']>([
            {
                value: 'rus',
                label: 'Русский'
            },
            {
                value: 'eng',
                label: 'English'
            }
        ]);

        const visiblityOptionsValue = ref<string>('all');
        const visiblityOptions = ref<SelectProps['options']>([
            {
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

        const completed = ref<number>(65);
        const portfolioCheckout = ref<{ title: string, description: string, img: string } | null>(null);

        function portfolioDialog(portfolio: { title: string, description: string, img: string } | null): void {
            document.body.style.overflow = portfolio == null ? 'auto' : 'hidden';
            portfolioCheckout.value = portfolio;
        }

        const genderData = ref<string | null>(user.gender);
        const dobData = ref<dayjs.Dayjs | null>(dayjs(dayjs(+user.dob), 'DD/MM/YYYY'));
        const calculatedDob = ref<number>();

        const faqChange = ref<boolean>(false);

        const skillsData = ref<Array<string>>([...user.skills].map(el => el.toLocaleLowerCase()));
        const skillsChange = ref<boolean>(false);

        const aboutMeData = ref<string>(user.aboutMe);
        const aboutMeChange = ref<boolean>(false);

        const antParentNode = (trigger: any): void => trigger.parentNode;

        watch(faqChange, (dat) => {
            if (!faqChange.value) {
                console.log(dat);
            }
        })

        return {
            user,
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
            genderData,
            dobData,
            calculatedDob,
            faqChange,
            skillsData,
            skillsChange,
            ClassicEditor,
            aboutMeData,
            aboutMeChange,
            antParentNode,
            dayjs,
        }
    },
    mounted() {
        this.getAge();
    },
    methods: {
        getAge() {
            const d = new Date();
            const birthDay = new Date(+this.user.dob);
            this.calculatedDob = d.getFullYear() - birthDay.getFullYear() - +(d.getMonth() < birthDay.getMonth() || (d.getMonth() === birthDay.getMonth() && d.getDate() < birthDay.getDate()))
        }
    }
})
</script>
