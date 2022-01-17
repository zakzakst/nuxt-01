<template>
  <div>
    <div class="l-step__container">
      <StepNav />
      <div class="container is-max-desktop">
        <section class="section">
          <nuxt />
        </section>
      </div>
    </div>
    <Loader />
  </div>
</template>

<script>
import StepNav from '@/components/StepNav.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'LayoutStep2',

  components: {
    StepNav,
    Loader,
  },

  middleware: 'step',

  head() {
    const scrollBarWidth = process.client
      ? window.innerWidth - document.body.clientWidth
      : 0
    return {
      htmlAttrs: {
        style: this.$store.state.loader.loading ? 'overflow: hidden' : '',
      },
      bodyAttrs: {
        style: this.$store.state.loader.loading
          ? `padding-right: ${ scrollBarWidth }px`
          : '',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.l-step {
  &__container {
    padding-top: 60px;
    overflow: hidden;
  }
}
</style>

<style>
/* TODO: _style.scssが共通CSSとして書き出されていないことへの暫定対応 */
html.is-loading {
  overflow: hidden;
}
</style>
