<template>
    <v-select
      :label="$t('test.selectTest')"
      :items="testNames"
      @update:model-value="testSelected"
    ></v-select>
</template>

<script setup>
import { computed } from 'vue';
import { VSelect } from 'vuetify/lib/components/index.mjs';
import { useI18n } from 'vue-i18n';
import { useTestStore } from '../stores/test';

const emits = defineEmits(['selectedTest']);

const { t: $t } = useI18n();
const testStore = useTestStore();

const testNames = computed(() => testStore.tests.map((test) => test.name));

const testSelected = (testName) => {
  emits('selectedTest', testName);
};
</script>
