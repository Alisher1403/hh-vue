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

                            <div class="user-date">
                                <span v-if="user.gender != ''">{{ user.gender == 'M' ? 'Мужчина' : user.gender == 'F' ?
                                    'Женщина'
                                    : null }}</span>,
                                <span v-if="user.age">{{ user.age }} лет</span>,
                                <span v-if="user.dbo">родился {{ user.dbo.day }} {{
                                    months[user.langSelected][+user.dbo.month - 1] }} {{ user.dbo.year }}</span>
                            </div>

                            <router-link to="" class="resume-editor-link">Редактировать</router-link>
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

                            <ul class="user-skills" v-if="!skillsChange">
                                <li class="skill" v-for="skill in user.skills" :key="skill">
                                    <div class="skill-icon" v-html="skillsIcons[skill.toLocaleLowerCase()]['icon']"></div>
                                    <p class="skill-name text-block">{{ skillsIcons[skill.toLocaleLowerCase()]['name'] }}
                                    </p>
                                </li>
                            </ul>

                            <a-select v-if="skillsChange" class="skills-select" style="width: 100%;" mode="tags"
                                v-model:value="skillsSelect" focus="true">
                                <a-select-option class="user-portfolio-scoped-style" v-for="el in Object.keys(skillsIcons)"
                                    :key="el" :value="el.toLocaleLowerCase()">
                                    <div class="skill-icon" v-html="skillsIcons[el.toLocaleLowerCase()]['icon']"></div>
                                    <p class="skill-name text-block">{{ skillsIcons[el.toLocaleLowerCase()]['name'] }}</p>
                                </a-select-option>
                            </a-select>
                        </div>

                        <button class="resume-editor-link" @click="skillsChange = true">Редактировать</button>
                    </div>

                    <!------------------ SECTOR 6 ------------------->
                    <div class="resume-sector-6 sector">
                        <div class="content">
                            <div class="title">Обо мне</div>
                            <div class="user-aboutMe" v-html="user.aboutMe"></div>
                        </div>

                        <router-link to="" class="resume-editor-link">Редактировать</router-link>
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
                                <a-select v-model:value="langOptionsValue" :options="langOptions"></a-select>
                                <div class="top-btns">
                                    <button data-title="Download" data-title-top v-html="icons.download"></button>
                                    <button data-title="Print" data-title-top v-html="icons.print"></button>
                                    <button data-title="Delete" data-title-top v-html="icons.trash"></button>
                                </div>
                            </div>
                            <div class="tools-visibility">
                                <a-select v-model:value="visiblityOptionsValue" :options="visiblityOptions"></a-select>
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

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { months, ResumeOptions, iUserResume } from "@/data/interfaces";
import type { SelectProps } from 'ant-design-vue';
import { icons, skillsIcons } from "@/assets/icons";

export default defineComponent({
    name: 'Resume',
    setup() {
        const user: iUserResume = {
            name: 'Чинбердиев Алишер Акромович',
            gender: 'M',
            age: 20,
            img: 'https://img.hhcdn.ru/photo/730478762.jpeg?t=1694184318&h=Ykz4Mv7JhZ1J3S9omSZJ5A',
            dbo: {
                day: '14',
                month: '03',
                year: '2003',
            },
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
                "JavaScript",
                "TypeScript",
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
                "react-router-dom",
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

        const skillsSelect = ref<Array<string>>([...user.skills].map(el => el.toLocaleLowerCase()));
        console.log(skillsSelect.value);

        const skillsChange = ref<boolean>(false);

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
            skillsSelect,
            skillsChange,
        }
    }
})
</script>

<style lang="scss">
@import '@/assets/style.scss';

/************************************************************/
$text-size: 15px;
$break-width: 0.5px;
$break-point-size: 5px;
$skills-height: 40px;

.resume-editor-link {
    @include link-style();
    display: inline-block;
    margin-top: 10px;
}

@mixin list-block-style() {
    padding: 10px;
    @include text();
    /* background: var(--element-background); */
    border: 1px solid var(--border-color);
    line-height: 100%;
    border-radius: 5px;
    cursor: default;
}

