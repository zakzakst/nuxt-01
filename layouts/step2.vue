<template>
  <div class="l-step__container">
    <StepNav />
    <nuxt />
  </div>
</template>

<script>
import StepNav from '@/components/StepNav.vue'

export default {
  components: {
    StepNav,
  },
}
</script>

<style lang="scss" scoped>
.l-step {
  &__container {
    overflow: hidden;
  }
}
</style>
