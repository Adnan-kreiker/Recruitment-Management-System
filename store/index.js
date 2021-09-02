import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  applicants: [],
  id: 10,
  user: null
})

export const getters = {
  getterValue: (state) => {
    return state.value
  },
  getField,
  getUser(state) {
    return state.user
  }
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
  SET_USER(state, user) {
    state.user = user
  }
}

export const actions = {
  onAuthStateChangedAction: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
      state.commit('SET_USER', null)
    } else {
      // Do something with the authUser and the claims object...
      const { displayName, email } = authUser
      state.commit('SET_USER', {
        displayName,
        email
      })
    }
  },
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
  },
  init_login({ commit }) {
    const user = this.$fire.auth.currentUser
    if (user) {
      const { displayName, email } = this.$fire.auth.currentUser

      commit('SET_USER', {
        displayName,
        email
      })
    }
  },
  async login({ commit }, payload) {
    await this.$fire.auth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    )

    const { displayName, email } = this.$fire.auth.currentUser

    commit('SET_USER', {
      displayName,
      email
    })
    this.$router.push('/')
  },
  async register({ commit }, payload) {
    const userCred = await this.$fire.auth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    )

    await this.$fire.firestore.collection('users').doc(userCred.user.uid).set({
      name: payload.name,
      email: payload.email,
      phone: payload.phone
    })

    await userCred.user.updateProfile({
      displayName: payload.name,
      phoneNumber: payload.phone
    })

    const { displayName, email } = this.$fire.auth.currentUser

    commit('SET_USER', {
      displayName,
      email
    })
    this.$router.push('/')
  },
  async signout({ commit }) {
    await this.$fire.auth.signOut()
    commit('SET_USER', null)
    this.$router.push('/auth')
  }
}
