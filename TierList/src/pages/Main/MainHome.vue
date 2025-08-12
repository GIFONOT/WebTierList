<template>
  <div class="tier-list">
    <TierRow
      v-for="row in rows"
      :key="row.label"
      :label="row.label"
      :items="row.items"
      :color-tier="row.color"
      @dropItem="handleDrop"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TierRow from '@components/TierRow.vue'


interface Item {
  id: string | number
  title: string
  image?: string
}

interface Row {
  label: string
  color: string
  items: Item[]
}

const rows = reactive<Row[]>([
  {
    label: 'S',
    color: 'rgb(218, 97, 92)',
    items: [
      { id: 1, title: 'Death Stranding 2', image: '/ds2.avif' },
      { id: 2, title: 'Elden Ring', image: '/eldenring.png' },
      { id: 4, title: 'TLOU2', image: '/tlou2.png' },
      { id: 5, title: 'God of War Ragnarök', image: '/gw2.png' },
      { id: 6, title: 'TLOU1', image: '/tlou1.png' },
      { id: 9, title: 'The Witcher 3: Wild Hunt', image: '/w3.png' },
    ],
  },
  {
    label: 'A',
    color: 'rgb(229, 156, 90)',
    items: [{ id: 3, title: 'Sekiro', image: '/Sekiro.png' },],
  },
  {
    label: 'B',
    color: 'rgb(85, 172, 105)',
    items: [],
  },
])

const handleDrop = (payload: { id: string | number; sourceLabel: string; targetLabel: string; targetIndex: number }) => {
  if (payload.sourceLabel === payload.targetLabel) {
    // Перемещение внутри одного ряда
    const row = rows.find(r => r.label === payload.sourceLabel)
    if (!row) return
    const currentIndex = row.items.findIndex(item => item.id === payload.id)
    if (currentIndex === -1) return
    const [movedItem] = row.items.splice(currentIndex, 1)
    row.items.splice(payload.targetIndex, 0, movedItem)
  } else {
    // Перемещение между разными рядами
    const sourceRow = rows.find(r => r.label === payload.sourceLabel)
    const targetRow = rows.find(r => r.label === payload.targetLabel)
    if (!sourceRow || !targetRow) return

    const currentIndex = sourceRow.items.findIndex(item => item.id === payload.id)
    if (currentIndex === -1) return
    const [movedItem] = sourceRow.items.splice(currentIndex, 1)
    targetRow.items.splice(payload.targetIndex, 0, movedItem)
  }
}

</script>

<style scoped lang="scss">
.tier-list {
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 10px;
}
</style>
