export const state = () => ({
  entries: [],
  lastId: undefined
})

export const getters = ({
  entries: (store) => store.entries,
  lastId: (store) => store.lastId,
})

export const actions = ({
  async getEntries({getters, commit}, view) {
    let url = this.$config.baseUrl + "/api/entries?view=" + view
    if (getters.lastId) url += "&offset=" + getters.lastId
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
  },
  clearEntries(store) {
    store.entries = []
    store.lastId = undefined
  }
})