<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <h2>Добавить новый элемент</h2>
      <form @submit.prevent="onSubmit">
        <label>
          Название:
          <input v-model="title" type="text" required maxlength="100" />
        </label>

        <label>
          Картинка:
          <input type="file" accept="image/*" @change="onFileChange" />
        </label>

        <div v-if="imagePreview" class="preview">
          <img :src="imagePreview" alt="Превью" />
          <button type="button" @click="removeImage">Удалить</button>
        </div>

        <div class="buttons">
          <button type="submit" :disabled="!title">Добавить</button>
          <button type="button" @click="close">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', payload: { title: string; imageFile: File | null }): void
  (e: 'close'): void
}>()

const title = ref('')
const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) {
    imageFile.value = null
    imagePreview.value = null
    return
  }
  const file = target.files[0]
  imageFile.value = file

  const reader = new FileReader()
  reader.onload = () => {
    imagePreview.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = null
}

function onSubmit() {
  emit('submit', { title: title.value.trim(), imageFile: imageFile.value })
  resetForm()
}

function close() {
  resetForm()
  emit('close')
}

function resetForm() {
  title.value = ''
  imageFile.value = null
  imagePreview.value = null
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: var(--element-bg);
  padding: 24px;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

  h2 {
    margin-bottom: 16px;
    color: var(--text-primary);
    text-align: center;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    color: var(--text-primary);
    font-weight: 500;

    input[type='text'],
    input[type='file'] {
      margin-top: 6px;
      padding: 6px 8px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--bg);
      color: var(--text-primary);
      font-size: 14px;
      outline: none;

      &:focus {
        border-color: var(--accent);
        box-shadow: 0 0 4px var(--accent);
      }
    }
  }

  .preview {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 6px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    button {
      padding: 4px 8px;
      background: var(--ok);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background: davar(--ok);
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;

    button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 600;

      &:first-child {
        background: var(--accent);
        color: white;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      &:last-child {
        background: var(--border);
        color: var(--text-primary);
      }
    }
  }
}
</style>
