<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <input
        v-model="inputValue"
        class="input"
        :class="{ 'is-danger': errorMessage }"
        type="number"
      />
    </div>
    <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',

  props: {
    value: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },

  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', Number(value))
      },
    },
  },
}
</script>
