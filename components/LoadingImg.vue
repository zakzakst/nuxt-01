<template>
  <div class="loading-img" :class="{ 'is-loading': isLoading }">
    <p v-if="isError" class="loading-img__error is-size-7">画像取得に失敗しました</p>
    <img
      v-else
      :src="src"
      :alt="alt"
      class="loading-img__img"
      @load="onLoad"
      @error="onError"
    >
  </div>
</template>

<script>
export default {
  name: 'LoadingImg',

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      isLoading: true,
      isError: false,
    }
  },

  methods: {
    onLoad() {
      this.isLoading = false
    },
    onError() {
      this.isLoading = false
      this.isError = true
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-img {
  position: relative;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  aspect-ratio: 2 / 1;
  overflow: hidden;
  &.is-loading {
    @include Skeleton();
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @at-root .loading-img.is-loading & {
      display: none;
    }
  }

  &__error {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ddd;
    color: #888;
    padding: 1em;
    text-align: center;
  }
}
</style>
