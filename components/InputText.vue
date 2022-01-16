<template>
  <input v-model="inputValue" type="text">
</template>

<script>
export default {
  name: 'InputText',

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
}
</script>
