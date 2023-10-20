<template>
  <div class="resume-sector-2 sector" v-if="resume.contact">
    <div class="content">
      <h4 class="title">Контакты</h4>
      <ul>
        <li v-for="(contact, index) in data.array" :key="index">
          <div class="content">
            <div class="contact">
              <span class="contact-name">{{ contact.name }}</span
              >:
              <a class="contact-link" :href="contact.type + contact.value" :target="contact.type !== 'tel:' ? '_blank' : ''">{{
                contact.value
              }}</a>
              <span class="text-block" v-if="contact.preferred"> — предпочитаемый способ связи</span>
            </div>
            <div class="todo-editor" v-if="editing">
              <button v-html="icons.trash" class="editor-button" @click="data.delete(contact)"></button>
              <button v-html="icons.edit" class="editor-button" @click="setModalContent(contact)"></button>
              <button v-html="icons.chevronUp" class="editor-button" @click="data.move(contact, '<')"></button>
              <button v-html="icons.chevronDown" class="editor-button" @click="data.move(contact, '>')"></button>
            </div>
          </div>
        </li>
        <li v-if="editing">
          <button class="custom-btn" size="small" @click="addContact()">
            <p text>Добавить еще</p>
            <div v-html="icons.plus" icon></div>
          </button>
        </li>
      </ul>
      <!--  -->
      <Modal v-if="modal && modalContent" :open="modal" @onClose="modalClose()" :title="'Контакт'">
        <div class="modal-content">
          <a-row :gutter="10">
            <a-col flex="100px">
              <h4 class="input-subtitle input-subtitle-margin">Название</h4>
              <a-input v-model:value="modalContent.name" placeholder="Название"></a-input>
            </a-col>
            <a-col flex="auto">
              <h4 class="input-subtitle input-subtitle-margin">Ссылка на сайт</h4>
              <a-input v-model:value="modalContent.value" placeholder="Ссылка"></a-input>
            </a-col>
          </a-row>

          <div>
            <h4 class="input-subtitle input-subtitle-margin">Тип связи</h4>
            <a-select
              :options="[
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
                },
              ]"
              style="width: 100%"
              v-model:value="modalContent.type"
            ></a-select>
          </div>

          <a-row :gutter="10" :align="'middle'">
            <a-col>
              <h4 class="input-subtitle">Предпочтительный вид связи</h4>
            </a-col>
            <a-col>
              <a-switch v-model:checked="modalContent.preferred"></a-switch>
            </a-col>
          </a-row>

          <a-row justify="end" :gutter="5">
            <a-col>
              <button class="custom-btn btn-unrounded" style="width: 90px" @click="modalSave()">Save</button>
            </a-col>
            <a-col>
              <button class="custom-btn btn-unrounded" white style="width: 90px" @click="modalCancel()">Cancel</button>
            </a-col>
          </a-row>
        </div>
      </Modal>
      <!--  -->
    </div>
    <!-- EDITING -->
    <button class="resume-editor-link" @click="editing = true" v-if="!editing">Редактировать</button>
    <EditorButtons v-if="editing" @save="saveData()" @cancel="cancelData()" />
  </div>
</template>

<script lang="ts">
import { useStore } from "../../index";
import { UseTodo } from "@/hooks";
import { icons } from "@/shared/assets/icons";
import { EditorButtons } from "@/shared/UI";
import { Modal } from "@/shared/UI";
import { defineComponent, ref } from "vue";

interface ContactType {
  id: number;
  name: string;
  value: string;
  type: string;
  preferred: boolean;
}

export default defineComponent({
  components: {
    Modal,
    EditorButtons,
  },
  setup() {
    const store = useStore();
    const resume = store.state.resume;

    const editing = ref<boolean>(false);

    const data = ref<UseTodo>(new UseTodo([...resume.contact]));
    const modal = ref<boolean>(false);
    const modalContent = ref<ContactType | null>(null);
    const editingItem = ref<ContactType | null>(null);

    function setModalContent(contact: ContactType) {
      modal.value = true;
      editingItem.value = contact;
      modalContent.value = { ...contact };
    }

    function modalSave() {
      if (editingItem.value && data.value.array.includes(editingItem.value)) {
        Object.assign(editingItem.value, modalContent.value);
        modal.value = false;
        editingItem.value = null;
      } else {
        data.value.array.push(modalContent.value);
        modal.value = false;
        editingItem.value = null;
      }
    }

    function modalClose() {
      modal.value = false;
      editingItem.value = null;
    }

    function addContact() {
      modal.value = true;
      modalContent.value = { id: 0, name: "", value: "", type: "", preferred: false };
    }

    function modalCancel() {
      modalClose();
      modalContent.value = null;
    }

    function cancelData(): void {
      editing.value = false;
      data.value = new UseTodo([...resume.contact]);
    }

    function saveData() {
      resume.contact = data.value.array;
      editing.value = false;
    }

    return {
      resume,
      editing,
      data,
      icons,
      modal,
      modalContent,
      editingItem,
      setModalContent,
      modalSave,
      modalClose,
      addContact,
      modalCancel,
      cancelData,
      saveData,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/shared/assets/style.scss";

.resume-sector-2 {
  ul {
    li {
      margin: 10px 0;
      .content {
        display: flex;
        align-items: center;
        column-gap: 12px;

        .contact {
          .contact-name {
            text-transform: capitalize;
            @include text();
          }

          .contact-link {
            @include text();
            @include link-style();
            font-size: calc(var(--paragraph-size) - 1px);

            &:hover {
              color: rgb(216, 0, 0);
            }
          }
        }
      }
    }
  }
}
</style>
