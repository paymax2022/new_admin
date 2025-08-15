<template>
  <div>
    <canvas ref="lineCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

interface Props {
  data: any
  options?: any
}

const props = defineProps<Props>()
const lineCanvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const createChart = () => {
  if (!lineCanvas.value || !props.data) {
    console.log('LineChart: Missing canvas or data', { canvas: !!lineCanvas.value, data: !!props.data })
    return
  }
  
  try {
    console.log('LineChart: Creating chart with data:', props.data)
    
    // Destroy existing chart if it exists
    if (chart) {
      chart.destroy()
      chart = null
    }
    
    chart = new Chart(lineCanvas.value, {
      type: 'line',
      data: props.data,
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
        },
        ...props.options
      }
    })
    
    console.log('LineChart: Chart created successfully')
  } catch (error) {
    console.error('Error creating line chart:', error)
  }
}

const destroyChart = () => {
  if (chart) {
    try {
      chart.destroy()
      chart = null
    } catch (error) {
      console.error('Error destroying chart:', error)
    }
  }
}

onMounted(() => {
  console.log('LineChart: Component mounted, data:', props.data)
  nextTick(() => {
    console.log('LineChart: Next tick, creating chart')
    createChart()
  })
})

onBeforeUnmount(() => {
  destroyChart()
})

watch(() => props.data, () => {
  if (props.data) {
    destroyChart()
    nextTick(() => {
      createChart()
    })
  }
}, { deep: true })

watch(() => props.options, () => {
  if (props.data) {
    destroyChart()
    nextTick(() => {
      createChart()
    })
  }
}, { deep: true })
</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
  position: relative;
}

canvas {
  height: 100% !important;
  width: 100% !important;
}
</style>
