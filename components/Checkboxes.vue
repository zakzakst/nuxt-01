<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <label v-for="(item, index) in items" :key="index" class="checkbox">
        <input
          ref="checkboxEl"
          type="checkbox"
          :name="name"
          :value="item.value"
          @change="changeCheckedItems($event)"
        />
        {{ item.label }}
      </label>
    </div>
    <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Checkboxes',

  props: {
    values: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },

  watch: {
    values() {
      this.updateCheckedItem()
    },
  },

  mounted() {
    this.updateCheckedItem()
  },

  methods: {
    updateCheckedItem() {
      this.$refs.checkboxEl.forEach((el) => {
        if (this.values.includes(el.value)) {
          el.checked = true
        } else {
          el.checked = false
        }
      })
    },
    changeCheckedItems() {
      const checkedItems = []
      this.$refs.checkboxEl.forEach((el) => {
        if (el.checked) {
          checkedItems.push(el.value)
        }
      })
      this.$emit('change', checkedItems)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  & + & {
    margin-left: 1em;
  }
}
</style>
