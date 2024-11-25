import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAppStore = defineStore('app', {
  state: () => ({
    quickTest: useLocalStorage('quickTest', ''),
  }),
  actions: {},
});

export default useAppStore;
