export const state = () => ({
  entries: [],
  lastId: undefined
})

export const getters = ({
  entries: (store) => store.entries,
  lastId: (store) => store.lastId,
})

export const actions = ({
  async getEntries({getters, commit}) {
    let url = "//localhost:3000/api/entries"
    if (getters.lastId) url += "?offset=" + getters.lastId
    const data = await this.$axios.$get(url)

    commit('setLastId', data.last_id)
    commit('setEntries', [...getters.entries, ...data.list])
  }
})

export const mutations = ({
  setEntries(store, value) {
    store.entries = value
  },
  setLastId(store, value) {
    store.lastId = value
  }
})