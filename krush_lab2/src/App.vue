<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>

      <v-list-item  prepend-icon="mdi-format-list-checks" title="List" to="/about"></v-list-item>
      <v-list-item  prepend-icon="mdi-account-box" title="Contacts" to="/contacts"></v-list-item>
    </v-navigation-drawer>

<!--    <v-app-bar >-->
<!--      <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>-->

<!--      <v-app-bar-title>Application</v-app-bar-title>-->
<!--    </v-app-bar>-->
    <v-app-bar
        app
        fixed
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Application</v-app-bar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
<!--      <slot></slot>-->
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
</script>

<!--<script>-->
<!--export default {-->
<!--  data: () => ({ drawer: null }),-->
<!--}-->
<!--</script>-->