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
    <div class="bottom-control">
      <div class="container is-max-desktop">
        <div class="section py-4">
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
</template>

<script>
import InputNumber from '@/components/InputNumber'
import Select from '@/components/Select.vue'
import CardSetting from '@/components/CardSetting.vue'
import ButtonTooltip from '@/components/ButtonTooltip.vue'

export default {
  name: 'Calculation',

  components: {
    InputNumber,
    Select,
    CardSetting,
    ButtonTooltip,
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
    }
  },

  mounted() {
    // ゲーム設定初期化
    this.getGameSettings()
    // カード設定初期化
    const cardSetting = JSON.parse(JSON.stringify(this.initialCardSetting))
    this.cardSettings.push(cardSetting)
  },

  methods: {
    updateGameSettings(event, prop) {
      console.log(event, prop)
      this.gameSettings[prop] = event
    },
    addCardSetting() {
      const cardSetting = JSON.parse(JSON.stringify(this.initialCardSetting))
      this.cardSettings.push(cardSetting)
    },
    onChangeCardSetting(event, index) {
      console.log(event, index)
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
        const base = location.protocol + location.host + location.pathname
        // TODO: パラメータ文字列の取得（オブジェクトの文字化とエンコード）
        const params = '?test'
        navigator.clipboard.writeText(base + params);
        this.resultMessage = 'コピーしました'
      }
    },
    onHideTooltip() {
      // ツールチップ非表示後、メッセージを初期化
      this.resultMessage = ''
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
