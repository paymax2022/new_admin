<template>
  <div>
    <canvas ref="pieCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import walletService from '@/services/walletService'
Chart.register(...registerables)

const pieCanvas = ref(null)
const chartInstance = ref(null)
const isLoading = ref(true)
const walletData = ref([])

// Fetch wallet distribution data
const fetchWalletDistribution = async () => {
  try {
    isLoading.value = true
    const response = await walletService.getWalletCountByCurrency()
    
    if (response.data && response.data.ok) {
      walletData.value = response.data.data || []
    } else {
      // Use mock data if API doesn't return expected format
      walletData.value = [
        { currency: 'USD', count: 300 },
        { currency: 'EUR', count: 200 },
        { currency: 'GBP', count: 150 },
        { currency: 'JPY', count: 100 }
      ]
    }
  } catch (error) {
    console.error('Error fetching wallet distribution data:', error)
    // Use mock data on error
    walletData.value = [
      { currency: 'USD', count: 300 },
      { currency: 'EUR', count: 200 },
      { currency: 'GBP', count: 150 },
      { currency: 'JPY', count: 100 }
    ]
  } finally {
    isLoading.value = false
    createChart()
  }
}

// Create chart with data
const createChart = () => {
  if (pieCanvas.value) {
    const labels = walletData.value.map(item => item.currency)
    const data = walletData.value.map(item => item.count)
    
    chartInstance.value = new Chart(pieCanvas.value, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Wallet Distribution',
            data: data,
            backgroundColor: [
              'rgba(59, 130, 246, 0.6)',
              'rgba(34, 197, 94, 0.6)',
              'rgba(234, 88, 12, 0.6)',
              'rgba(139, 92, 246, 0.6)',
              'rgba(236, 72, 153, 0.6)',
              'rgba(245, 158, 11, 0.6)'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}

onMounted(() => {
  fetchWalletDistribution()
})
</script>

<style scoped>
div {
  height: auto;
}
</style>
