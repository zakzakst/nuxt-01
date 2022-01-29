<template>
  <div class="select" :class="selectClass">
    <select v-model="selectedValue">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',

  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    selectedValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      },
    },
    selectClass() {
      const result = {
        'is-fullwidth': this.fullWidth,
      }
      return result
    },
  },
}
</script>
