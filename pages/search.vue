<template>
  <div>
    <h1 class="title">検索</h1>
    <Pagination
      :total="105"
      :per-page="20"
      :current-num="currentNum"
      centered
      rounded
      @onClickNav="onClickNav"
      @onClickNavPrev="onClickNavPrev"
      @onClickNavNext="onClickNavNext"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Search',

  components: {
    Pagination,
  },

  data() {
    return {
      currentNum: 1,
    }
  },

  methods: {
    onClickNav(num) {
      this.currentNum = num
    },
    onClickNavPrev() {
      this.currentNum -= 1
    },
    onClickNavNext() {
      this.currentNum += 1
    },
  },
}
</script>
