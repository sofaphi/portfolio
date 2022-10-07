import axios from 'axios'
import Vue from 'vue'
const HOST = 'http://django-web.std-1362.ist.mospolytech.ru/api'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const state = () => ({
  placesData: {},
})

export const getters = {
  getPlaces(state) {
    return state.placesData
  },
}

export const mutations = {
  SET_PLACES(state, places) {
    state.placesData = places
  },
}

export const actions = {
  async fetchPlaces(state, url = '/place/?limit=3') {
    try {
      await axios.get(HOST + url).then((res) => {
        state.commit('SET_PLACES', res.data)
      })
    } catch (e) {
      console.log(e)
    }
  },

  async createPlace(state, place) {
    try {
      await axios.post(HOST + '/place/', place).then((res) => {
        state.commit('SET_PLACES', res.data)
      })
    } catch (e) {
      console.log(e)
    }
  },
}
