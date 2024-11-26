import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import aposeParser from '../lib/apose-parser';

export const useTestStore = defineStore('test', {
  state: () => ({
    source: useLocalStorage('testSource', ''),
    questions: useLocalStorage('testQuestions', []),
    error: '',
    test: [],
  }),
  actions: {
    updateTestSource(source) {
      this.source = source;
    },
    resetTest() {
      this.questions = [];
      this.solutions = [];
      this.test = [];
      this.error = '';
    },
    parseTest() {
      try {
        this.questions = aposeParser(this.source);
        this.test = [];
        this.error = '';
      } catch (err) {
        this.error = err.message;
      }
    },
    startTest() {
      this.test = [...this.questions];
      for (let i = this.test.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.test[i], this.test[j]] = [this.test[j], this.test[i]];
      }
      this.solutions.push(...new Array(this.test.length).fill(''));
    },
    testQuestion(questionNumber) {
      if (questionNumber < this.test.length || questionNumber > this.test.length) {
        return {};
      }
      return this.test.at(questionNumber - 1);
    },
    testSolution(questionNumber, solution) {
      if (questionNumber > 0 && questionNumber <= this.solutions.length) {
        this.solutions[questionNumber - 1] = solution;
      }
    },
  },
});

export default useTestStore;
