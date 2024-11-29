// eslint-disable-next-line import/extensions, import/no-unresolved
import 'vuetify/styles';
// eslint-disable-next-line import/extensions, import/no-unresolved
import * as directives from 'vuetify/directives';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createVuetify } from 'vuetify';
import ca from 'vuetify/lib/locale/ca.mjs';
import en from 'vuetify/lib/locale/en.mjs';
import es from 'vuetify/lib/locale/es.mjs';

const defaultTheme =
  import.meta.env.VITE_THEME ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const defaults = {
  VCardActions: {
    VBtn: {
      ripple: false,
      variant: 'elevated',
      color: 'primary',
    },
  },
  VBtn: {
    ripple: false,
    variant: 'elevated',
    color: 'primary',
  },
  VSelect: {
    variant: 'outlined',
    density: 'compact',
  },
  VCombobox: {
    variant: 'outlined',
    density: 'compact',
  },
  VFileInput: {
    variant: 'outlined',
    density: 'compact',
  },
  VTextField: {
    variant: 'outlined',
    density: 'compact',
  },
  VCardTitle: {
    style: 'white-space: normal; text-overflow: initial; overflow: visible;',
  },
  VCardSubtitle: {
    style: 'white-space: normal; text-overflow: initial; overflow: visible;',
  },
  VCardText: {
    style: 'white-space: normal; text-overflow: initial; overflow: visible;',
  },
};

const vuetify = createVuetify({
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
    },
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme,
  },
  lang: {
    locales: { ca, en, es },
    current: 'ca',
  },
  defaults,
});

export default vuetify;
