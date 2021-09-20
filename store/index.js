export const state = () => ({
  entries: [],
  lastId: undefined,
  reloadTimes: 0
})

export const getters = ({
  entries: (store) => store.entries,
  lastId: (store) => store.lastId,
  reloadTimes: (store) => store.reloadTimes
})

export const actions = ({
  async getEntries({getters, commit}, view) {
    let url = this.$config.baseUrl + "/api/entries?view=" + view
    if (getters.lastId) url += "&offset=" + getters.lastId
    if (view != "new") url += "&reload_times=" + getters.reloadTimes
    const data = await this.$axios.$get(url)

    commit('setLastId', data.last_id)
    commit('incrementReload')
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
  incrementReload(store) {
    store.reloadTimes++
  },
  clearEntries(store) {
    store.entries = []
    store.lastId = undefined
    store.reloadTimes = 0
  }
})