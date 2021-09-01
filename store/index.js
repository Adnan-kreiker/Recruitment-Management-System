export const state = () => ({
  applicants: []
})

export const getters = {
  getterValue: (state) => {
    return state.value
  }
}

export const mutations = {
  addApplicant: (state, formOutPut) => {
    state.applicants.push(formOutPut)
  },
  setApplicants: (state, applicants) => {
    // Array.prototype.push.apply(state.applicants, applicants)
    state.applicants = applicants
  }
  // editItem: (state, item) => {
  //   const { id } = item
  //   state.editedIndex = state.applicants.indexOf(id)
  //   state.editedItem = Object.assign({}, item)
  // }
}

export const actions = {
  // async getApplicants({ commit, state }) {
  //   if (state.applicants.length) return
  //   try {
  //     await fetch('https://fakejsonapi.com/users')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data)
  //         console.log(this.res)
  //         for (let i = 0; i < data.length; i++) {
  //           data[i].status = 'Created'
  //         }
  //         commit('setApplicants', data)
  //         console.log(state.applicants)
  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}
