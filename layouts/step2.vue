<template>
  <div class="l-step__container">
    <StepNav />
    <div class="container is-max-desktop">
      <nuxt />
    </div>
  </div>
</template>

<script>
import StepNav from '@/components/StepNav.vue'

export default {
  name: 'LayoutStep2',

  components: {
    StepNav,
  },

  middleware: 'step',
}
</script>

<style lang="scss" scoped>
.l-step {
  &__container {
    overflow: hidden;
  }
}
</style>
