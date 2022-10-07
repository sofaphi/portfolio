import axios from 'axios'
import Vue from 'vue'
const HOST = 'http://django-web.std-1362.ist.mospolytech.ru/api'

export const state = () => ({
  studentsData: {},
})

export const getters = {
  getStudents(state) {
    return state.studentsData
  },
}

export const mutations = {
  SET_STUDENTS(state, students) {
    state.studentsData = students
  },
}

export const actions = {
  async fetchStudents(state, url = '/student/?limit=999') {
    try {
      await axios.get(HOST + url).then((res) => {
        state.commit('SET_STUDENTS', res.data)
      })
    } catch (e) {
      console.log(e)
    }
  },
}
