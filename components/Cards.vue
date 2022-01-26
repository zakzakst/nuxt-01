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

  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
