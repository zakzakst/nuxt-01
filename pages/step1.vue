<template>
  <div>
    Step1
    <router-link to="/step2">次</router-link>
    <div>
      <p>名前：<InputText v-model="formData.name" @input="updateFormData($event, 'name')" /></p>
      <p>住所：<InputText v-model="formData.address" @input="updateFormData($event, 'address')" /></p>
      <button @click="next">次</button>
    </div>
  </div>
</template>

<script>
import StepMixin from '@/mixins/step';
import InputText from '@/components/InputText.vue';

export default {
  name: 'Step1',

  components: {
    InputText,
  },

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
