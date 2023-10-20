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

const getOptionsValue: any = {
  move: {
    impossible: "Не готов к переезду",
    possible: "Готов к переезду",
    desirable: "Желательный переезд",
  } as any,
  bTrip: {
    never: "Не готов к командировкам",
    ready: "Готов к командировкам",
    sometimes: "Иногда готов к командировкам",
  } as any,
  currencies: {
    usd: "$",
    sum: "сум",
    rub: "₽",
    eur: "€",
  } as any,
};

const ResumeOptions: any = {
  employment: {
    part: "Частичная занятость",
    full: "Полная занятость",
    project: "Проектная работа",
    volunteer: "Волонтерство",
    probation: "Стажировка",
  } as any,
  schedule: {
    full: "Полный день",
    shift: "Сменный график",
    flexible: "Гибкий график",
    remote: "Удаленная работа",
    fly: "Вахтовый метод",
  } as any,
  educationDegree: {
    secondary: "Среднее",
    special_secondary: "Среднее специальное",
    unfinished_higher: "Неоконченное высшее",
    higher: "Высшее",
    bachelor: "Бакалавр",
    master: "Магистр",
    candidate: "Кандидат наук",
    doctor: "Доктор наук",
  } as any,
  languagesLevel: {
    a1: "A1 — Начальный",
    a2: "A2 — Элементарный",
    b1: "B1 — Средний",
    b2: "B2 — Средне-продвинутый",
    c1: "C1 — Продвинутый",
    c2: "C2 — В совершенстве",
  } as any,
  travel: {
    any: "Не имеет значения",
    1: "Не более часа",
    "1.30": "Не более полутора часов",
  } as any,
  move: {
    impossible: "Невозможен",
    possible: "Возможен",
    desirable: "Желателен",
  },
  bTrip: {
    never: "Никогда",
    ready: "Готов",
    sometimes: "Иногда",
  } as any,
};

export { ResumeOptions, months, getOptionsValue };

export interface iUserResume {
  userName: string;
  gender: "M" | "F" | null;
  img: string;
  dob: number;
  contact: Array<{ id: number | string; name: string; value: string; type: string; preferred?: boolean | null }>;
  city: string | null;
  move: string;
  bTrip: string;
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
