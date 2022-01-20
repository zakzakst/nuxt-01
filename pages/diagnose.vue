<template>
  <div>
    <h1 class="title">質問{{ currentNum + 1 }}</h1>
    <div v-if="content">
      <p>{{ content.question }}</p>
      <ul class="columns is-multiline mt-4">
        <li
          v-for="(answer, index) in content.answers"
          :key="index"
          class="column is-half"
        >
          <button
            class="button is-link is-medium is-fullwidth"
            @click="next(index)"
          >
            {{ answer.label }}
          </button>
        </li>
      </ul>
      <div v-if="currentNum > 0">
        <button class="button is-small is-fullwidth" @click="prev">戻る</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Diagnose',

  data() {
    return {
      currentNum: 0,
      results: [],
    }
  },

  computed: {
    content() {
      const contents = this.$store.state.diagnose.contents
      return contents ? contents[this.currentNum] : null
    },
  },

  mounted() {
    if (!this.$store.state.diagnose.contents) {
      this.$store.dispatch('diagnose/getContents')
    }
  },

  methods: {
    next(index) {
      const { pointA, pointB, pointC } = this.content.answers[index]
      this.results[this.currentNum] = { pointA, pointB, pointC }
      if (this.currentNum + 1 < this.$store.state.diagnose.contents.length) {
        this.currentNum += 1
      } else {
        this.showResult()
      }
    },
    prev() {
      this.currentNum -= 1
    },
    showResult() {
      this.$store.dispatch('diagnose/setResults', this.results)
      this.$router.push('/diagnose-result')
    },
  },
}
</script>
