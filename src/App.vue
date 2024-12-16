<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { VApp, VMain } from 'vuetify/lib/components/index.mjs';
import { useTestStore } from './stores/test';

const testStore = useTestStore();
onBeforeMount(async () => testStore.initializeTests());
</script>
