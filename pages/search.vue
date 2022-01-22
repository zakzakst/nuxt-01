<template>
  <div>
    <h1 class="title">検索</h1>
    <Pagination
      :total="105"
      :per-page="20"
      :start="80"
      centered
      rounded
    />
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
