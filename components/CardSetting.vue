<template>
  <div class="card-setting">
    <div class="card-setting__head">
      <p class="label mb-0">{{ label }}</p>
      <button
        v-if="canDelete"
        class="card-setting__head-delete button is-small is-rounded"
        @click="onClickDelete"
      >
        削除
      </button>
    </div>
    <div class="card-setting__content mt-2 is-size-7">
      <span class="card-setting__content-item">
        投入枚数
        <input
          v-model="cardNum"
          class="card-setting__number"
          type="number"
          min="0"
          step="1"
        />
        枚
      </span>
      <span class="card-setting__divider">／</span>
      <span class="card-setting__content-item">
        希望枚数
        <input
          v-model="wantNum"
          class="card-setting__number"
          type="number"
          min="0"
          step="1"
        />
        枚
      </span>
      <span class="card-setting__divider">／</span>
      <span class="card-setting__content-item">
        条件
        <select v-model="term" class="card-setting__select">
          <option
            v-for="(option, index) in termOptions"
            :key="index"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSetting',

  props: {
    setting: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      termOptions: [
        {
          value: 'more',
          label: '希望枚数以上ドロー',
        },
        {
          value: 'test',
          label: 'テスト',
        },
      ],
    }
  },

  computed: {
    cardNum: {
      get() {
        return this.setting.cardNum
      },
      set(val) {
        this.$emit('change', { prop: 'cardNum', value: Number(val) })
      },
    },
    wantNum: {
      get() {
        return this.setting.wantNum
      },
      set(val) {
        this.$emit('change', { prop: 'wantNum', value: Number(val) })
      },
    },
    term: {
      get() {
        return this.setting.term
      },
      set(val) {
        this.$emit('change', { prop: 'term', value: val })
      },
    },
  },

  methods: {
    onClickDelete() {
      this.$emit('delete')
    },
  },
}
</script>

<style lang="scss" scoped>
.card-setting {
  padding-bottom: 1em;
  &:not(:first-child) {
    padding-top: 1em;
    border-top: 1px dotted $c_border;
  }
  &__head {
    display: flex;
    align-items: center;
    height: 30px;
  }
  &__head-delete {
    flex-shrink: 0;
    margin-left: auto;
  }

  &__content-item {
    display: block;
    padding: 4px 0;
    @include Mq(md) {
      display: inline-block;
      padding: 0;
    }
  }

  &__number,
  &__select {
    display: inline-block;
    border: 1px solid $c_border_light;
    border-radius: 4px;
    margin: 0 4px;
  }
  &__number {
    width: 40px;
  }

  &__divider {
    display: none;
    margin: 0 12px;
    @include Mq(md) {
      display: inline-block;
    }
  }
}
</style>
