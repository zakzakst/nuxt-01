<template>
  <div>
    <h1 class="title">診断</h1>
    <div v-if="content">
      <p>{{ content.question }}</p>
      <ul>
        <li
          v-for="(answer, index) in content.answers"
          :key="index"
          @click="test(answer.point)"
        >
          {{ answer.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Diagnose',

  data() {
    return {
      currentNum: 0,
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
    test(point) {
      console.log(point)
    },
  },
}
</script>
