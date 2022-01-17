<template>
  <div class="select">
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
  },
}
</script>
