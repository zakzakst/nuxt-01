<template>
  <div>
    Step1
    <router-link to="/step2">次</router-link>
  </div>
</template>

<script>
import StepMixin from '@/mixins/step';

export default {
  name: 'Step1',
  mixins: [ StepMixin ],
}
</script>
