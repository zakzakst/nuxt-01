<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <input
        v-model="inputValue"
        class="input"
        :class="{ 'is-danger': errorMessage }"
        type="text"
        :placeholder="placeholder"
      />
    </div>
    <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputText',

  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
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
        this.$emit('input', value)
      },
    },
  },
}
</script>
