<template>
  <v-card>
    <v-card-title>
      {{ cardTitle }}
    </v-card-title>
    <v-card-text>
      <v-select
        :model-value="selectedSolution"
        :items="solutions"
        :label="$t('questions.solutions')"
        @update:model-value="solutionUpdated"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, ref, onBeforeMount } from 'vue';
import { VCard, VCardTitle, VCardText, VSelect } from 'vuetify/lib/components/index.mjs';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useTestStore } from '../stores/test';

const route = useRoute();
const queryQuestion = ref(0);
const questionToTest = ref({});
const selectedSolution = ref('');

const { t: $t } = useI18n();
// const router = useRouter();
const testStore = useTestStore();

const cardTitle = computed(() =>
  questionToTest.value.title
    ? questionToTest.value.title
    : $t('questions.error').replace('%d', queryQuestion.value),
);

const solutions = computed(() => {
  if (questionToTest.value.solutions) {
    const shuffledSolutions = [...questionToTest.value.solutions];
    for (let i = shuffledSolutions.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSolutions[i], shuffledSolutions[j]] = [shuffledSolutions[j], shuffledSolutions[i]];
    }
    return shuffledSolutions;
  }

  return [];
});

const solutionUpdated = (solution) => {
  testStore.testSolution(queryQuestion.value, solution);
  selectedSolution.value = solution;
};

const parseParams = async () => {
  const { question } = route.query;

  queryQuestion.value = question;
  questionToTest.value = testStore.testQuestion(question);

  if (questionToTest.value.title === undefined) {
    queryQuestion.value = 0;
  }
};

onBeforeMount(() => parseParams());
</script>
