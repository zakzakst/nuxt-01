<template>
  <div>
    <button
      class="button-tooltip button"
      :class="buttonClass"
      :disabled="disabled"
      @click="onClick"
    >
      <transition name="tooltip">
        <span v-show="isMessageShow" class="button-tooltip__tooltip">{{
          message
        }}</span>
      </transition>
      <span>{{ label }}</span>
    </button>
  </div>
</template>

<script>
import { COLORS } from '@/constants/colors'

export default {
  name: 'ButtonTooltip',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      validator(val) {
        return ['', ...COLORS].includes(val)
      },
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      canMessageShow: false,
      canClick: true,
      messageShowTime: 2000,
    }
  },

  computed: {
    buttonClass() {
      const result = {
        'is-fullwidth': this.fullWidth,
        'is-rounded': this.rounded,
        'is-outlined': this.outlined,
      }
      if (this.color) {
        result[`is-${this.color}`] = true
      }
      return result
    },
    isMessageShow() {
      return Boolean(this.message && this.canMessageShow)
    },
  },

  watch: {
    isMessageShow(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.messageHide()
        }, this.messageShowTime)
      }
    },
  },

  methods: {
    onClick() {
      if (!this.canClick) return
      this.canClick = false
      this.canMessageShow = true
      this.$emit('click')
    },
    messageHide() {
      this.canMessageShow = false
      setTimeout(() => {
        this.$emit('messageHideDone')
        this.canClick = true
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.button-tooltip {
  position: relative;

  &__tooltip {
    position: absolute;
    bottom: 100%;
    display: block;
    max-width: 180px;
    padding: 0.25em 1em;
    margin: auto;
    background: $c_black;
    color: $c_white;
    border-radius: 4px;
    cursor: initial;
    box-shadow: 0 8px 16px rgba($c_black, 0.5);
    z-index: 1;
    &::after {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: block;
      width: 0;
      height: 0;
      margin: 0 auto;
      border: 5px solid transparent;
      border-top-color: $c_black;
      box-sizing: content-box;
      content: '';
    }
  }
}
</style>
