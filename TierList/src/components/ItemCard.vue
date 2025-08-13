<template>
  <div 
    class="item-card"
    draggable="true"
    @dragstart="onDragStart"
  >
    <img 
      v-if="image" 
      :src="image" 
      :alt="title" 
      draggable="false"
      class="item-card__image"
    />
    <div class="item-card__title">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  image?: string
  id: string | number
  rowLabel: string
  index: number
}

const props = defineProps<Props>()

const onDragStart = (event: DragEvent) => {
  if (!event.dataTransfer) return
  event.dataTransfer.setData('application/json', JSON.stringify({
    id: props.id,
    sourceLabel: props.rowLabel,
    sourceIndex: props.index
  }))
}
</script>

<style scoped lang="scss">
.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 6px;
  border-radius: 8px;
  cursor: grab;

  &__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 4px;
  }

  &__title {
    font-size: var(--text-m);
    color: var(--text-primary);
    text-align: center;
    word-break: break-word;
  }
}
</style>
