<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <textarea
        v-model="inputValue"
        class="textarea"
        :class="{ 'is-danger': errorMessage }"
        :placeholder="placeholder"
      ></textarea>
    </div>
    <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Textarea',

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
