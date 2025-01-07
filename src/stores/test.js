/* eslint-disable import/no-unresolved */
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import textParser from '../lib/parser';

export const useTestStore = defineStore('test', {
  state: () => ({
    source: useLocalStorage('testSource', ''),
    questions: useLocalStorage('testQuestions', []),
    solutions: [],
    test: [],
    error: '',
    tests: [],
  }),
  actions: {
    async initializeTests() {
      const testM01V01 = await import(
        '../../ilerna-tests/M01 - V1 - CONTEXTO DE LA INTERVENCIÓN SOCIAL.txt?raw'
      );
      const testM01V02 = await import(
        '../../ilerna-tests/M01 - V2 - CONTEXTO DE LA INTERVENCIÓN SOCIAL.txt?raw'
      );
      const testM01V03 = await import(
        '../../ilerna-tests/M01 - V3 - CONTEXTO DE LA INTERVENCIÓN SOCIAL.txt?raw'
      );
      const testM03V01 = await import(
        '../../ilerna-tests/M03 - V1 - PROMOCIÓN DE LA AUTONOMÍA PERSONAL.txt?raw'
      );
      const testM03V02 = await import(
        '../../ilerna-tests/M03 - V2 - PROMOCIÓN DE LA AUTONOMÍA PERSONAL.txt?raw'
      );
      const testM03V03 = await import(
        '../../ilerna-tests/M03 - V2 - PROMOCIÓN DE LA AUTONOMÍA PERSONAL.txt?raw'
      );
      this.tests = [
        { name: 'M03 - V1 - PROMOCIÓN DE LA AUTONOMÍA PERSONAL', content: testM03V01.default },
        { name: 'M03 - V2 - PROMOCIÓN DE LA AUTONOMÍA PERSONAL', content: testM03V02.default },
        { name: 'M03 - V3 - PROMOCIÓN DE LA AUTONOMÍA PERSONAL', content: testM03V03.default },
        { name: 'M01 - V1 - CONTEXTO DE LA INTERVENCIÓN SOCIAL', content: testM01V01.default },
        { name: 'M01 - V2 - CONTEXTO DE LA INTERVENCIÓN SOCIAL', content: testM01V02.default },
        { name: 'M01 - V3 - CONTEXTO DE LA INTERVENCIÓN SOCIAL', content: testM01V03.default },
      ];
    },
    getTestByName(name) {
      for (let numTest = 0; numTest < this.tests.length; numTest += 1) {
        const test = this.tests[numTest];
        if (test.name === name) {
          return test.content;
        }
      }
      return '';
    },
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
        this.questions = textParser(this.source);
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
        const unsortedSolutions = [...this.solutions];
        const sortedSolutions = this.questions.map((question) => {
          return unsortedSolutions.find((solution) => question.solutions.includes(solution));
        });
        this.solutions = [...sortedSolutions];

        for (let questionIndex = 0; questionIndex < this.questions.length; questionIndex += 1) {
          const question = this.questions[questionIndex];

          if (this.solutions.at(questionIndex) === question.solutions.at(question.answer - 1)) {
            correctAnswers += 1;
          }
        }

        testAverage = Math.floor((correctAnswers / this.test.length) * 100);
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
