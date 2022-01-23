<template>
  <div>
    <!-- <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
        <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
        <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
      </ul>
    </nav> -->
    <nav class="pagination" :class="navClass">
      <!-- 前に戻るボタン -->
      <a
        v-if="currentNum > 1"
        class="pagination-previous"
        @click="onClickNavPrev"
      >Prev</a>
      <!-- 次に進むボタン -->
      <a
        v-if="currentNum < navTotal"
        class="pagination-next"
        @click="onClickNavNext"
      >Next</a>
      <!-- ページネーション -->
      <ul class="pagination-list">
        <li v-for="num in navTotal" :key="num">
          <a
            class="pagination-link"
            :class="{ 'is-current': num === currentNum }"
            @click="onClickNav(num)"
          >{{ num }}</a>
        </li>
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
      return Math.ceil(this.total / this.perPage);
    },
    navClass() {
      return {
        'is-centered': this.centered,
        'is-rounded': this.rounded,
      };
    },
  },

  methods: {
    onClickNav(num) {
      this.$emit('onClickNav', num);
    },
    onClickNavPrev() {
      this.$emit('onClickNavPrev');
    },
    onClickNavNext() {
      this.$emit('onClickNavNext');
    },
  },
}
</script>
