<template>
  <div>
    <h1 class="title">STEP3：入力内容の確認</h1>

    <!-- ▼▼▼ 入力内容 ▼▼▼ -->
    <table class="table is-striped is-fullwidth">
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <th>{{ row.label }}</th>
          <td>{{ row.value }}</td>
        </tr>
      </tbody>
    </table>
    <!-- ▲▲▲ 入力内容 ▲▲▲ -->

    <!-- ▼▼▼ 操作ボタン ▼▼▼ -->
    <div class="field is-grouped mt-6">
      <div class="control">
        <button class="button is-link" @click="submit">
          この入力内容で送信
        </button>
      </div>
      <div class="control">
        <button class="button is-link is-light" @click="prev">戻る</button>
      </div>
    </div>
    <!-- ▲▲▲ 操作ボタン ▲▲▲ -->
  </div>
</template>

<script>
import StepMixin from '@/mixins/step'
import { startItems, jobTypes } from '@/constants/formItems'

export default {
  name: 'Step3',

  mixins: [StepMixin],

  computed: {
    tableData() {
      const data = this.$store.getters['step/all']
      const checkedStartItem = startItems.find((item) => {
        return item.value === data.start
      })
      const checkedJobTypes = jobTypes
        .filter((type) => data.jobTypes.includes(type.value))
        .map((type) => type.label)
      return [
        {
          label: '名前',
          value: data.name,
        },
        {
          label: '住所',
          value: data.address,
        },
        {
          label: '生年月日',
          value: `${data.birthYear}年${data.birthMonth}月${data.birthDay}日`,
        },
        {
          label: '希望開始時期',
          value: checkedStartItem?.label,
        },
        {
          label: '希望職種',
          value: checkedJobTypes.join('、'),
        },
        {
          label: '備考',
          value: data.remarks,
        },
      ]
    },
  },

  methods: {
    /**
     * 送信
     */
    async submit() {
      this.$store.dispatch('loader/setLoading', true)
      try {
        // 送信処理
        const response = await this.$store.dispatch('step/submit')
        alert('【送信内容】\n' + JSON.stringify(response))
        this.$store.dispatch('loader/setLoading', false)
        // 処理完了後storeのデータをクリア
        this.$store.dispatch('step/clearAll')
        // 送信完了ページへ移動
        this.$router.push('/')
      } catch (error) {
        this.$store.dispatch('loader/setLoading', false)
        // エラー時の処理
      }
    },

    /**
     * 前のページへ移動
     */
    prev() {
      this.$router.push('step2')
    },
  },
}
</script>
