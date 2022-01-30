<template>
  <div class="tabs" :class="tabsClass">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ 'is-active': item.id === currentId }"
      >
        <a href="#" @click.prevent="onClickTab(item)">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs',

  props: {
    boxed: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      items: [
        {
          id: 'news',
          label: 'ニュース',
        },
        {
          id: 'economy',
          label: '経済',
        },
        {
          id: 'entertainment',
          label: 'エンタメ',
        },
        {
          id: 'sports',
          label: 'スポーツ',
        },
        {
          id: 'domestic',
          label: '国内',
        },
        {
          id: 'international',
          label: '国際',
        },
        {
          id: 'it',
          label: 'IT',
        },
        {
          id: 'science',
          label: '科学',
        },
        {
          id: 'region',
          label: '地域',
        },
      ],
      currentId: 'news',
    }
  },

  computed: {
    tabsClass() {
      return {
        'is-boxed': this.boxed,
      }
    },
  },

  methods: {
    onClickTab(item) {
      console.log(item)
    },
  },
}
</script>
