interface iResume {
  title: string;
  updated: string;
  views: Array<string>;
  invitation: Array<string>;
}

export type { iResume };

const months: any = {
  rus: ["Январья", "Февралья", "Марта", "Апрелья", "Мая", "Июнья", "Июлья", "Августа", "Сентябрья", "Октябрья", "Ноябрья", "Декабрья"],
  eng: ["January", "February", "March", "April", "May", "June", "July", "Augues", "September", "October", "November", "December"],
};

export { months };

const ResumeOptions: any = {
  employment: {
    part: "Частичная занятость",
    full: "Полная занятость",
    project: "Проектная работа",
    volunteer: "Волонтерство",
    probation: "Стажировка",
  },
  schedule: {
    full: "Полный день",
    shift: "Сменный график",
    flexible: "Гибкий график",
    remote: "Удаленная работа",
    fly: "Вахтовый метод",
  },
  educationDegree: {
    secondary: "Среднее",
    special_secondary: "Среднее специальное",
    unfinished_higher: "Неоконченное высшее",
    higher: "Высшее",
    bachelor: "Бакалавр",
    master: "Магистр",
    candidate: "Кандидат наук",
    doctor: "Доктор наук",
  },
  languagesLevel: {
    a1: "A1 — Начальный",
    a2: "A2 — Элементарный",
    b1: "B1 — Средний",
    b2: "B2 — Средне-продвинутый",
    c1: "C1 — Продвинутый",
    c2: "C2 — В совершенстве",
  },
  travel: {
    any: "Не имеет значения",
    1: "Не более часа",
    "1.30": "Не более полутора часов",
  },
};

export { ResumeOptions };

export interface iUserResume {
  userName: string;
  gender: "M" | "F" | null;
  img: string;
  dob: string;
  contact: Array<{ id: number | string; name: string; value: string; type: string; preferred?: boolean | null }>;
  city: string | null;
  move: boolean | null;
  bTrip: boolean | null;
  position: string;
  specialization: Array<string>;
  salary: number | null;
  currency: string;
  employment: string;
  schedule: string;
  skills: Array<string>;
  aboutMe: string;
  portfolio: Array<{
    title: string;
    description: string;
    img: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    faculty: string;
    specialization: string;
    graduatedAt: string;
    location: string;
  }>;
  motherLang: string;
  languages: Array<{ name: string; level: string }>;
  courses: Array<{
    name: string;
    organization: string;
    specialization: string;
    graduatedAt: string;
    location: string;
  }>;
  certificates: Array<{ name: string; img: string }>;
  career: Array<{
    year: string;
    name: string;
    description: string;
  }>;
  citizenship: Array<string>;
  workPermission: Array<string>;
  travel: string;
  car: string;
  langSelected: string;
}
