export const state = () => ({
  entries: [],
  lastId: undefined,
  reloadTimes: 0,
  view: "trend",
})

export const getters = ({
  entries: (store) => store.entries,
  lastId: (store) => store.lastId,
  reloadTimes: (store) => store.reloadTimes,
  view: (store) => store.view,
})

export const actions = ({
  nuxtServerInit({commit}, {route}) {
    commit("setView", route.query.view ?? "trend")
  },
  async getEntries({getters, commit}, view) {
    let url = this.$config.baseUrl + "/api/entries?view=" + view
    if (view == "new" && getters.lastId) url += "&offset=" + getters.lastId
    if (view != "new") url += "&reload_times=" + getters.reloadTimes
    console.log(url);
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
  setView(store, value) {
    store.view = value
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