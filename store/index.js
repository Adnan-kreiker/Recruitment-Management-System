import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  applicants: []
})

export const getters = {
  getterValue: (state) => {
    return state.value
  },
  getField
}

export const mutations = {
  addApplicant: (state, formOutPut) => {
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
  }
  // editItem: (state, item) => {
  //   const { id } = item
  //   state.editedIndex = state.applicants.indexOf(id)
  //   state.editedItem = Object.assign({}, item)
  // }
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
