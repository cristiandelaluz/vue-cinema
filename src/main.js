import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

//vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://127.0.0.1:3333/api/v1/'
// JWT Configuration
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`)
  next()
})
//.vue-resource

//vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//.vuex

//blockui
import BlockUI from 'vue-blockui'
Vue.use(BlockUI)
//.blockui

//modules and types
import globalTypes from '@/types/global'
import authModule from '@/modules/auth'
import cinemaModule from '@/modules/cinema'
import movieModule from '@/modules/movie'
import bookingModule from '@/modules/booking'
//.modules and types

//vee-validate
import VeeValidate, {Validator} from 'vee-validate'
import ValidatorEs from '@/validator/es'
import ValidatorEn from '@/validator/en'
Validator.localize('es', ValidatorEs)
Vue.use(VeeValidate)
//.vee-validate

//vue-tables-2
import {ClientTable} from 'vue-tables-2'
Vue.use(ClientTable, {}, false, 'bootstrap4', 'default')
//.vue-tables-2

//globlal-store vuex
export const store = new Vuex.Store({
  state: {
    processing: false,
    language: 'es'
  },
  actions: {
    [globalTypes.actions.changeLanguage]: ({commit}, lang) => {
      commit(globalTypes.mutations.setLanguage, lang)

      switch (lang) {
        case 'en': {
          Validator.localize('en', ValidatorEn)
          break
        }
        case 'es': {
          Validator.localize('es', ValidatorEs)
          break
        }
      }
    }
  },
  getters: {
    [globalTypes.getters.processing]: state => state.processing,
    [globalTypes.getters.language]: state => state.language
  },
  mutations: {
    [globalTypes.mutations.startProcessing] (state) {
      state.processing = true
    },
    [globalTypes.mutations.stopProcessing] (state) {
      state.processing = false
    },
    [globalTypes.mutations.setLanguage] (state, lang) {
      state.language = lang
    }
  },
  modules: {
    authModule,
    cinemaModule,
    movieModule,
    bookingModule
  }
})
//.global-store vuex

//vue translations
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import messages from '@/translations'

const i18n = new VueI18n({
  locale: store.state.language,
  messages
})
//.vue translations

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  i18n,
  router
})
