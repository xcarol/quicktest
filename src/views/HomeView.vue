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
    <v-card-text>
      {{ testCheckResult }}
    </v-card-text>
    <v-card-actions>
      <v-btn @click.stop="checkTest">
        {{ $t('test.check') }}
      </v-btn>
      <v-btn
        :disabled="canStartTest"
        @click.stop="startTest"
      >
        {{ $t('test.start') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VTextarea,
} from 'vuetify/lib/components/index.mjs';
import { useI18n } from 'vue-i18n';
import { useTestStore } from '../stores/test';

const { t: $t } = useI18n();
const testStore = useTestStore();

const testContent = ref('');
const testCheckResult = computed(() => {
  if (testStore.error.length) {
    return testStore.error;
  }
  if (testStore.questions.length) {
    return $t('test.testFound').replace('%d', testStore.questions.length);
  }
  return $t('test.noTestFound');
});

const canStartTest = computed(() => testStore.questions.length === 0);

const checkTest = () => {
  testStore.updateTestSource(testContent.value);
  testStore.parseTest();
};

const startTest = () => {
  console.log('vamosallano');
};

onBeforeMount(() => {
  testContent.value = testStore.source;
});
</script>
