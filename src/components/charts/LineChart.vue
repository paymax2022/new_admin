<template>
  <div>
    <canvas ref="lineCanvas" height="250"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import userService from '@/services/userService'
Chart.register(...registerables)

const lineCanvas = ref(null)
const chartInstance = ref(null)
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Get current year
const currentYear = new Date().getFullYear().toString()

// Fetch user registration data
const fetchUserGrowthData = async () => {
  try {
    // Call with ACTIVE status as it's required by the API
    let response = await userService.getUserRegistrations({ year: currentYear, status: 'ACTIVE' })
    let userData = [120, 200, 300, 400, 500, 650, 700, 750, 800, 850, 900, 950] // Default mock data
    
    if (response.data && response.data.ok) {
      // Process the data - expecting monthly registration counts
      const monthlyData = response.data.data || []
      
      // Reset data array
      userData = Array(12).fill(0)
      
      // Fill in the data from API response
      monthlyData.forEach(item => {
        // Assuming the API returns data with month index (0-11)
        if (item.month >= 0 && item.month < 12) {
          userData[item.month] = item.count
        }
      })
    }
    
    createChart(userData)
  } catch (error) {
    console.error('Error fetching user growth data:', error)
    // Use mock data on error
    createChart([120, 200, 300, 400, 500, 650, 700, 750, 800, 850, 900, 950])
  }
}

// Create chart with data
const createChart = (userData) => {
  if (lineCanvas.value) {
    chartInstance.value = new Chart(lineCanvas.value, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'User Growth',
            data: userData,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
}

onMounted(() => {
  fetchUserGrowthData()
})
</script>

<style scoped>
div {
  height: auto;
}
</style>
