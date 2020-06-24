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
  faPlay,
  faAngleDown,
  faStopCircle,
  faUserCog,
  faInfoCircle,
  faSearch,
  faFolderPlus,
  faFolderMinus,
  faTrash,
  faListOl,
  faQuestionCircle,
  faFile,
  faChevronLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleRight,
  faCalendarAlt,
  faEllipsisV,
  faUser,
  faAddressCard,
  faFilter,
  faChevronRight,
  faUserPlus,
  faRedo,
  faMapMarkerAlt,
  faImage,
  faChevronDown,
  faFileExcel,
  faFileUpload,
  faUserClock,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons'

import moment from 'moment-timezone'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from './tools/axios'
import accessTokenExpired from './tools/accessTokenExpired'
import accessTokenHeader from './tools/accessTokenHeader'

accessTokenExpired(axios, store)
accessTokenHeader(axios, store)

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
library.add(faPlay)
library.add(faAngleDown)
library.add(faStopCircle)
library.add(faUserCog)
library.add(faInfoCircle)
library.add(faSearch)
library.add(faFolderPlus)
library.add(faFolderMinus)
library.add(faTrash)
library.add(faListOl)
library.add(faQuestionCircle)
library.add(faFile)
library.add(faChevronLeft)
library.add(faAngleLeft)
library.add(faAngleRight)
library.add(faAngleDoubleLeft)
library.add(faAngleDoubleRight)
library.add(faCalendarAlt)
library.add(faUser)
library.add(faEllipsisV)
library.add(faAddressCard)
library.add(faFilter)
library.add(faChevronRight)
library.add(faUserPlus)
library.add(faRedo)
library.add(faMapMarkerAlt)
library.add(faImage)
library.add(faChevronDown)
library.add(faFileExcel)
library.add(faFileUpload)
library.add(faUserClock)
library.add(faQuestion)

Vue.component('font-awesome-icon', FontAwesomeIcon)

moment.locale('uk')
moment.tz.guess(true)

Vue.prototype.$moment = moment
Vue.prototype.$defaultAvatar = import('@/assets/no_user.png')
Vue.prototype.$getBase64Image = async () => null

// return `data:image/jpg;base64,${Buffer.from(image.data).toString()}`


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
