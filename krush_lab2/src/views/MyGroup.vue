<script setup>
import { ref,shallowRef } from 'vue'

const search = ref('')
const dialog = shallowRef(false)
const isEditing = shallowRef(false)
const DEFAULT_STUDENT = { name: '', birthYear: '', phone: '', email: '' }
const student = ref({...DEFAULT_STUDENT })

const headers = [
  { key: 'name', title: 'ПІП', sortable: true },
  { key: 'birthYear', title: 'Рік народження', sortable: true },
  { key: 'phone', title: 'Телефон', sortable: true },
  { key: 'email', title: 'Email', sortable: true },
  { key: 'actions', title: 'Дії', align: 'end',sortable: false },
]

const students = ref([
  { id: 1, name: 'Круш Ірина Вікторівна', birthYear: 2005, phone: '0671234567', email: 'iryna.krush@oa.edu.ua' },
  { id: 2, name: 'Бондар Анастасія Олегівна', birthYear: 2005, phone: '0937654321', email: 'anastasiia.bondar@oa.edu.ua' },
  { id: 3, name: 'Вікторія Вікторівна Бабаєва', birthYear: 2005, phone: '0731112233', email: 'viktoriia.babaieva@oa.edu.ua' },
  { id: 4, name: 'Дарина Анатоліївна Мельник', birthYear: 2005, phone: '0509876543', email: 'daryna.melnyk@oa.edu.ua' },
  { id: 5, name: 'Анастасія Павлівна Ревко', birthYear: 2005, phone: '0962233445', email: 'anastasiia@oa.edu.ua' },
])
function add() {
  isEditing.value = false
  student.value = {...DEFAULT_STUDENT}
  dialog.value = true
}

function edit(id) {
  isEditing.value = true

  const found = students.value.find(s => s.id === id)

  student.value = {
    id: found.id,
    name: found.name,
    birthYear: found.birthYear,
    phone: found.phone,
    email: found.email,
  }

  dialog.value = true
}

function remove(id) {
  const index = students.value.findIndex(student => student.id === id)
  students.value.splice(index, 1)
}
function save() {
  const { name, birthYear, phone, email } = student.value
  if (!name.trim() || !birthYear || !phone.trim() || !email.trim()) {
    alert('Будь ласка, заповніть усі поля.')
    return
  }
  if (isEditing.value) {
    const index = students.value.findIndex(s => s.id === student.value.id)
    students.value[index] = student.value
  } else {
    student.value.id = students.value.length + 1
    students.value.push(student.value)
  }

  dialog.value = false
}


</script>

<template>
  <v-card flat class="mt-6">
    <v-toolbar flat>
      <v-toolbar-title class="text-h6">
        <v-icon icon="mdi-account-group" start class="me-2"></v-icon>
        Моя група
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
          class="me-2"
          prepend-icon="mdi-plus"
          rounded="lg"
          text="Додати студента"
          border
          @click="add"
      ></v-btn>
    </v-toolbar>
    <v-text-field
        v-model="search"
        label="Пошук"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class=" mt-3"
    ></v-text-field>

    <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
        class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon icon="mdi-pencil" size="small" @click="edit(item.id)" color="primary"></v-icon>
          <v-icon icon="mdi-delete" size="small" @click="remove(item.id)" color="red"></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="dialog" max-width="500">
    <v-card :title="isEditing ? 'Редагувати студента' : 'Додати студента'">
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="student.name" label="ПІП"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="student.birthYear" label="Рік народження" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="student.phone" label="Телефон"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="student.email" label="Email"></v-text-field>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text="Скасувати" variant="plain" @click="dialog = false"></v-btn>
        <v-spacer></v-spacer>
        <v-btn text="Зберегти" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>