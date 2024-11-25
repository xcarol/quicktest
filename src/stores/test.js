import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import aposeParser from '../lib/apose-parser';

export const useTestStore = defineStore('test', {
  state: () => ({
    source: useLocalStorage('testSource', ''),
    questions: useLocalStorage('testQuestions', []),
    error: ref(''),
  }),
  actions: {
    updateTestSource(source) {
      this.source = source;
    },
    parseTest() {
      try {
        this.questions = aposeParser(this.source);
        this.error = '';
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});

export default useTestStore;
