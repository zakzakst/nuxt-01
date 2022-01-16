<template>
  <div>
    Step1
    <router-link to="/step2">次</router-link>
    <div>
      <p>名前：<input v-model="formData.name" type="text"></p>
      <p>住所：<input v-model="formData.address" type="text"></p>
      <button @click="next">次</button>
    </div>
  </div>
</template>

<script>
import StepMixin from '@/mixins/step';

export default {
  name: 'Step1',
  mixins: [ StepMixin ],

  data() {
    return {
      formData: {
        name: '',
        address: '',
      },
    };
  },

  mounted() {
    // stateの値を分割代入
    (this.formData = this.$store.getters['step/step1']);
  },

  methods: {
    next() {
      // データをstateに反映してからページ遷移
      this.$store.dispatch('step/updateStep1', this.formData);
      this.$router.push('step2');
    },
  },
}
</script>
