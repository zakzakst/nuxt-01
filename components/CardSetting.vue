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
          v-model="settingValue.cardNum"
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
          v-model="settingValue.wantNum"
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
        <select v-model="settingValue.term" class="card-setting__select">
          <option
            v-for="(term, index) in terms"
            :key="index"
            :value="term.value"
          >
            {{ term.label }}
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
      terms: [
        {
          value: 'more',
          label: '以上ドロー',
        },
        {
          value: 'test',
          label: 'テスト',
        },
      ],
    }
  },

  computed: {
    settingValue() {
      return this.setting
    },
  },

  watch: {
    settingValue: {
      handler(value) {
        this.$emit('change', value)
      },
      deep: true,
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
