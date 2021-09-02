import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  applicants: [],
  id: 10,
  userLoggedIn: false
})

export const getters = {
  getterValue: (state) => {
    return state.value
  },
  getField
}

export const mutations = {
  addApplicant: (state, formOutPut) => {
    state.id += 1
    formOutPut.id = state.id
    formOutPut.status = 'Created'
    state.applicants.push(formOutPut)
    console.log(formOutPut)
  },
  setApplicants: (state, applicants) => {
    // Array.prototype.push.apply(state.applicants, applicants)
    state.applicants = state.applicants.concat(applicants)
  },
  updateField,
  deleteItem: (state, payload) => {
    state.applicants = state.applicants.filter((item) => item.id !== payload.id)
  },
  toggleLogin: (state) => {
    state.userLoggedIn = !state.userLoggedIn
  }
}

export const actions = {
  async getApplicants({ commit, state }) {
    if (state.applicants.length) return
    try {
      await fetch('https://fakejsonapi.com/users')
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data)
          for (let i = 0; i < data.length; i++) {
            data[i].status = 'Created'
          }
          commit('setApplicants', data)
          console.log('state', state.applicants)
        })
    } catch (error) {
      console.log(error)
    }
  }
}
