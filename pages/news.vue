<template>
  <div>
    <Tabs :items="items" :active-id="activeId" boxed @clickTab="clickTab" />
    <div v-html="content"></div>
  </div>
</template>

<script>
import axios from 'axios'
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
      content: '',
    }
  },

  watch: {
    activeId() {
      this.getContent()
    },
  },

  mounted() {
    this.activeId = this.items[0].id
    this.getContent()
  },

  methods: {
    clickTab(id) {
      this.activeId = id;
    },
    async getContent() {
      const { data } = await axios.get('/nuxt/01/data/news.json')
      this.content = data[this.activeId]
    },
  },
}
</script>
