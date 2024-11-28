<template>
  <v-card>
    <v-card-title>
      {{ $t('solutions.title') }}
    </v-card-title>
    <v-card-subtitle :style="testResultColor">
      {{
        $t('solutions.brief')
          .replace('%d', testResult.correctAnswers)
          .replace('%d', testResult.totalQuestions)
          .replace('%d', testResult.testAverage)
      }}
    </v-card-subtitle>
    <v-card-text v-if="testIsFinished">
      <v-card
        v-for="(question, questionIndex) in testStore.questions"
        :key="questionIndex"
        elevation="10"
        class="ma-2"
      >
        <v-card-title>
          {{ `${questionIndex + 1}. ${question.title}` }}
        </v-card-title>
        <v-card-text>
          <div
            v-for="(solution, solutionIndex) in question.solutions"
            :key="solution"
            :value="solution"
          >
            <v-icon
              :color="colorForSolution(questionIndex, solutionIndex)"
              :icon="iconForSolution(questionIndex, solutionIndex)"
            ></v-icon>
            {{ solution }}
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-text
      v-if="testIsNotFinished"
      class="text-h4"
    >
      {{ $t('solutions.error') }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="testIsNotFinished"
        @click.stop="goBack"
      >
        {{ $t('solutions.back') }}
      </v-btn>
      <v-btn
        v-if="testIsFinished"
        @click.stop="goHome"
      >
        {{ $t('solutions.start') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import {
  VBtn,
  VCard,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VIcon,
} from 'vuetify/lib/components/index.mjs';
import { useRouter } from 'vue-router';
import { useTestStore } from '../stores/test';

const router = useRouter();
const testStore = useTestStore();

const testIsFinished = ref(
  testStore.test.length > 0 && testStore.countSolutions() === testStore.test.length,
);
const testIsNotFinished = ref(
  testStore.test.length === 0 || testStore.countSolutions() < testStore.test.length,
);

let testResult = {
  totalQuestions: 0,
  correctAnswers: 0,
  testAverage: 0,
};
const testResultColor = computed(() => testResult.testAverage >= 50 ? { color: 'green' } : { color: 'red' });

const iconForSolution = (questionIndex, solutionIndex) => {
  const question = testStore.questions.at(questionIndex);
  if (solutionIndex === question.answer - 1) {
    return '$complete';
  }

  if (testStore.solutions.at(questionIndex) === question.solutions.at(solutionIndex)) {
    return '$close';
  }

  return '';
};

const colorForSolution = (questionIndex, solutionIndex) => {
  const question = testStore.questions.at(questionIndex);
  if (solutionIndex === question.answer - 1) {
    return 'green';
  }

  if (testStore.solutions.at(questionIndex) === question.solutions.at(solutionIndex)) {
    return 'red';
  }

  return '';
};

const goHome = () => {
  router.push('/');
};

const goBack = () => {
  router.back();
};

onBeforeMount(() => {
  if (testIsFinished.value) {
    testResult = testStore.finishTest();
  }
});
</script>
