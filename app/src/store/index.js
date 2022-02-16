import Vue from 'vue';
import Vuex from 'vuex';

import homeStore from './home'
import searchStore from './search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    homeStore,
    searchStore
  }
})