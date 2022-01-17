<template>
  <div>
    <h1 class="title">STEP2：希望選択</h1>

    <!-- ▼▼▼ 希望開始時期 ▼▼▼ -->
    <Radios
      :value="formData.start"
      name="start"
      label="希望開始時期"
      :items="startItems"
      :error-message="errorMessages.start"
      @change="updateFormData($event, 'start')"
    />
    <!-- ▲▲▲ 希望開始時期 ▲▲▲ -->

    <!-- ▼▼▼ 希望職種 ▼▼▼ -->
    <Checkboxes
      :values="formData.jobTypes"
      name="jobTypes"
      label="希望職種"
      :items="jobTypes"
      :error-message="errorMessages.jobTypes"
      @change="updateFormData($event, 'jobTypes')"
    />
    <!-- ▲▲▲ 希望職種 ▲▲▲ -->

    <!-- ▼▼▼ 備考 ▼▼▼ -->
    <Textarea
      v-model="formData.remarks"
      label="備考"
      :placeholder="`${ remarksMaxNum }文字以内`"
      :error-message="errorMessages.remarks"
      @input="updateFormData($event, 'remarks')"
    />
    <!-- ▲▲▲ 備考 ▲▲▲ -->

    <!-- ▼▼▼ 操作ボタン ▼▼▼ -->
    <div class="field is-grouped mt-6">
      <div class="control">
        <button class="button is-link" @click="next">次へ</button>
      </div>
      <div class="control">
        <button class="button is-link is-light" @click="prev">戻る</button>
      </div>
      <div class="control">
        <button class="button is-link is-inverted" @click="clearForm">
          クリア
        </button>
      </div>
    </div>
    <!-- ▲▲▲ 操作ボタン ▲▲▲ -->
  </div>
</template>

<script>
import StepMixin from '@/mixins/step'
import Radios from '@/components/Radios.vue'
import Checkboxes from '@/components/Checkboxes.vue'
import Textarea from '@/components/Textarea.vue'
import { startItems, jobTypes } from '@/constants/formItems'

export default {
  name: 'Step2',

  components: {
    Radios,
    Checkboxes,
    Textarea,
  },

  mixins: [StepMixin],

  data() {
    return {
      formData: {
        start: '',
        jobTypes: [],
        remarks: '',
      },
      errorMessages: {
        start: '',
        jobTypes: '',
        remarks: '',
      },
      startItems,
      jobTypes,
      remarksMaxNum: 20,
    };
  },

  mounted() {
    // stateの値を代入
    this.formData = {
      ...this.formData,
      ...this.$store.getters['step/step2'],
    }
  },

  methods: {
    /**
     * 入力内容をチェックしてエラーがある場合、エラーメッセージを表示
     * @returns boolean チェック結果
     */
    checkForm() {
      let checkResult = true
      // 希望開始時期選択のチェック
      if (!this.formData.start) {
        this.errorMessages.start = '希望開始時期を選択してください'
        checkResult = false
      }
      // 希望職種選択のチェック
      if (!this.formData.jobTypes.length) {
        this.errorMessages.jobTypes = '希望職種を選択してください'
        checkResult = false
      }
      // 備考入力文字数のチェック
      if (this.formData.remarks.length > this.remarksMaxNum) {
        this.errorMessages.remarks = `${ this.remarksMaxNum }文字以内で入力してください`
        checkResult = false
      }
      // チェック結果を返す
      return checkResult
    },

    /**
     * 入力内容をクリア
     */
    clearForm() {
      for (const [key] of Object.entries(this.formData)) {
        if (key === 'jobTypes') {
          this.formData[key] = [];
        } else {
          this.formData[key] = ''
        }
      }
      for (const [key] of Object.entries(this.errorMessages)) {
        this.errorMessages[key] = ''
      }
      // storeデータをクリア
      this.$store.dispatch('step/clearStep2')
    },

    /**
     * 次の入力ページへ移動
     */
    next() {
      // フォームのチェック結果がfalseの場合、アラート表示して処理を終了
      if (!this.checkForm()) {
        alert('入力内容に不備があります')
        return
      }
      // データをstateに反映してからページ遷移
      this.$store.dispatch('step/updateStep2', this.formData)
      this.$router.push('step3')
    },

    /**
     * 前のページへ移動
     */
    prev() {
      // データをstateに反映してからページ遷移
      this.$store.dispatch('step/updateStep2', this.formData)
      this.$router.push('step1')
    },
  },
}
</script>
