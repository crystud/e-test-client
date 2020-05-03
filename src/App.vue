<template>
  <div
    id="app"
    :class="isDark ? 'dark' : 'light'"
  >
    <app-alert
      :title="alert.title"
      :text="alert.text"
      :delay="alert.delay"
      :isSuccess="alert.isSuccess"
      :show="alert.show"
      @close="closeAlert"
    ></app-alert>

    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import AppAlert from '@/components/ui/AppAlert.vue'

export default {
  name: 'App',
  components: { AppAlert },
  computed: {
    ...mapGetters({
      isDark: 'theme/isDarkTheme',
      alert: 'alert/alert',
    }),
  },
  methods: {
    ...mapActions({
      closeAlert: 'alert/close',
    }),
  },
}
</script>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

html,
body {
  height: 100vh;
  overflow: hidden;
  cursor: default;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;

  transition: background .3s;
}

.dark {
  --color-bg-main: #1E2329;
  --color-bg-dark: #15191C;
  --color-bg-light: #2C3339;
  --color-accent-orange: #FC7136;
  --color-accent-blue: #0E8DEA;
  --color-accent-red: #FF1E1E;
  --color-accent-green: #1BAD97;
  --color-font-main: #ffffff;
  --color-font-dark: #55636E;
  --color-font-gray: #55636E;
}

.light {
  --color-bg-main: #DCE0E3;
  --color-bg-dark: #FFFFFF;
  --color-bg-light: #e3e6e8;
  --color-accent-orange: #FC7136;
  --color-accent-blue: #0E8DEA;
  --color-accent-red: #FF1E1E;
  --color-accent-green: #1BAD97;
  --color-font-main: #000000;
  --color-font-dark: #55636E;
  --color-font-gray: #55636E;
}

#app, button, input {
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
}

#app {
  height: 100%;
  width: 100%;
  overflow: auto;

  background: var(--color-bg-main);
  color: var(--color-font-main);

  a {
    color: var(--color-font-main);
    text-decoration: none;
  }
}
</style>
