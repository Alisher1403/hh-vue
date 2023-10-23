<template>
  <div class="resume-editor" v-if="resume">
    <div class="container">
      <div class="resume-wrapper">
        <!-- ================ RESUME CONTENT ================= -->
        <div class="resume-content">
          <InfoSection />

          <ContactSection />

          <TripSection />
          <hr class="break" />

          <EmploymentSection />

          <hr class="break" />

          <SkillsSection />

          <AboutSection />
          <hr class="break" />

          <PortfolioSection />
          <hr class="break" />

          <!------------------ SECTOR 8 ------------------->
          <div class="resume-sector-8 sector">
            <div class="content">
              <h2 class="title">Высшее образование</h2>
              <ul class="user-education-list timeline-list">
                <li class="user-education timeline-li" v-for="education in resume.education" :key="resume.education.indexOf(education)">
                  <div class="graduation timeline-date">
                    <strong>{{ education.graduatedAt }}</strong>
                    <br />
                    {{ education.location }}
                  </div>
                  <div class="content">
                    <h4 class="timeline-title">{{ education.institution }} ({{ ResumeOptions.educationDegree[education.degree] }})</h4>
                    <p>{{ education.faculty }}, {{ education.specialization }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <router-link to="" class="resume-editor-link">Редактировать</router-link>
          </div>

          <hr class="break" />

          <!------------------ SECTOR 9 ------------------->
          <div class="resume-sector-9 sector">
            <div class="content">
              <h2 class="title">Повышение квалификации, курсы</h2>
              <ul class="user-education-list timeline-list">
                <li class="user-education timeline-li" v-for="course in resume.courses" :key="resume.courses.indexOf(course)">
                  <div class="graduation timeline-date">
                    <strong>{{ course.graduatedAt }}</strong>
                    <br />
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

          <hr class="break" />

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
                <li class="user-certificate" v-for="certificate in resume.certificates" :key="resume.certificates.indexOf(certificate)">
                  <div class="content">
                    <img class="certificate-image" :src="certificate.img" alt="" />
                  </div>
                </li>
              </ul>
            </div>

            <router-link to="" class="resume-editor-link">Редактировать</router-link>
          </div>

          <hr class="break" />

          <!------------------ SECTOR 12 ------------------->
          <div class="resume-sector-12 sector">
            <div class="content">
              <h2 class="title">Карьерный рост, Опыт</h2>
              <ul class="career-list timeline-list">
                <li class="career timeline-li" v-for="career in resume.career" :key="resume.career.indexOf(career)">
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

          <hr class="break" />

          <!------------------ SECTOR 13 ------------------->

          <div class="resume-sector-13 sector">
            <div class="content">
              <h2 class="title">Гражданство, время в пути до работы</h2>
              <div class="content">
                <p class="user-citizenship text-block">
                  Гражданство:
                  <span v-for="citizenship in resume.citizenship" :key="citizenship">
                    {{ citizenship }}{{ resume.citizenship.indexOf(citizenship) + 1 != resume.citizenship.length ? "," : null }}
                  </span>
                </p>
                <p class="user-workPermission text-block">
                  Разрешение на работу:
                  <span v-for="work in resume.workPermission" :key="work">
                    {{ work }}{{ resume.workPermission.indexOf(work) != resume.citizenship.length ? ", " : null }}
                  </span>
                </p>
                <p class="user-workPermission text-block">Желательное время в пути до работы: {{ ResumeOptions.travel[resume.travel] }}</p>
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
                <a-select v-model:value="langOptionsValue" :options="langOptions" :getPopupContainer="antParentNode"></a-select>
                <div class="top-btns">
                  <button data-title="Download" data-title-top v-html="icons.download"></button>
                  <button data-title="Print" data-title-top v-html="icons.print"></button>
                  <button data-title="Delete" data-title-top v-html="icons.trash"></button>
                </div>
              </div>
              <div class="tools-visibility">
                <a-select v-model:value="visiblityOptionsValue" :options="visiblityOptions" :getPopupContainer="antParentNode"></a-select>
              </div>
            </div>

            <hr class="break" break-left />

            <div class="tools-resume-completion">
              <h2 class="tools-title title">Завершенность резюме</h2>
              <div class="content">
                <div class="tools-diagram">
                  <svg
                    height="100%"
                    width="100%"
                    class="svg-chart"
                    :style="{ strokeDasharray: '315%', strokeDashoffset: (315 / 100) * (100 - completed) + '%' }"
                  >
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
import { defineComponent, Ref } from "vue";
import { ref } from "vue";
import type { SelectProps } from "ant-design-vue";
import { icons, skillsIcons } from "@/shared/assets/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { EditorButtons, Modal } from "@/shared/UI";
import { InfoSection, ContactSection, TripSection, EmploymentSection, SkillsSection, AboutSection, PortfolioSection } from "./ui";
import { antParentNode } from "@/shared/constants";
import { useStore } from "../index";
import { interfaces } from "../index";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Resume",
  components: {
    EditorButtons,
    Modal,
    InfoSection,
    ContactSection,
    TripSection,
    EmploymentSection,
    SkillsSection,
    AboutSection,
    PortfolioSection,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const resume = store.state.resumeList?.find((e) => e.id === route.params.id)!;
    store.state.resume = resume;

    if (!resume) {
      store.dispatch("getResume", route.params.id);
    }

    const { ResumeOptions } = interfaces;

    /**
     * ! --------------------------------------- Resume Tools Codes ---------------------------------------- !
     */

    const langOptionsValue = ref<string>(resume ? resume.langSelected : "");
    const langOptions = ref<SelectProps["options"]>([
      {
        value: "rus",
        label: "Русский",
      },
      {
        value: "eng",
        label: "English",
      },
    ]);

    const visiblityOptionsValue = ref<string>("all");
    const visiblityOptions = ref<SelectProps["options"]>([
      {
        value: "all",
        label: "Видно всем",
      },
      {
        value: "selected_companies",
        label: "Видно выбранным компаниям",
      },
      {
        value: "selected_companies_hidden",
        label: "Скрыто от выбранных компаний",
      },
      {
        value: "only_links",
        label: "Видно только по прямой ссылке",
      },
      {
        value: "none",
        label: "Не видно никому",
      },
    ]);

    /**
     * ! ------------------------------ RESUME EDITING BOOLEAN STATES ---------------------------------- !
     */

    const completed = ref<number>(65);

    const portfolioCheckout = ref<{
      title: string;
      description: string;
      img: string;
    } | null>(null);

    const contactChange = ref<boolean>(false);

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
        this.gender = ref<"M" | "F" | null>(resume.gender);
        this.dob = ref<{ d: number; m: number; y: number }>({
          d: this.date.getDate(),
          m: this.date.getMonth() + 1,
          y: this.date.getFullYear(),
        });
        this.skills = ref<Array<string>>([...resume.skills].map((el) => el.toLocaleLowerCase()));
        this.aboutMe = ref<string>(resume.aboutMe);
        this.contact = ref<Array<{ id: number | string; name: string; value: string; type: string; preferred?: boolean | null }>>(
          resume.contact
        );
      }

      public setFaq() {
        resume.gender = this.gender.value;
        // getAge();
      }

      public setContact(): void {
        contactChange.value = false;
      }

      public cancel(method: string): void {
        const cancelMethods = {
          faq: (): void => {
            resumeData.gender.value = resume["gender"];
          },
          contact: (): void => {
            contactChange.value = false;
          },
        };
        type ObjectKey = keyof typeof cancelMethods;
        const methodName = method as ObjectKey;
        cancelMethods[methodName]();
      }
    }

    const resumeData = new ResumeData();

    /**
     * ! ------------------------------------- OTHER ADDITIONAL STATES --------------------------------------- !
     */

    /**
     * ? ---------------------- BUILT IN VUE METHODS --------------------------- ?
     */

    /**
     * ? ---------------------- RETURNING STATES  AND FUNCTIONS --------------------------- ?
     */

    return {
      resume,
      ResumeOptions,
      langOptionsValue,
      langOptions,
      icons,
      skillsIcons,
      visiblityOptionsValue,
      visiblityOptions,
      completed,
      portfolioCheckout,
      ClassicEditor,
      contactChange,
      antParentNode,
      resumeData,
    };
  },
  /**
   * ? ------------------------------------- OTHER BUILT-IN METHODS --------------------------------------- !
   */
});
</script>
<style>
@import url("./style.scss");
</style>
