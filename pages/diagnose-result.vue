<template>
  <div>
    <h1 class="title">診断結果</h1>
    <!-- カウントアップ -->
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">ポイントA</p>
          <p class="title">{{ pointA.toFixed(0) }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">ポイントB</p>
          <p class="title">{{ pointB.toFixed(0) }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">ポイントC</p>
          <p class="title">{{ pointC.toFixed(0) }}</p>
        </div>
      </div>
    </div>
    <!-- グラフ -->
    <div class="diagnose__chart">
      <diagnose-chart :chart-data="chartData" :options="chartOptions" />
    </div>
    <!-- 結果メッセージ表示 -->
    <transition name="slide-up">
      <div
        v-show="messageTitle && messageText"
        class="diagnose__message box content"
      >
        <h2 class="is-size-4">{{ messageTitle }}</h2>
        <p>{{ messageText }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import DiagnoseChart from '@/components/DiagnoseChart'

export default {
  name: 'DiagnoseResult',

  components: {
    DiagnoseChart,
  },

  beforeRouteEnter(to, from, next) {
    // 直接アクセスした場合、診断ページにリダイレクト
    if (!from.name) {
      next('/diagnose')
    }
    next()
  },

  data() {
    return {
      pointA: 0,
      pointB: 0,
      pointC: 0,
      chartData: {
        labels: ['ポイントA', 'ポイントB', 'ポイントC'],
        datasets: [
          {
            label: '診断結果',
            backgroundColor: 'rgba(72, 95, 199, 0.5)',
            borderColor: 'rgba(72, 95, 199, 1)',
            data: [0, 0, 0],
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 25,
            stepSize: 5,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
      messageTitle: '',
      messageText: '',
    }
  },

  mounted() {
    this.countUp()
  },

  methods: {
    countUp() {
      const resultSum = this.$store.getters['diagnose/resultSum']
      if (!resultSum) return
      gsap.to(this.$data, {
        duration: 2,
        pointA: resultSum.pointASum,
        pointB: resultSum.pointBSum,
        pointC: resultSum.pointCSum,
        ease: 'power2.in',
        onComplete: () => {
          // カウントアップが完了したらグラフとメッセージ表示
          this.showGraph()
          this.showText()
        },
      })
    },
    showGraph() {
      const newData = {
        ...this.chartData,
      }
      newData.datasets[0].data = [this.pointA, this.pointB, this.pointC]
      this.chartData = newData
    },
    showText() {
      // TODO: 結果メッセージの内容分岐処理
      this.messageTitle = 'タイトル'
      this.messageText = '内容'
    },
  },
}
</script>

<style lang="scss" scoped>
.diagnose {
  &__chart-wrapper {
    height: 360px;
  }
  &__message {
    position: relative;
    z-index: 1;
  }
}
</style>
