<template>
  <div>
    <h1 class="title">検索</h1>

    <!-- ▼▼▼ キーワード ▼▼▼ -->
    <InputButton
      v-model="keyword"
      button-text="追加"
      placeholder="キーワード"
      button-color="link"
      @onClickButton="onClickButton"
      @onKeyPressEnter="onKeyPressEnter"
    />
    <Tags
      :tags="tags"
      rounded
      light
      color="link"
      @onClickDelete="onClickDelete"
    />
    <!-- ▲▲▲ キーワード ▲▲▲ -->

    <!-- ▼▼▼ 職種フィルター ▼▼▼ -->
    <Checkboxes
      :values="jobFilter"
      name="jobTypes"
      label="職種"
      :items="jobTypes"
      @change="updateJobFilter($event)"
    />
    <!-- ▲▲▲ 職種フィルター ▲▲▲ -->

    <!-- ▼▼▼ 検索結果 ▼▼▼ -->
    <Cards :items="cardItems" />
    <Pagination
      :total="205"
      :per-page="20"
      :current-num="currentNum"
      centered
      rounded
      @onClickNav="onClickNav"
      @onClickNavPrev="onClickNavPrev"
      @onClickNavNext="onClickNavNext"
    />
    <!-- ▲▲▲ 検索結果 ▲▲▲ -->
  </div>
</template>

<script>
import Cards from '@/components/Cards.vue'
import Checkboxes from '@/components/Checkboxes.vue'
import InputButton from '@/components/InputButton.vue'
import Pagination from '@/components/Pagination.vue'
import Tags from '@/components/Tags.vue'
import { jobTypes } from '@/constants/formItems'

export default {
  name: 'Search',

  components: {
    Cards,
    Checkboxes,
    InputButton,
    Pagination,
    Tags,
  },

  data() {
    return {
      keyword: '',
      tags: [],
      tagIndex: 1,
      currentNum: 1,
      jobTypes,
      jobFilter: [],
      cardItems: [
        {
          id: 'test1',
          link: '#',
          title: 'テスト1',
          img: '',
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

  methods: {
    onClickNav(num) {
      this.currentNum = num
    },
    onClickNavPrev() {
      this.currentNum -= 1
    },
    onClickNavNext() {
      this.currentNum += 1
    },
    updateJobFilter(event) {
      console.log(event)
    },
    onClickDelete(id) {
      const target = this.tags.find((tag) => {
        return tag.id === id
      })
      const tagIndex = this.tags.indexOf(target)
      this.tags.splice(tagIndex, 1)
    },
    onClickButton() {
      if (!this.keyword) return
      this.addKeyWords(this.keyword)
      this.keyword = ''
    },
    onKeyPressEnter() {
      if (!this.keyword) return
      this.addKeyWords(this.keyword)
      this.keyword = ''
    },
    addKeyWords(keyword) {
      this.tags.push({
        id: this.tagIndex,
        label: keyword,
      })
      this.tagIndex += 1
    },
  },
}
</script>
