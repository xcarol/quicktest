<template>
  <v-card>
    <v-card-title>{{ $t('global.title') }}</v-card-title>
    <v-card-text>
      {{ $t('test.testInputDescription') }}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://products.aspose.ai/total/es/ai-quiz-maker/pdf"
        >ASPOSE</a
      >
    </v-card-text>
    <v-card-text>
      <v-textarea
        v-model="testContent"
        :label="$t('test.content')"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="secondary"
        @click.stop="startTest"
      >
        {{ $t('test.start') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VTextarea,
} from 'vuetify/lib/components/index.mjs';

const testContent = ref('');

const startTest = () => {};
</script>
