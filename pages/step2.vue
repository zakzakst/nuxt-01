<template>
  <div>
    Step2
    <router-link to="/step1">前</router-link>
    <router-link to="/step3">次</router-link>
  </div>
</template>

<script>
import StepMixin from '@/mixins/step';

export default {
  name: 'Step2',
  mixins: [ StepMixin ],
}
</script>
