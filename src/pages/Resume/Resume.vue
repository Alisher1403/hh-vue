<template>
    <div>{{ resume?.name }}</div>
</template>

<!-- ============================================================================================================================ -->

<script lang="ts">
import {
    defineComponent,
    onMounted,
    Ref,
    watch
} from "vue";
import "./style.scss";
import {
    ref
} from "vue";
import {
    months,
    ResumeOptions,
    iUserResume
} from "@/data/interfaces";
import type {
    SelectProps
} from 'ant-design-vue';
import {
    icons,
    skillsIcons
} from "@/assets/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    UseTodo
} from "@/hooks";
import {
    EditorButtons,
    Modal
} from "@/components/UI";
import * as dayjs from 'dayjs'

export default defineComponent({
    name: 'Resume',
    components: {
        EditorButtons,
        Modal,
    },
    setup() {
        const resume = {
            name: 'Чинбердиев Алишер Акромович',
            gender: 'M',
            img: 'https://img.hhcdn.ru/photo/730478762.jpeg?t=1695369688&h=mRmCuwvWeyD6bthyLJkKOA',
            dob: '1047582000000',
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

        const antParentNode = (trigger: any): void => trigger.parentNode;

        /**
         * ! ------------------------------------- RESUME DATA STATES --------------------------------------- !
         */

        class ResumeData {
            gender: Ref;
            dob: Ref;
            skills: Ref;
            aboutMe: Ref;
            contact: Ref;

            constructor() {
                this.gender = ref<string | null>(resume.gender);
                this.dob = ref<dayjs.Dayjs | null>(dayjs(dayjs(+resume.dob), 'DD/MM/YYYY'));
                this.skills = ref<Array<string>>([...resume.skills].map(el => el.toLocaleLowerCase()));
                this.aboutMe = ref<string>(resume.aboutMe);
                this.contact = ref<Array<{ id: number | string; name: string; value: string; type: string; preferred?: boolean | null }>>(resume.contact);
            }

            public setFaq() {
                resume.gender = this.gender.value;
                resume.dob = `${dayjs(this.dob.value).unix() * 1000}`;
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
                        resumeData.dob.value = dayjs(dayjs(+resume.dob), 'DD/MM/YYYY');
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
            const birthDay = new Date(+resume.dob);
            calculatedDob.value = d.getFullYear() - birthDay.getFullYear() - +(d.getMonth() < birthDay.getMonth() || (d.getMonth() === birthDay.getMonth() && d.getDate() < birthDay.getDate()))
        }

        const contactEdit = {
            list: ref<UseTodo>(new UseTodo(resumeData.contact.value)).value,
            modal: ref<boolean>(false),
            data: ref<{ id: number, name: string, value: string, type: string, preferred: boolean }>({ id: Date.now(), name: '', value: '', type: '', preferred: false }).value,
        }

        class UseTodoExtended extends UseTodo {
            public modal: boolean;
            constructor(args: { list: any[], bool?: boolean }) {
                super(args.list);
                this.modal = args.bool || false;
            }
        }

        console.log(new UseTodoExtended({ list: contactEdit.list.array, bool: false }));


        function canceContactlEdit(): void {
            contactEdit.data = { id: Date.now(), name: '', value: '', type: '', preferred: false };
        }

        /**
        * ? ---------------------- BUILT IN VUE METHODS --------------------------- ?
        */

        watch(faqChange, (data) => {
            if (!faqChange.value) {
                console.log(data);
            }
        })

        onMounted(() => {
            getAge();
        })

        /**
         * ? ---------------------- RETURNING STATES AND FUNCTIONS --------------------------- ?
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
            ClassicEditor,
            aboutMeChange,
            contactChange,
            antParentNode,
            dayjs,
            resumeData,
            getAge,
            contactEdit,
            canceContactlEdit,
        }

    },
    /**
     * ? ------------------------------------- OTHER BUILT-IN METHODS --------------------------------------- !
     */
})
</script>
