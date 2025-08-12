<template>
  <button @click="toggleTheme()">theme</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}
function applyTheme() {
  if (isDark.value) {
    document.body.classList.add('dark')
    document.documentElement.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
    document.documentElement.classList.remove('dark')
  }
}
</script>