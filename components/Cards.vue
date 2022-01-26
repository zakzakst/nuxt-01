<template>
  <div class="columns is-multiline">
    <div v-for="item in items" :key="item.id" class="column is-one-quarter">
      <div class="card">
        <div class="card-image">
          <LoadingImg :src="item.img" alt="" />
        </div>
        <div class="card-content">
          <p>{{ item.title }}</p>
        </div>
        <footer class="card-footer">
          <a :href="item.link" class="card-footer-item">詳細を見る</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingImg from '@/components/LoadingImg.vue'

export default {
  name: 'Cards',

  components: {
    LoadingImg,
  },

  data() {
    return {
      items: [
        {
          id: 'test1',
          link: '#',
          title: 'テスト1',
          img: 'https://bulma.io/images/placeholders/1280x9601.png',
        },
        {
          id: 'test2',
          link: '#',
          title: 'テスト2',
          img: 'https://picsum.photos/id/237/300/300',
        },
        {
          id: 'test3',
          link: '#',
          title: 'テスト3',
          img: 'https://picsum.photos/id/238/300/300',
        },
        {
          id: 'test4',
          link: '#',
          title: 'テスト4',
          img: 'https://picsum.photos/id/239/300/300',
        },
        {
          id: 'test5',
          link: '#',
          title: 'テスト5',
          img: 'https://picsum.photos/id/240/300/300',
        },
      ],
    }
  },
}
</script>
