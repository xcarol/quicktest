<template>
  <v-card>
    <v-card-title>{{ $t('help.title') }}</v-card-title>
    <v-card-text>
      <vue-markdown-render>
        {{ help }}
      </vue-markdown-render>
    </v-card-text>
    <v-card-actions>
      <v-btn @click.stop="goHome">
        {{ $t('help.home') }}
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
    .concat($t('help.line9'))
    .concat($t('help.line10'))
    .concat($t('help.line11'))
    .concat($t('help.line12'))
    .concat($t('help.line13'))
    .concat($t('help.line14'))
    .concat($t('help.line15'))
    .concat($t('help.line16'))
    .concat($t('help.line17'))
    .concat($t('help.line18'))
    .concat($t('help.line19'))
    .concat($t('help.line20'))
    .concat($t('help.line21')),
);

const goHome = () => {
  router.push('/');
};
</script>
