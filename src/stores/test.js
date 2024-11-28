import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import aposeParser from '../lib/apose-parser';

export const useTestStore = defineStore('test', {
  state: () => ({
    source: useLocalStorage('testSource', ''),
    questions: useLocalStorage('testQuestions', []),
    solutions: [],
    test: [],
    error: '',
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
    finishTest() {
      let correctAnswers = 0;
      let testAverage = 1;

      if (this.test.length) {

        let testIndex = 0;
        for (let questionIndex = 0; questionIndex < this.solutions.length; questionIndex += 1) {
          const question = this.questions[questionIndex];
          for (; testIndex < this.test.length; testIndex += 1) {
            const test = this.test[testIndex];
            if (test.title === question.title) {
              [this.solutions[questionIndex], this.solutions[testIndex]] = [
                this.solutions[testIndex],
                this.solutions[questionIndex],
              ];
            }
          }
        }
        
        for (let questionIndex = 0; questionIndex < this.questions.length; questionIndex += 1) {
          const question = this.questions[questionIndex];

          if (this.solutions.at(questionIndex) === question.solutions.at(question.answer - 1)) {
            correctAnswers += 1;
          }
        }

        testAverage = (correctAnswers / this.test.length) * 100;
      }

      return {
        totalQuestions: this.test.length,
        correctAnswers,
        testAverage,
      };
    },
    getQuestion(questionNumber) {
      if (questionNumber <= 0 || questionNumber > this.test.length) {
        return {};
      }
      return this.test.at(questionNumber - 1);
    },
    setSolution(questionNumber, solution) {
      if (questionNumber > 0 && questionNumber <= this.solutions.length) {
        this.solutions[questionNumber - 1] = solution;
      }
    },
    getSolution(questionNumber) {
      if (questionNumber > 0 && questionNumber <= this.solutions.length) {
        return this.solutions[questionNumber - 1];
      }
      return '';
    },
    countSolutions() {
      return this.solutions.filter((value) => value !== '').length;
    },
  },
});

export default useTestStore;
