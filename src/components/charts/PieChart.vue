<template>
  <div>
    <canvas ref="pieCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const pieCanvas = ref(null)

onMounted(() => {
  new Chart(pieCanvas.value, {
    type: 'pie',
    data: {
      labels: ['Savings', 'Investments', 'Withdrawals', 'Transfers'],
      datasets: [
        {
          label: 'Wallet Distribution',
          data: [300, 200, 150, 100],
          backgroundColor: [
            'rgba(59, 130, 246, 0.6)',
            'rgba(34, 197, 94, 0.6)',
            'rgba(234, 88, 12, 0.6)',
            'rgba(139, 92, 246, 0.6)'
          ]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
})
</script>

<style scoped>
div {
  height: auto;
}
</style>
