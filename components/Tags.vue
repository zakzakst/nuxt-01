<template>
  <div v-show="tags.length" class="tags">
    <span v-for="tag in tags" :key="tag.id" class="tag" :class="tagClass">
      {{ tag.label }}
      <button class="delete is-small" @click="onClickDelete(tag.id)"></button>
    </span>
  </div>
</template>

<script>
import { COLORS } from '@/constants/colors'

export default {
  name: 'Tags',

  props: {
    tags: {
      type: Array,
      required: true,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      validator(val) {
        return ['', ...COLORS].includes(val)
      },
      default: '',
    },
  },

  computed: {
    tagClass() {
      const result = {
        'is-rounded': this.rounded,
        'is-light': this.light,
      }
      if (this.color) {
        result[`is-${this.color}`] = true
      }
      return result
    },
  },

  methods: {
    onClickDelete(id) {
      this.$emit('onClickDelete', id)
    },
  },
}
</script>
