import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import aposeParser from '../lib/apose-parser';

export const useTestStore = defineStore('test', {
  state: () => ({
    source: useLocalStorage('testSource', ''),
    questions: useLocalStorage('testQuestions', []),
  }),
  actions: {
    updateTestSource(source) {
      this.source = source;
    },
    parseTest() {
      this.questions = aposeParser(this.source);
    },
  },
});

export default useTestStore;
