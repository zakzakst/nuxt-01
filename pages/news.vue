<template>
  <div>
    <Tabs :items="items" :active-id="activeId" boxed @clickTab="clickTab" />
  </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'News',

  components: {
    Tabs,
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
      activeId: '',
    }
  },

  mounted() {
    this.activeId = this.items[0].id
  },

  methods: {
    clickTab(id) {
      this.activeId = id;
    },
  },
}
</script>
