<template>
  <transition name="fade">
    <div v-show="loading" class="loader__wrapper">
      <div class="loader" />
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loader.loading;
    },
  },
}
</script>

<style lang="scss" scoped>
.loader__wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(#000, 0.6);
  z-index: $z_overlay;
}
</style>
