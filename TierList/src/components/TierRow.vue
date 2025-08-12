<template>
  <div class="tier-row" 
       :style="{ backgroundColor: transparentize(colorTier) }" 
       @dragover.prevent="onDragOver"
       @drop="onDrop"
  >
    <div class="tier-label" :style="{ backgroundColor: colorTier }">{{ label }}</div>
    <div class="tier-content" ref="contentRef">
      <ItemCard
        v-for="(item, index) in items"
        :key="item.id"
        :title="item.title"
        :image="item.image"
        :id="item.id"
        :row-label="label"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ItemCard from './ItemCard.vue'

interface TierItem {
  id: string | number
  title: string
  image?: string
}

interface Props {
  label: string
  items: TierItem[]
  colorTier: string
}

function transparentize(color: string, alpha = 0.2): string {
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
  }
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return color
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'dropItem', payload: { id: string | number; sourceLabel: string; targetLabel: string; targetIndex: number }): void
}>()

const contentRef = ref<HTMLElement | null>(null)
let dragOverIndex = -1

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (!contentRef.value) return

  const children = Array.from(contentRef.value.children)
  const x = event.clientX

  dragOverIndex = children.findIndex(child => {
    const rect = (child as HTMLElement).getBoundingClientRect()
    return x < rect.left + rect.width / 2
  })

  if (dragOverIndex === -1) dragOverIndex = children.length
}

function onDrop(event: DragEvent) {
  if (!event.dataTransfer) return
  try {
    const data = JSON.parse(event.dataTransfer.getData('application/json'))
    emit('dropItem', {
      id: data.id,
      sourceLabel: data.sourceLabel,
      targetLabel: props.label,
      targetIndex: dragOverIndex
    })
    dragOverIndex = -1
  } catch (e) {
    console.error('Error parsing drop data', e)
  }
}
</script>


<style scoped lang="scss">
.tier-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--element-bg);

  .tier-label {
    color: #ffffff;
    font-weight: bold;
    padding: 8px;
    width: 60px;
    text-align: center;
    flex-shrink: 0;
  }

  .tier-content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px;
    min-height: 100px;
  }
}
</style>
