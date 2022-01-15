<template>
  <ul>
    <li
      v-for="step in steps"
      :key="step.id"
      :class="{ 'is-current': isCurrentStep(step.id) }"
    >
      {{ step.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'StepNav',

  data() {
    return {
      steps: [
        {
          id: 'step1',
          label: 'STEP1',
        },
        {
          id: 'step2',
          label: 'STEP2',
        },
        {
          id: 'step3',
          label: 'STEP3',
        },
      ],
    }
  },

  computed: {
    isCurrentStep() {
      return (id) => {
        return this.$route.name === id
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.is-current {
  color: $c_primary;
}
</style>