@mixin timeline() {
    .timeline-list {
        display: flex;
        flex-direction: column;
        row-gap: 30px;
        position: relative;
        margin-left: 10px;

        $pointer-width: 10px;
        $pointer-margin: 4px;

        &::before {
            content: '';
            height: 100%;
            width: 0.5px;
            background: var(--line-color2);
            position: absolute;
            left: calc($pointer-width / 2);
            top: calc($pointer-margin);
            translate: -50% 0;
        }

        .timeline-li {
            display: flex;
            column-gap: 20px;
            @include text();

            &::before {
                content: '';
                height: $pointer-width;
                margin-top: $pointer-margin;
                aspect-ratio: 1/1;
                border-radius: 50%;
                background: var(--line-color2);
            }

            .timeline-date {
                width: 150px;

                strong {
                    font-family: var(--font-semiBold);
                    display: inline-block;
                    margin-bottom: 2px;
                }
            }

            .content {
                .timeline-title {
                    font-family: var(--font-semiBold);
                    color: var(--title-color);
                    margin-bottom: 5px;
                }
            }
        }
    }
}

.sector {
    padding: 20px 0;
    padding-right: 20px;
}

.title {
    font-family: var(--font-semiBold);
    color: var(--title-color);
    margin-bottom: 20px;
    font-size: 24px;
}

.break {
    border: none;
    height: $break-width;
    width: 100%;
    background: var(--line-color);
    position: relative;

    &::after {
        content: '';
        height: $break-point-size;
        aspect-ratio: 1/1;
        background: var(--line-color);
        position: absolute;
        border-radius: 50%;
        right: 0;
        top: 0;
        translate: calc(50% + calc($break-width / 2)) -50%;
    }

    &[break-left] {
        &::after {
            left: 0;
            translate: calc(-50% - calc($break-width / 2)) -50%;
        }
    }
}

@mixin text() {
    font-size: $text-size;
    font-family: var(--font-regular);
    color: var(--title-color);
    font-size: $text-size;
}

.text-block {
    @include text();
}

.user-portfolio-scoped-style {
    padding: 5px 5px !important;

    .ant-select-item-option-content {
        display: grid;
        grid-template-columns: $skills-height auto;
        align-items: center;

        * {
            margin: 0;
            padding: 0;
        }

        .skill-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc($skills-height - 10px);
        }
    }

    .ant-select-item-option-state {
        display: flex;
        margin-right: 5px;
        justify-content: center;
        align-items: center;
    }
}

