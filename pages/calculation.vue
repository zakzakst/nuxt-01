<template>
  <div class="pb-6">
    <h2 class="is-size-4">ゲーム設定</h2>
    <div class="box mt-2">
      <div class="columns mb-0">
        <div class="column is-one-third">
          <label class="label">マリガン</label>
          <div class="control">
            <Select
              :value="gameSettings.canMulligan"
              :options="mulliganSelects"
              full-width
              @change="updateGameSettings($event, 'canMulligan')"
            />
          </div>
        </div>
        <div class="column is-one-third">
          <InputNumber
            v-model="gameSettings.deckNum"
            label="デッキ枚数"
            :min="0"
            :step="1"
            @input="updateGameSettings($event, 'deckNum')"
          />
        </div>
        <div class="column is-one-third">
          <InputNumber
            v-model="gameSettings.firstMoveNum"
            label="初手枚数"
            :min="0"
            :step="1"
            @input="updateGameSettings($event, 'firstMoveNum')"
          />
        </div>
      </div>
      <p class="has-text-right is-size-7">
        <a href="#" @click.prevent="saveGameSettings"
          >▶現在のゲーム設定を保存する</a
        >
      </p>
    </div>
    <div v-if="cardSettings.length">
      <h2 class="is-size-4 mt-4">カード設定</h2>
      <div class="box mt-2">
        <CardSetting
          v-for="(cardSetting, index) in cardSettings"
          :key="index"
          :label="`カード${index + 1}`"
          :setting="cardSetting"
          :can-delete="cardSettings.length > 1"
          @change="onChangeCardSetting($event, index)"
          @delete="deleteCardSetting(index)"
        />
        <div>
          <button class="button is-fullwidth is-light" @click="addCardSetting">
            追加
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <ChartCalculation :chart-data="chartData" :options="chartOptions" />
    </div>
    <div class="bottom-control">
      <div class="container is-max-desktop">
        <div class="section py-4">
          <div class="columns">
            <div class="column is-half">
              <button
                class="button is-rounded is-white is-fullwidth"
                @click="chartUpdate"
              >
                計算する
              </button>
            </div>
            <div class="column is-half">
              <ButtonTooltip
                :disabled="false"
                label="結果URLをコピー"
                :message="resultMessage"
                full-width
                rounded
                color="white"
                @click="onClickButtonTooltip"
                @messageHideDone="onHideTooltip"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from '@/components/InputNumber'
import Select from '@/components/Select.vue'
import CardSetting from '@/components/CardSetting.vue'
import ButtonTooltip from '@/components/ButtonTooltip.vue'
import ChartCalculation from '@/components/ChartCalculation'

export default {
  name: 'Calculation',

  components: {
    InputNumber,
    Select,
    CardSetting,
    ButtonTooltip,
    ChartCalculation,
  },

  data() {
    return {
      storageKey: 'game_settings',
      initialCardSetting: {
        cardNum: 0,
        wantNum: 0,
        term: 'more',
      },
      mulliganSelects: [
        { value: 'none', label: '無し' },
        { value: 'duplicate', label: '選択無／重複有' },
      ],
      gameSettings: {
        canMulligan: 'none',
        deckNum: 40,
        firstMoveNum: 5,
      },
      cardSettings: [],
      resultMessage: '',
      chartData: {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [
          {
            label: '確率',
            backgroundColor: 'rgba(72, 95, 199, 0.5)',
            borderColor: 'rgba(72, 95, 199, 1)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        // title: {
        //   display: true,
        //   text: '各ターンの確率',
        // },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'ドロー枚数',
                fontSize: 16,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                max: 100,
                min: 0,
                stepSize: 10,
                // 末尾に「%」を入れる
                callback: (value) => {
                  return value + '%'
                },
              },
              scaleLabel: {
                display: true,
                labelString: '確率',
                fontSize: 16,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          // enabled: false,
          callbacks: {
            title(items, data) {
              return 'ドロー' + items[0].label + '枚目'
            },
            label(item) {
              return '確率' + item.value + '%'
            },
          },
        },
      },
    }
  },

  mounted() {
    const params = this.getParams()
    if (params) {
      // URLにパラメータが設定されている場合、その値を反映
      this.gameSettings = params.gameSettings
      this.cardSettings = params.cardSettings
    } else {
      // URLにパラメータが設定されていない場合、ストレージのゲーム設定を反映
      this.getGameSettings()
    }
    // カード設定初期化
    const cardSetting = JSON.parse(JSON.stringify(this.initialCardSetting))
    this.cardSettings.push(cardSetting)
  },

  methods: {
    updateGameSettings(event, prop) {
      // ゲーム設定の更新
      this.gameSettings[prop] = event
    },
    addCardSetting() {
      // 新規カード設定を追加
      const cardSetting = JSON.parse(JSON.stringify(this.initialCardSetting))
      this.cardSettings.push(cardSetting)
    },
    onChangeCardSetting(event, index) {
      // カード設定の更新
      this.cardSettings[index][event.prop] = event.value
    },
    deleteCardSetting(index) {
      // 指定した番号のカード設定を削除
      this.cardSettings.splice(index, 1)
    },
    getGameSettings() {
      // ローカルストレージからゲーム設定を取得
      const gameSettings = localStorage.getItem(this.storageKey)
      // ゲーム設定がある場合、設定を反映
      if (gameSettings) {
        this.gameSettings = JSON.parse(gameSettings)
      }
    },
    saveGameSettings() {
      // ローカルストレージにゲーム設定を保存
      localStorage.setItem(this.storageKey, JSON.stringify(this.gameSettings))
    },
    onClickButtonTooltip() {
      // 結果URLをクリップボードにコピー後、メッセージを表示
      if (navigator.clipboard) {
        // TODO: アップロード時エラー確認
        // const base = location.protocol + location.host + location.pathname
        const base = location.host + location.pathname
        const paramsObj = {
          gameSettings: this.gameSettings,
          cardSettings: this.cardSettings,
        }
        const params = encodeURIComponent(JSON.stringify(paramsObj))
        navigator.clipboard.writeText(base + '?params=' + params)
        this.resultMessage = 'コピーしました'
      }
    },
    onHideTooltip() {
      // ツールチップ非表示後、メッセージを初期化
      this.resultMessage = ''
    },
    getParams() {
      const params = location.search
      if (!params) return null
      return JSON.parse(decodeURIComponent(params.replace('?params=', '')))
    },
    chartUpdate() {
      // TODO: 計算してデータ更新
      this.chartData.datasets[0].data = [0, 0, 0, 0, 0, 0, 10, 50, 0, 50]
      // watchを発火させる（※deepを利用したところchart.jsのupdate関数でループが起こってしまったため、このように対応）
      this.chartData = { ...this.chartData }
    },
  },
}
</script>

<style lang="scss" scoped>
.bottom-control {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: $c_primary;
  z-index: $z_nav;
}
</style>
