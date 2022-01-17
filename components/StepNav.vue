<template>
  <div class="step-nav__wrapper" :style="fixedStyle">
    <div class="container is-max-desktop">
      <div class="section py-3">
        <ul class="step-nav">
          <li
            v-for="step in steps"
            :key="step.id"
            class="step-nav__item is-size-7"
            :class="{ 'is-current': isCurrentStep(step.id) }"
          >
            {{ step.subLabel }}<br>{{ step.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepNav',

  data() {
    return {
      steps: [
        {
          id: 'step1',
          subLabel: 'STEP1',
          label: 'プロフィール入力',
        },
        {
          id: 'step2',
          subLabel: 'STEP2',
          label: '希望選択',
        },
        {
          id: 'step3',
          subLabel: 'STEP3',
          label: '入力内容の確認',
        },
      ],
    }
  },

  computed: {
    isCurrentStep() {
      return (id) => {
        return this.$route.name === id
      }
    },
    fixedStyle() {
      const scrollBarWidth = process.client ? window.innerWidth - document.body.clientWidth : 0;
      return this.$store.state.loader.loading ? `padding-right: ${ scrollBarWidth }px` : '';
    },
  },
}
</script>

<style lang="scss" scoped>
.step-nav {
  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: $c_primary;
    z-index: $z_nav;
  }

  display: flex;

  &__item {
    color: $c_white;
    padding: 2px 20px 4px;
    border: 1px solid $c_white;
    border-radius: 9999px;
    & + & {
      position: relative;
      margin-left: 36px;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -24px;
        display: block;
        width: 0;
        height: 0;
        content: '';
        margin: auto;
        border: solid transparent;
        border-width: 6px 10px;
        border-left-color: $c_white;
        box-sizing: content-box;
      }
    }
    &.is-current {
      color: $c_primary;
      background: $c_white;
      font-weight: bold;
    }
  }
}
</style>
