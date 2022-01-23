import axios from 'axios'

export const state = () => ({
  contents: null,
  results: null,
})

export const mutations = {
  updateContents(state, payload) {
    state.contents = payload
  },
  setResults(state, payload) {
    state.results = payload
  },
}

export const actions = {
  async getContents({ commit }) {
    try {
      const { data } = await axios.get('/nuxt/01/data/diagnose.json')
      commit('updateContents', data)
    } catch (error) {
      console.log(error)
    }
  },
  setResults({ commit }, payload) {
    commit('setResults', payload)
  },
  async getMessage({ commit }, payload) {
    try {
      // メッセージデータを取得
      const { data } = await axios.get('/nuxt/01/data/diagnose-result.json')
      // 総合点から対象メッセージのIDを取得
      let targetId = ''
      if (payload > 60) {
        targetId = 'veryGood'
      } else if (payload > 50) {
        targetId = 'good'
      } else if (payload > 40) {
        targetId = 'normal'
      } else if (payload > 30) {
        targetId = 'bad'
      } else {
        targetId = 'veryBad'
      }
      // IDに対応するメッセージを取得
      const message = data.find((item) => {
        return item.id === targetId
      })
      return message
    } catch (error) {
      return error
    }
  },
}

export const getters = {
  resultSum(state) {
    if (!state.results) {
      return null
    }
    const sum = {
      pointASum: 0,
      pointBSum: 0,
      pointCSum: 0,
    }
    state.results.forEach((result) => {
      sum.pointASum += result.pointA
      sum.pointBSum += result.pointB
      sum.pointCSum += result.pointC
    })
    return sum
  },
}
