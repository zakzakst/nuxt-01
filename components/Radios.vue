<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <label
        v-for="(item, index) in items"
        :key="index"
        class="radio"
      >
        <input ref="radioEl" type="radio" :name="name" :value="item.value" @change="changeCheckedItem($event)">
        {{ item.label }}
      </label>
    </div>
    <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Radios',

  props: {
    value: {
      type: String,
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
    value() {
      this.updateCheckedItem();
    },
  },

  mounted() {
    this.updateCheckedItem();
  },

  methods: {
    updateCheckedItem() {
      this.$refs.radioEl.forEach((el) => {
        if (el.value === this.value) {
          el.checked = true;
        } else {
          el.checked = false;
        }
      });
    },
    changeCheckedItem(event) {
      this.$emit('change', event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.radio {
  & + & {
    margin-left: 1em;
  }
}
</style>
