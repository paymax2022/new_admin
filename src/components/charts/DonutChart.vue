<template>
  <div>
    <canvas ref="donutCanvas"></canvas>
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
const donutCanvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const createChart = () => {
  if (!donutCanvas.value || !props.data) return
  
  try {
    // Destroy existing chart if it exists
    if (chart) {
      chart.destroy()
      chart = null
    }
    
    chart = new Chart(donutCanvas.value, {
      type: 'doughnut',
      data: props.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        ...props.options
      }
    })
  } catch (error) {
    console.error('Error creating donut chart:', error)
  }
}

const destroyChart = () => {
  if (chart) {
    try {
      chart.destroy()
      chart = null
    } catch (error) {
      console.error('Error destroying donut chart:', error)
    }
  }
}

onMounted(() => {
  nextTick(() => {
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



