<template>
  <v-card>
    <v-card-title>
      {{ cardTitle }}
    </v-card-title>
    <v-card-subtitle>
      {{ cardSubtitle }}
    </v-card-subtitle>
    <v-card-text>
      <v-radio-group
        :model-value="selectedSolution"
        class="mt-4"
        :mandatory="true"
        :label="$t('questions.solutions')"
        @update:model-value="solutionUpdated"
      >
        <!-- Crear un v-radio per a cada element de l'array -->
        <v-radio
          v-for="(solution, index) in solutions"
          :key="index"
          :label="solution"
          :value="solution"
        />
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :disabled="isFirstQuestion"
        @click.stop="previousQuestion"
      >
        {{ $t('questions.previous') }}
      </v-btn>
      <v-btn
        :disabled="isLastQuestion"
        @click.stop="nextQuestion"
      >
        {{ $t('questions.next') }}
      </v-btn>
      <v-btn
        :disabled="cannotFinishTest"
        @click.stop="finishTest"
      >
        {{ $t('questions.finish') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed, ref, onBeforeMount, onBeforeUpdate } from 'vue';
import {
  VBtn,
  VCard,
  VCardActions,
  VCardTitle,
  VCardText,
  VCardSubtitle,
  VRadioGroup,
  VRadio,
} from 'vuetify/lib/components/index.mjs';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useTestStore } from '../stores/test';

const route = useRoute();
const queryQuestion = ref(0);
const questionToTest = ref({});
const selectedSolution = ref('');

const { t: $t } = useI18n();
const router = useRouter();
const testStore = useTestStore();

const cardTitle = computed(() =>
  questionToTest.value.title
    ? questionToTest.value.title
    : $t('questions.error').replace('%d', queryQuestion.value),
);

const cardSubtitle = computed(() =>
  $t('questions.counter').replace('%d', queryQuestion.value).replace('%d', testStore.test.length),
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

const isFirstQuestion = computed(() => queryQuestion.value === 1);
const isLastQuestion = computed(() => queryQuestion.value === testStore.test.length);
const cannotFinishTest = computed(() => {
  if (testStore.test.length === 0) {
    return false;
  }
  return testStore.countSolutions() < testStore.test.length;
});

const previousQuestion = () => {
  router.push(`test?question=${queryQuestion.value - 1}`);
};

const nextQuestion = () => {
  router.push(`test?question=${queryQuestion.value + 1}`);
};

const finishTest = () => {
  router.push('solutions');
};

const solutionUpdated = (solution) => {
  testStore.setSolution(queryQuestion.value, solution);
  selectedSolution.value = solution;
};

const parseParams = async () => {
  const { question } = route.query;
  const questionNumber = parseInt(question, 10);

  if (questionNumber > 0 && questionNumber <= testStore.test.length) {
    queryQuestion.value = questionNumber;
    questionToTest.value = testStore.getQuestion(questionNumber);
    selectedSolution.value = testStore.getSolution(questionNumber);
  } else {
    router.push('/');
  }
};

onBeforeMount(() => parseParams());
onBeforeUpdate(() => parseParams());
</script>
