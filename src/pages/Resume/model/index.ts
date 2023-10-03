import { Ref, ref } from "vue";

export class ResumeData {
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