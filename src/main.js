import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faLightbulb,
  faChartBar,
  faShieldAlt,
  faLink,
  faClock,
  faUserTimes,
  faGraduationCap,
  faTimes,
  faTimesCircle,
  faCheckCircle,
  faHashtag,
  faBars,
  faChartLine,
  faHome,
  faCheck,
  faAt,
  faPlus,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

library.add(faLightbulb)
library.add(faChartBar)
library.add(faShieldAlt)
library.add(faLink)
library.add(faClock)
library.add(faUserTimes)
library.add(faGraduationCap)
library.add(faTimes)
library.add(faTimesCircle)
library.add(faCheckCircle)
library.add(faHashtag)
library.add(faBars)
library.add(faChartLine)
library.add(faHome)
library.add(faCheck)
library.add(faAt)
library.add(faPlus)
library.add(faAngleLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
