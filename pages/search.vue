<template>
  <div>
    <h1 class="title">検索</h1>
    <Pagination />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Search',

  components: {
    Pagination,
  },
}
</script>
