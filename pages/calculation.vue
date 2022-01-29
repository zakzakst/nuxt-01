<template>
  <div>
    <InputNumber
      v-model="value"
      @input="updateValue"
    />
  </div>
</template>

<script>
import InputNumber from '@/components/InputNumber'

export default {
  name: 'Calculation',

  components: {
    InputNumber,
  },

  data() {
    return {
      value: 6,
    }
  },

  methods: {
    updateValue(value) {
      this.value = value
    },
  },
}
</script>
