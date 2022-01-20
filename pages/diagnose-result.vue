<template>
  <div>
    <h1 class="title">診断結果</h1>
  </div>
</template>

<script>
export default {
  name: 'DiagnoseResult',

  mounted() {
    console.log(this.$store.state.diagnose.result)
  },
}
</script>
