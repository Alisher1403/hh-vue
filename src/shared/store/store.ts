import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { iUserResume } from "./interfaces";

export interface State {
  searchBox: boolean;
  recommendedVacancies: Array<string>;
  resume: iUserResume;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    searchBox: false,
    recommendedVacancies: ["1", "23", "56"],
    resume: {
      userName: "Чинбердиев Алишер Акромович",
      gender: "M",
      img: "https://assets-global.website-files.com/59ace8427353c50001765cbd/6189aa757999e3f29d06daad_p-hero-image.svg",
      dob: 1047582000000,
      contact: [
        {
          id: 1,
          name: "phone",
          value: "+998 (97) 777-31-91",
          type: "tel:",
          preferred: false,
        },
        {
          id: 2,
          name: "gmail",
          value: "alisherchinberdiyev1403@gmail.com",
          type: "mailto:",
          preferred: true,
        },
        {
          id: 3,
          name: "telegram",
          value: "https://t.me/alisher2552",
          type: "",
          preferred: false,
        },
      ],
      city: "Ташкент",
      move: "impossible",
      bTrip: "never",
      position: "Front-end Developer",
      specialization: ["Программист", "разработчик"],
      salary: 400,
      currency: "usd",
      employment: "part",
      schedule: "flexible",
      skills: [
        "html",
        "css3",
        "javascript-js",
        "typescript-ts",
        "sass",
        "git",
        "vue",
        "react",
        "angular",
        "c#",
        "c",
        "c++",
        "redux",
        "vuex",
        "react-router-dom react router",
        "java",
        "kotlin",
        "swift",
        "laravel",
        "php",
        "sql",
        "mysql",
        "postgresql",
        "vue-router",
      ],
      aboutMe: `- Привет, меня зовут Алишер и я студент 4го курса в Сингапурском Университете. Здесь я 3 года изучал основы программирования.`,
      portfolio: [
        {
          title: "My Project",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          img: "https://colorlib.com/wp-content/uploads/sites/2/library-website-design-1.jpg",
        },
        {
          title: "My Vue Project",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          img: "https://colorlib.com/wp/wp-content/uploads/sites/2/portfolio-website-builders.jpg",
        },
        {
          title: "My React Project",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          img: "https://cdn.dribbble.com/userupload/4060584/file/original-a2dcb88a24da79db509636a26cd98052.png?resize=400x0",
        },
        {
          title: "My React Project, lorem ipsum dolor site amet",
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
          img: "https://i.pinimg.com/564x/2d/a5/bf/2da5bff0fa28e5256b1f22a15c3ba70b.jpg",
        },
      ],
      education: [
        {
          degree: "bachelor",
          institution: "MDIS Tashkent",
          faculty: "Computer Information",
          specialization: "IT",
          graduatedAt: "2024",
          location: "Uzbekistan, Tashkent",
        },
        {
          degree: "bachelor",
          institution: "MDIS Tashkent",
          faculty: "Computer Information",
          specialization: "IT",
          graduatedAt: "2024",
          location: "Uzbekistan, Tashkent",
        },
      ],
      motherLang: "Uzbek",
      languages: [
        {
          name: "english",
          level: "b2",
        },
        {
          name: "russian",
          level: "b1",
        },
      ],
      courses: [
        {
          name: "Web Development",
          organization: "Proweb",
          specialization: "Frontend",
          graduatedAt: "2023",
          location: "Uzbekistan, Tashkent",
        },
        {
          name: "Python Programming",
          organization: "Proweb",
          specialization: "Backend",
          graduatedAt: "2023",
          location: "Uzbekistan, Tashkent",
        },
      ],
      certificates: [
        {
          name: "MDIS Tashkent",
          img: "https://edit.org/images/cat/diplomas-certificates-big-2020042416.jpg",
        },
        {
          name: "Proweb",
          img: "https://img.freepik.com/premium-vector/diploma-certificate-template_23-2148569141.jpg",
        },
      ],
      career: [
        {
          year: "2014",
          name: "First Programming",
          description: "The first computer programming course I have, there I learnt basics of Microsoft Office Applications",
        },
        {
          year: "2020",
          name: "Mdis Tashkent entrance",
          description: "The first computer programming course I have, there I learnt basics of Microsoft Office Applications",
        },
        {
          year: "2023",
          name: "Prowen Edicaton Center",
          description: "The first computer programming course I have, there I learnt basics of Microsoft Office Applications",
        },
      ],
      citizenship: ["Узбекистан"],
      workPermission: ["Узбекистан", "Россия"],
      travel: "1.30",
      car: "",
      langSelected: "rus",
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
