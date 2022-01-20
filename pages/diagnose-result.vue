<template>
  <div>
    <h1 class="title">診断結果</h1>
    <!-- カウントアップ -->
    <!-- グラフ -->
    <!-- 結果テキスト表示 -->
  </div>
</template>

<script>
export default {
  name: 'DiagnoseResult',

  beforeRouteEnter(to, from, next) {
    // 直接アクセスした場合、診断ページにリダイレクト
    if (!from.name) {
      next('/diagnose')
    }
    next()
  },

  mounted() {
    console.log(this.$store.getters['diagnose/resultSum'])
  },
}
</script>
