<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <input
        v-model="inputValue"
        class="input"
        :class="{ 'is-danger': errorMessage }"
        type="number"
        :max="max"
        :min="min"
        :step="step"
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
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: null,
    },
    step: {
      type: Number,
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
