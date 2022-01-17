export default {
  layout: 'step',

  transition(to, from) {
    if (
      (from?.name === 'step2' && to?.name === 'step1') ||
      (from?.name === 'step3' && to?.name === 'step2')
    ) {
      return 'slide-right'
    } else {
      return 'slide-left'
    }
  },

  methods: {
    updateFormData(event, prop) {
      this.formData[prop] = event
    },
  },

  beforeRouteLeave(to, from, next) {
    if (to.name === 'step1' || to.name === 'step2' || to.name === 'step3') {
      next()
    } else {
      let answer = true
      // 送信完了後の遷移以外の場合、確認アラートを表示してから遷移
      if (from.name !== 'step3' || to.name !== 'index') {
        answer = window.confirm(
          '入力中のデータがクリアされます。よろしいでしょうか。'
        )
      }
      if (answer) {
        // step以外のページに移動した場合、stateをクリアしてページ遷移
        this.$store.dispatch('step/clearAll')
        next()
      } else {
        next(false)
      }
    }
  },
}
