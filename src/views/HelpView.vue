<template>
  <v-card>
    <v-card-title>{{ $t('help.title') }}</v-card-title>
    <v-card-text>
      <vue-markdown-render>
        {{ help }}
      </vue-markdown-render>
    </v-card-text>
    <v-card-actions>
      <v-btn @click.stop="goBack">
        {{ $t('help.back') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { VBtn, VCard, VCardTitle, VCardText } from 'vuetify/lib/components/index.mjs';
import { useI18n } from 'vue-i18n';
import { VueMarkdownRender } from 'vue-markdown-viewer';
import { useRouter } from 'vue-router';

const { t: $t } = useI18n();
const router = useRouter();

const help = ref(
  $t('help.line1')
    .concat($t('help.line2'))
    .concat($t('help.line3'))
    .concat($t('help.line4'))
    .concat($t('help.line5'))
    .concat($t('help.line6'))
    .concat($t('help.line7'))
    .concat($t('help.line8'))
    .concat($t('help.line9')),
);

const goBack = () => {
  router.back();
};
</script>
