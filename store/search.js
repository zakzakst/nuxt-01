import axios from 'axios'

export const state = () => ({
  items: [],
})

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
}

export const actions = {
  async setItems({ commit }, keywords) {
    try {
      const { data } = await axios.get('/nuxt/01/data/search.json')
      const filteredData = data.filter((item) => {
        let flg = false
        keywords.forEach((keyword) => {
          if (item.title.includes(keyword.label)) {
            flg = true
          }
        })
        return flg
      })
      commit('setItems', filteredData)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  filteredItems: (state) => (filters) => {
    if (filters.length) {
      const filteredItems = state.items.filter((item) => {
        let flg = false
        filters.forEach((filter) => {
          if (item.tags.includes(filter)) {
            flg = true
          }
        })
        return flg
      })
      return filteredItems
    } else {
      // フィルターがない場合、全体を返す
      return state.items
    }
  }
}
