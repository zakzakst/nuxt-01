<template>
  <div class="l-step__container">
    <StepNav />
    <transition name="step">
      <nuxt />
    </transition>
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
.step-enter-active,
.step-leave-active {
  transition: all 1s;
}
.step-enter,
.step-leave-active {
  opacity: 0;
  transform: translateX(50px);
}
</style>
