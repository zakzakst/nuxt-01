<template>
  <div>
    <h1 class="title">STEP1：プロフィール入力</h1>

    <!-- ▼▼▼ 名前入力 ▼▼▼ -->
    <InputText
      v-model="formData.name"
      label="名前"
      placeholder="山田太郎"
      :error-message="errorMessages.name"
      @input="updateFormData($event, 'name')"
    />
    <!-- ▲▲▲ 名前入力 ▲▲▲ -->

    <!-- ▼▼▼ 住所入力 ▼▼▼ -->
    <InputText
      v-model="formData.address"
      label="住所"
      placeholder="東京都千代田区〇-〇〇-〇〇"
      :error-message="errorMessages.address"
      @input="updateFormData($event, 'address')"
    />
    <!-- ▲▲▲ 住所入力 ▲▲▲ -->

    <!-- ▼▼▼ 生年月日入力 ▼▼▼ -->
    <div class="field">
      <label class="label">生年月日</label>
      <div class="control step-form__birth">
        <div class="select">
          <Select
            :value="formData.birthYear"
            :options="birthYears"
            :class="{ 'is-danger': errorMessages.birth }"
            @change="updateFormData($event, 'birthYear')"
          />
        </div>
        <span>年</span>
        <div class="select">
          <Select
            :value="formData.birthMonth"
            :options="birthMonths"
            :class="{ 'is-danger': errorMessages.birth }"
            @change="updateFormData($event, 'birthMonth')"
          />
        </div>
        <span>月</span>
        <div class="select">
          <Select
            :value="formData.birthDay"
            :options="birthDays"
            :class="{ 'is-danger': errorMessages.birth }"
            @change="updateFormData($event, 'birthDay')"
          />
        </div>
        <span>日</span>
      </div>
      <p v-if="errorMessages.birth" class="help is-danger">
        {{ errorMessages.birth }}
      </p>
    </div>
    <!-- ▲▲▲ 生年月日入力 ▲▲▲ -->

    <!-- ▼▼▼ 操作ボタン ▼▼▼ -->
    <div class="field is-grouped mt-6">
      <div class="control">
        <button class="button is-link" @click="next">次へ</button>
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
import InputText from '@/components/InputText.vue'
import Select from '@/components/Select.vue'
import { birthYears, birthMonths, birthDays } from '@/constants/formItems'

export default {
  name: 'Step1',

  components: {
    InputText,
    Select,
  },

  mixins: [StepMixin],

  data() {
    return {
      formData: {
        name: '',
        address: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
      },
      errorMessages: {
        name: '',
        address: '',
        birth: '',
      },
      birthYears,
      birthMonths,
      birthDays,
    }
  },

  mounted() {
    // stateの値を代入
    this.formData = {
      ...this.formData,
      ...this.$store.getters['step/step1'],
    }
  },

  methods: {
    /**
     * 入力内容をチェックしてエラーがある場合、エラーメッセージを表示
     * @returns boolean チェック結果
     */
    checkForm() {
      let checkResult = true
      // 名前入力のチェック
      if (!this.formData.name) {
        this.errorMessages.name = '名前を入力してください'
        checkResult = false
      }
      // 住所入力のチェック
      if (!this.formData.address) {
        this.errorMessages.address = '住所を入力してください'
        checkResult = false
      }
      // 生年月日選択のチェック
      if (
        !this.formData.birthYear ||
        !this.formData.birthMonth ||
        !this.formData.birthDay
      ) {
        this.errorMessages.birth = '生年月日を選択してください'
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
        this.formData[key] = ''
      }
      for (const [key] of Object.entries(this.errorMessages)) {
        this.errorMessages[key] = ''
      }
      // storeデータをクリア
      this.$store.dispatch('step/clearStep1')
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
      this.$store.dispatch('step/updateStep1', this.formData)
      this.$router.push('/step2')
    },
  },
}
</script>

<style lang="scss" scoped>
.step-form {
  &__birth {
    display: flex;
    align-items: flex-end;
    & > span {
      display: inline-block;
      padding: 0 0.25em;
    }
  }
}
</style>
