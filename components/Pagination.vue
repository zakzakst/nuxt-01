<template>
  <div>
    <nav class="pagination" :class="navClass">
      <!-- 前に戻るボタン -->
      <a
        v-if="currentNum > 1"
        class="pagination-previous"
        @click="onClickNavPrev"
        >Prev</a
      >
      <!-- 次に進むボタン -->
      <a
        v-if="currentNum < navTotal"
        class="pagination-next"
        @click="onClickNavNext"
        >Next</a
      >
      <!-- ページネーション -->
      <ul class="pagination-list">
        <!-- 最初に戻るボタン -->
        <template v-if="!showNums.includes(1)">
          <li>
            <a class="pagination-link" @click="onClickNav(1)">1</a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
        </template>
        <!-- 表示ボタン -->
        <li v-for="num in showNums" :key="num">
          <a
            class="pagination-link"
            :class="{ 'is-current': num === currentNum }"
            @click="onClickNav(num)"
            >{{ num }}</a
          >
        </li>
        <!-- 末尾に進むボタン -->
        <template v-if="!showNums.includes(navTotal)">
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a class="pagination-link" @click="onClickNav(navTotal)">{{
              navTotal
            }}</a>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    currentNum: {
      type: Number,
      default: 1,
    },
    centered: {
      type: Boolean,
    },
    rounded: {
      type: Boolean,
    },
  },

  computed: {
    navTotal() {
      return Math.ceil(this.total / this.perPage)
    },
    showNums() {
      if (this.currentNum === 1) {
        // 現在のナビゲーションが1の場合
        const items = []
        for (let i = 0; i < this.navTotal; i++) {
          items.push(i + 1)
        }
        return items.slice(0, 3)
      } else if (this.currentNum === this.navTotal) {
        // 現在のナビゲーションが総数と同じ場合
        const items = []
        for (let i = this.navTotal; i > 0; i--) {
          items.unshift(i)
        }
        return items.slice(-3)
      } else {
        return [this.currentNum - 1, this.currentNum, this.currentNum + 1]
      }
    },
    navClass() {
      return {
        'is-centered': this.centered,
        'is-rounded': this.rounded,
      }
    },
  },

  methods: {
    onClickNav(num) {
      this.$emit('onClickNav', num)
    },
    onClickNavPrev() {
      this.$emit('onClickNavPrev')
    },
    onClickNavNext() {
      this.$emit('onClickNavNext')
    },
  },
}
</script>