/************************************************************/
.resume-editor {
    .resume-wrapper {
        display: flex;
        padding: 60px 0;

        @include media(1100px) {
            flex-direction: column;
        }

        /* ============== RESUME CONTENT ============== */
        .resume-content {
            border-right: 0.5px solid var(--line-color);

            @include media(1100px) {
                border: none;
                border-left: 0.5px solid var(--line-color);

                .sector {
                    padding-left: 20px;
                }

                .break {
                    display: flex;
                    justify-content: center;

                    &::after {
                        left: 0;
                        right: auto;
                        transform: translate(calc(-100% - $break-width), $break-width);
                    }
                }
            }

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
            }

            .resume-sector-2 {
                .contact {
                    margin: 5px 0;

                    .contact-name {
                        text-transform: capitalize;
                        @include text();
                    }

                    .contact-link {
                        @include text();
                        @include link-style();
                        font-size: calc($text-size - 1px);

                        &:hover {
                            color: rgb(216, 0, 0);
                        }
                    }
                }
            }

            .resume-sector-3 {
                .content {
                    display: flex;
                    @include text();
                }
            }

            .resume-sector-4 {
                margin: 20px 0;

                .content {
                    .user-position {
                        font-size: 18px;
                    }

                    .user-salary {
                        @include text();
                        font-size: calc($text-size + 5px);
                        margin-bottom: 10px;

                        span {
                            @include text();
                            font-size: calc($text-size + 6px);
                            font-family: var(--font-semiBold);
                        }
                    }

                    .user-specialization {
                        .title {
                            @include text();
                            margin-bottom: 5px;
                        }

                        .spec-list {
                            margin-bottom: 15px;

                            .spec-li {
                                padding: 5px 0;
                                padding-left: 25px;
                                position: relative;
                                @include text();

                                &::before {
                                    content: '';
                                    position: absolute;
                                    left: 7px;
                                    width: 13px;
                                    display: block;
                                    height: 0.5px;
                                    background: var(--text-color);
                                    top: 50%;
                                    transform: translate(0, -50%);
                                }
                            }
                        }
                    }

                    .user-employment {
                        @include text();
                        margin-bottom: 10px;
                    }

                    .user-schedule {
                        @include text();
                        margin-bottom: 10px;
                    }
                }
            }

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

                    .user-skills {
                        display: flex;
                        flex-wrap: wrap;
                        gap: $skills-gap;
                        padding: $skills-list-padding;

                        .skill {
                            @include skill-block();
                        }
                    }

                    .skill-icon {
                        height: $skills-icon-size;
                    }

                    .skills-select {
                        .ant-select-selector {
                            padding: $skills-list-padding;
                            border-left: none;
                            border-right: none;
                            border-radius: 0;
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

            .resume-sector-6 {
                padding: 20px auto;

                .user-aboutMe {
                    @include text();
                }
            }

            .resume-sector-7 {
                padding: 20px auto;

                .user-portfolio-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;

                    .user-portfolio {
                        height: 200px;
                        aspect-ratio: 1/1;
                        cursor: pointer;

                        @include media(450px) {
                            height: 150px;
                        }

                        @include media(350px) {
                            height: 130px;
                        }

                        .content {
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-between;
                            position: relative;
                            overflow: hidden;
                            padding: 7px;

                            .portfolio-image {
                                height: 100%;
                                width: 100%;
                                object-fit: contain;
                            }

                            .portfolio-bg {
                                object-fit: cover;
                                position: absolute;
                                top: 0;
                                left: 0;
                                height: 100%;
                                width: 100%;
                                z-index: -1;
                                filter: blur(20px) saturate(2);
                            }

                            .portfolio-name {
                                white-space: nowrap;
                                width: 100%;
                                @include text();
                            }

                        }

                    }
                }

                .portfolio-dialog {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    padding: 30px;
                    justify-content: center;
                    align-items: center;
                    background: gray;
                    z-index: 1000;
                    height: 100%;
                    width: 100%;
                    display: none;
                    background: rgba(0, 0, 0, 0.388);

                    @include media(550px) {
                        padding: 80px;
                    }

                    &[open='true'] {
                        display: flex;
                        opacity: 0;
                        visibility: collapse;
                        animation: open-dialog 0.3s forwards;

                        @keyframes open-dialog {
                            100% {
                                opacity: 1;
                                visibility: visible;
                            }
                        }
                    }

                    .dialog-content {
                        display: inline-flex;
                        max-height: 70%;
                        width: 100%;
                        max-width: 1000px;
                        background: white;
                        border-radius: 15px;
                        overflow: hidden;

                        @include media(550px) {
                            flex-direction: column;
                            align-items: center;
                            max-height: 100%;
                            max-width: auto;
                            width: auto;
                            padding-left: 6px;
                        }

                        .dialog-show {
                            overflow-y: scroll;
                            width: 60%;
                            border-right: 0.5px solid var(--border-color);

                            @include media(550px) {
                                width: 100%;
                                max-height: 450px;
                                height: 100%;
                                border: none;
                            }

                            /* padding-left: 10px; */

                            .portfolio-image {
                                object-fit: contain;
                                width: 100%;
                            }
                        }

                        .dialog-description {
                            padding: 20px;
                            width: 40%;
                            overflow-y: scroll;

                            @include media(550px) {
                                width: 100%;
                                height: 100%;
                                border-top: 0.5px solid var(--border-color);
                            }

                            .description {
                                line-height: 160%;
                            }
                        }

                    }

                    .exit-button {
                        position: absolute;
                        top: 3vh;
                        height: 40px;
                        right: 3vh;
                        cursor: pointer;
                        @include rm-default();

                        @include media(550px) {
                            height: 35px;
                        }

                        svg {
                            fill: var(--text-color);
                        }
                    }
                }
            }

            .resume-sector-8,
            .resume-sector-9 {
                .content {
                    margin-bottom: 5px;
                    @include timeline();
                }
            }

            .resume-sector-10 {
                .content {
                    .user-languages {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;

                        li {
                            @include list-block-style();
                            @include text();

                            span {
                                text-transform: capitalize;
                            }
                        }
                    }
                }
            }

            .resume-sector-11 {
                padding: 20px 0;

                .user-certificate-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;

                    .user-certificate {
                        height: 140px;
                        cursor: pointer;

                        .content {
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-between;
                            position: relative;
                            overflow: hidden;

                            .certificate-image {
                                height: 100%;
                                width: 100%;
                                object-fit: contain;
                            }

                            .certificate-name {
                                white-space: nowrap;
                                width: 100%;
                                @include text();
                            }
                        }
                    }
                }
            }

            .resume-sector-12 {
                .content {
                    @include timeline();

                    .career-list {
                        margin-top: 40px;
                        display: flex;
                        row-gap: 50px;
                    }

                    .career-year {
                        font-family: var(--font-semiBold);
                    }
                }
            }

            .resume-sector-13 {
                display: auto;
            }
        }

        /* ============== RESUME TOOLS ============== */

        .resume-tools {
            min-width: 300px;
            position: relative;
            $padding-left: 15px;
            padding-top: 5px;

            .tools-title {
                font-size: 18px;
            }

            .content {
                /* background: gray; */
                position: sticky;
                top: 25px;

                .header {
                    padding-left: $padding-left;
                    padding-bottom: 20px;

                    .top {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 40px;

                        .ant-select {
                            height: 40px;

                            * {
                                font-family: var(--font-regular);
                                line-height: 100%;
                                overflow: visible;
                            }

                            .ant-select-selector {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                border-radius: 8px;
                                border-color: var(--border-color);
                            }

                            .ant-select-arrow {
                                svg {
                                    fill: var(--border-color);
                                }
                            }
                        }

                        .top-btns {
                            display: flex;
                            border-radius: 8px;
                            overflow: hidden;
                            height: 40px;
                            border: 0.5px solid var(--line-color);

                            button {
                                border: none;
                                padding: 10px 12px;
                                cursor: pointer;
                                height: 100%;
                                border-right: 0.5px solid var(--line-color);
                                @include element-title();
                            }
                        }
                    }

                    .tools-visibility {
                        .ant-select {
                            width: 100%;

                            * {
                                font-family: var(--font-regular);
                                line-height: 100%;
                                overflow: visible;
                            }

                            .ant-select-selector {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                border-radius: 8px;
                                border-color: var(--border-color);
                            }
                        }
                    }

                }

                .tools-resume-completion {
                    padding-top: 20px;
                    padding-left: $padding-left;

                    $height: 110px;
                    $stroke-width: 3px;
                    $stroke-color: rgb(241, 143, 78);
                    $background: rgb(220, 220, 220);

                    .tools-diagram {
                        height: $height;
                        aspect-ratio: 1/1;
                        margin: 0 auto;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 20px;
                        /* overflow: hidden; */
                        position: relative;

                        .svg-chart,
                        .svg-bg {
                            height: calc(100% - $stroke-width * 2);
                            width: calc(100% - $stroke-width * 2);
                            position: absolute;
                            overflow: visible;
                            stroke-width: $stroke-width;
                            stroke: $stroke-color;
                            transform: rotate(-90deg) translate(50%, 50%);
                            animation: draw 1s forwards cubic-bezier(0.66, 0.07, 0.29, 0.96);


                            @keyframes draw {
                                0% {
                                    stroke-dasharray: 315%;
                                    stroke-dashoffset: 315%;
                                }
                            }
                        }

                        .svg-bg {
                            stroke: $background;
                            stroke-dasharray: 0;
                            stroke-dashoffset: 0;
                            z-index: -1;
                            animation: none;
                        }

                        .tools-percentage {
                            position: absolute;
                            padding: 0;
                            margin: 0;
                            opacity: 0;
                            animation: percentage 1s forwards;
                            animation-delay: 0.2s;

                            @keyframes percentage {
                                100% {
                                    opacity: 1;
                                }
                            }
                        }
                    }


                }
            }
        }
    }
}
</style>