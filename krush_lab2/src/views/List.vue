<script setup lang="ts">
import { ref } from 'vue'

// Список покупок: три елементи з id та title
const shoppingList = ref([
  { id: 1, title: 'Житній хліб', bought: false},
  { id: 2, title: 'Молоко', bought: false },
  { id: 3, title: 'Яйця', bought: false },
])

const selectedItems  = ref([])

// Поле введення назви нового елемента
const newItemTitle = ref('')

// Метод для перемикання стану "куплено"
function doneBought(id: number) {
  const item = shoppingList.value.filter(el => el.id === id)[0]
  item.bought = !item.bought
}

// Метод для видалення елемента зі списку
function deleteItem(id: number) {
  shoppingList.value = shoppingList.value.filter(item => item.id !== id)
}

// Метод для додавання нового елемента
function addNewItem() {
  if (newItemTitle.value.trim() === '') return
  const newId = Math.max(0, ...shoppingList.value.map(item => item.id)) + 1
  shoppingList.value.push({
    id: newId,
    title: newItemTitle.value,
    bought: false,
  })
  newItemTitle.value = ''
}
</script>

<template>

  <!-- Поле введення нового елемента -->
  <v-text-field
      v-model="newItemTitle"
      label="Нова покупка"
      append-icon="mdi-plus"
      clearable
      @click:append="addNewItem"
      @keyup.enter="addNewItem"
  />

  <v-list
  v-model:selected="selectedItems"
      select-strategy="leaf"
  >
    <div v-for="(item, index) in shoppingList" :key="item.id">
    <v-list-item
        :title="item.title"
        :value="item.id"
        @click="doneBought(item.id)"
        :class="{ 'blue lighten-5': item.bought }"
    >
      <template v-slot:prepend>
        <v-list-item-action start>
          <v-checkbox-btn :input-value="item.bought"></v-checkbox-btn>
        </v-list-item-action>
      </template>

      <template v-slot:title>
        <v-list-item-title :class="{ 'text-decoration-line-through': item.bought }">
          {{ item.title }}
        </v-list-item-title>
      </template>

      <template v-slot:append>
        <v-list-item-action end>
          <v-btn icon @click.stop="deleteItem(item.id)">
            <i class="mdi mdi-delete"></i>
          </v-btn>
        </v-list-item-action>
      </template>

    </v-list-item>
      <v-divider v-if="index < shoppingList.length - 1" />
    </div>
  </v-list>
</template>
