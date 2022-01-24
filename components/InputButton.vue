<template>
  <div class="field has-addons">
    <div class="control">
      <input
        class="input"
        type="text"
        :placeholder="placeholder"
        @keypress="onKeyPress($event)"
      >
    </div>
    <div class="control">
      <a
        class="button"
        :class="buttonClass"
        @click="onClickButton"
      >{{ buttonText }}</a>
    </div>
  </div>
</template>

<script>
import { COLORS } from '@/constants/colors';

export default {
  name: 'InputButton',

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonLight: {
      type: Boolean,
      default: false,
    },
    buttonColor: {
      type: String,
      validator (val) {
        return ['', ...COLORS].includes(val)
      },
      default: '',
    },
  },

  computed: {
    buttonClass() {
      const result = {
        'is-light': this.buttonLight,
      }
      if (this.buttonColor) {
        result[`is-${this.buttonColor}`] = true;
      }
      return result;
    },
  },

  methods: {
    onClickButton() {
      console.log('onClickButton')
    },
    onKeyPress(event) {
      if (event.key === 'Enter') {
        console.log('onKeyPressEnter')
      }
    },
  },
}
</script>
