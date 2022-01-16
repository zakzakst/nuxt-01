<template>
  <div class="l-step__container">
    <StepNav />
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
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

  data() {
    return {
      animSpeed: 1000,
      animName: null,
      fromPage: null,
      toPage: null,
    }
  },

  methods: {
    updateAnimName() {
      this.fromPage = this.toPage
      this.toPage = this.$route.name
      if (
        (this.fromPage === 'step2' && this.toPage === 'step1') ||
        (this.fromPage === 'step3' && this.toPage === 'step2')
      ) {
        this.animName = 'StepSlideRight'
      } else {
        this.animName = 'StepSlideLeft'
      }
    },
    beforeEnter(el) {
      this.updateAnimName()
      el.style.animation = `${this.animName} ${this.animSpeed}ms`
    },
    enter(el, done) {
      setTimeout(() => {
        done()
      }, this.animSpeed)
    },
    afterEnter(el) {
      el.style = null
    },
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

<style lang="scss">
$step_slide_offset: 50px;

@keyframes StepSlideLeft {
  0% {
    opacity: 0;
    transform: translateX($step_slide_offset);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes StepSlideRight {
  0% {
    opacity: 0;
    transform: translateX(-$step_slide_offset);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
