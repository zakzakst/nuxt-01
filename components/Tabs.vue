<template>
  <div ref="tabs" class="tabs" :class="tabsClass">
    <ul ref="items">
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ 'is-active': item.id === activeId }"
      >
        <a href="#" @click.prevent="onClickTab(item)">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'Tabs',

  props: {
    items: {
      type: Array,
      required: true,
    },
    activeId: {
      type: String,
      default: '',
    },
    boxed: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
    }
  },

  computed: {
    tabsClass() {
      return {
        'is-boxed': this.boxed,
      }
    },
  },

  watch: {
    activeId(newVal) {
      if (!newVal) return
      this.$nextTick(() => {
        this.setActiveTabCenter()
      })
    },
  },

  methods: {
    setActiveTabCenter() {
      // 各要素を取得
      const tabsEl = this.$refs.tabs
      const activeEl = this.$refs.items.querySelector('.is-active')
      // 各要素の位置を取得
      const tabsX = tabsEl.getBoundingClientRect().x
      const activeX = activeEl.getBoundingClientRect().x
      // 各要素の中心を取得
      const tabsCenter = tabsEl.clientWidth / 2 + tabsX
      const activeCenter = activeEl.clientWidth / 2 + activeX
      // スクロール位置を移動
      const scrollLeft = tabsEl.scrollLeft + activeCenter - tabsCenter
      gsap.to(tabsEl, {
        duration: 0.5,
        scrollLeft,
      })
    },
    onClickTab(item) {
      this.$emit('clickTab', item.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: $c_primary;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: $c_border_light;
    border-radius: 4px;
    border: 1px solid $c_primary;
  }
}
</style>
