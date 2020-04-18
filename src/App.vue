<template>
  <div
    id="app"
    :class="isDark ? 'dark' : 'light'"
  >
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isDark: 'theme/isDarkTheme',
    }),
  },
}
</script>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

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
  --color-accent-green: #1fe361;
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
  --color-accent-green: #1fe361;
  --color-font-main: #000000;
  --color-font-dark: #55636E;
  --color-font-gray: #55636E;
}

#app, button {
  font-family: 'PT Sans', sans-serif;
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
