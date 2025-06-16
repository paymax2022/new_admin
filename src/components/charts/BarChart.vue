<template>
  <div>
    <canvas ref="barCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const barCanvas = ref(null)

onMounted(() => {
  new Chart(barCanvas.value, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Credits',
          data: [3000, 2500, 4000, 3200, 2800, 5000],
          backgroundColor: 'rgba(34, 197, 94, 0.7)'
        },
        {
          label: 'Debits',
          data: [1200, 1500, 1800, 1100, 1400, 2000],
          backgroundColor: 'rgba(239, 68, 68, 0.7)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})
</script>

<style scoped>
div {
  height: auto;
}
</style>
