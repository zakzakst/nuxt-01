<template>
  <div>
    Step3
    <router-link to="/step2">前</router-link>
  </div>
</template>

<script>
import StepMixin from '@/mixins/step';

export default {
  name: 'Step3',
  mixins: [ StepMixin ],
}
</script>
