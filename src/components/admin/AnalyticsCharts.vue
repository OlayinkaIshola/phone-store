<template>
  <div class="space-y-6">
    <!-- Sales Overview Chart -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Sales Overview</h3>
        <div class="flex items-center space-x-2">
          <select
            v-model="salesPeriod"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>
      
      <div class="h-80">
        <canvas ref="salesChart" class="w-full h-full"></canvas>
      </div>
    </div>

    <!-- Revenue vs Orders Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Revenue Breakdown</h3>
        <div class="h-64">
          <canvas ref="revenueChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Top Products</h3>
        <div class="h-64">
          <canvas ref="productsChart" class="w-full h-full"></canvas>
        </div>
      </div>
    </div>

    <!-- Customer Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Customer Growth</h3>
        <div class="h-64">
          <canvas ref="customerChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Order Status Distribution</h3>
        <div class="h-64">
          <canvas ref="orderStatusChart" class="w-full h-full"></canvas>
        </div>
      </div>
    </div>

    <!-- Traffic Sources -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="h-64">
          <canvas ref="trafficChart" class="w-full h-full"></canvas>
        </div>
        <div class="space-y-4">
          <div v-for="source in trafficSources" :key="source.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div 
                class="w-4 h-4 rounded-full"
                :style="{ backgroundColor: source.color }"
              ></div>
              <span class="text-sm font-medium text-gray-700">{{ source.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">{{ source.visitors.toLocaleString() }}</div>
              <div class="text-xs text-gray-500">{{ source.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Conversion Rate</h3>
          <TrendingUp class="w-5 h-5 text-green-600" />
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">{{ conversionRate }}%</div>
        <div class="text-sm text-green-600">+2.4% from last month</div>
        <div class="mt-4 h-16">
          <canvas ref="conversionChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Avg. Order Value</h3>
          <DollarSign class="w-5 h-5 text-blue-600" />
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">₦{{ avgOrderValue.toLocaleString() }}</div>
        <div class="text-sm text-blue-600">+8.1% from last month</div>
        <div class="mt-4 h-16">
          <canvas ref="aovChart" class="w-full h-full"></canvas>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Customer Lifetime Value</h3>
          <Users class="w-5 h-5 text-purple-600" />
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">₦{{ clv.toLocaleString() }}</div>
        <div class="text-sm text-purple-600">+5.7% from last month</div>
        <div class="mt-4 h-16">
          <canvas ref="clvChart" class="w-full h-full"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { TrendingUp, DollarSign, Users } from 'lucide-vue-next'

// Chart.js imports (we'll simulate this for now)
interface ChartInstance {
  destroy(): void
  update(): void
}

// Refs for canvas elements
const salesChart = ref<HTMLCanvasElement>()
const revenueChart = ref<HTMLCanvasElement>()
const productsChart = ref<HTMLCanvasElement>()
const customerChart = ref<HTMLCanvasElement>()
const orderStatusChart = ref<HTMLCanvasElement>()
const trafficChart = ref<HTMLCanvasElement>()
const conversionChart = ref<HTMLCanvasElement>()
const aovChart = ref<HTMLCanvasElement>()
const clvChart = ref<HTMLCanvasElement>()

// Chart instances
const chartInstances = ref<ChartInstance[]>([])

// Reactive data
const salesPeriod = ref('30days')
const conversionRate = ref(3.2)
const avgOrderValue = ref(125000)
const clv = ref(450000)

// Traffic sources data
const trafficSources = ref([
  { name: 'Direct', visitors: 12500, percentage: 45, color: '#3B82F6' },
  { name: 'Google Search', visitors: 8200, percentage: 30, color: '#10B981' },
  { name: 'Social Media', visitors: 4100, percentage: 15, color: '#F59E0B' },
  { name: 'Email', visitors: 1900, percentage: 7, color: '#8B5CF6' },
  { name: 'Referrals', visitors: 800, percentage: 3, color: '#EF4444' }
])

// Mock chart creation function
const createChart = (canvas: HTMLCanvasElement, type: string, data: any, options: any = {}) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Set canvas size
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

  // Mock chart rendering based on type
  switch (type) {
    case 'line':
      drawLineChart(ctx, data, rect.width, rect.height)
      break
    case 'bar':
      drawBarChart(ctx, data, rect.width, rect.height)
      break
    case 'doughnut':
      drawDoughnutChart(ctx, data, rect.width, rect.height)
      break
    case 'pie':
      drawPieChart(ctx, data, rect.width, rect.height)
      break
  }

  return {
    destroy: () => ctx.clearRect(0, 0, canvas.width, canvas.height),
    update: () => createChart(canvas, type, data, options)
  }
}

// Mock chart drawing functions
const drawLineChart = (ctx: CanvasRenderingContext2D, data: any, width: number, height: number) => {
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Draw axes
  ctx.strokeStyle = '#E5E7EB'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  // Draw data line
  ctx.strokeStyle = '#3B82F6'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  const points = data.datasets[0].data
  points.forEach((point: number, index: number) => {
    const x = padding + (index / (points.length - 1)) * chartWidth
    const y = height - padding - (point / Math.max(...points)) * chartHeight
    
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  // Draw points
  ctx.fillStyle = '#3B82F6'
  points.forEach((point: number, index: number) => {
    const x = padding + (index / (points.length - 1)) * chartWidth
    const y = height - padding - (point / Math.max(...points)) * chartHeight
    
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  })
}

const drawBarChart = (ctx: CanvasRenderingContext2D, data: any, width: number, height: number) => {
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Draw axes
  ctx.strokeStyle = '#E5E7EB'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  // Draw bars
  const values = data.datasets[0].data
  const maxValue = Math.max(...values)
  const barWidth = chartWidth / values.length * 0.8
  const barSpacing = chartWidth / values.length * 0.2

  values.forEach((value: number, index: number) => {
    const barHeight = (value / maxValue) * chartHeight
    const x = padding + index * (barWidth + barSpacing) + barSpacing / 2
    const y = height - padding - barHeight

    ctx.fillStyle = data.datasets[0].backgroundColor[index] || '#3B82F6'
    ctx.fillRect(x, y, barWidth, barHeight)
  })
}

const drawDoughnutChart = (ctx: CanvasRenderingContext2D, data: any, width: number, height: number) => {
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 2 - 20
  const innerRadius = radius * 0.6

  let currentAngle = -Math.PI / 2
  const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0)

  data.datasets[0].data.forEach((value: number, index: number) => {
    const sliceAngle = (value / total) * 2 * Math.PI
    
    ctx.fillStyle = data.datasets[0].backgroundColor[index]
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
    ctx.closePath()
    ctx.fill()

    currentAngle += sliceAngle
  })
}

const drawPieChart = (ctx: CanvasRenderingContext2D, data: any, width: number, height: number) => {
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 2 - 20

  let currentAngle = -Math.PI / 2
  const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0)

  data.datasets[0].data.forEach((value: number, index: number) => {
    const sliceAngle = (value / total) * 2 * Math.PI
    
    ctx.fillStyle = data.datasets[0].backgroundColor[index]
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.closePath()
    ctx.fill()

    currentAngle += sliceAngle
  })
}

// Initialize charts
const initializeCharts = () => {
  // Destroy existing charts
  chartInstances.value.forEach(chart => chart?.destroy())
  chartInstances.value = []

  // Sales chart
  if (salesChart.value) {
    const salesData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [120000, 190000, 300000, 500000, 200000, 300000],
        backgroundColor: '#3B82F6'
      }]
    }
    const chart = createChart(salesChart.value, 'line', salesData)
    if (chart) chartInstances.value.push(chart)
  }

  // Revenue chart
  if (revenueChart.value) {
    const revenueData = {
      labels: ['Product Sales', 'Shipping', 'Accessories'],
      datasets: [{
        data: [75, 15, 10],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
      }]
    }
    const chart = createChart(revenueChart.value, 'doughnut', revenueData)
    if (chart) chartInstances.value.push(chart)
  }

  // Products chart
  if (productsChart.value) {
    const productsData = {
      labels: ['iPhone 15', 'Samsung S24', 'Google Pixel', 'OnePlus 12'],
      datasets: [{
        data: [45, 30, 15, 10],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6']
      }]
    }
    const chart = createChart(productsChart.value, 'bar', productsData)
    if (chart) chartInstances.value.push(chart)
  }

  // Customer chart
  if (customerChart.value) {
    const customerData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'New Customers',
        data: [50, 75, 100, 125, 90, 110],
        backgroundColor: '#10B981'
      }]
    }
    const chart = createChart(customerChart.value, 'line', customerData)
    if (chart) chartInstances.value.push(chart)
  }

  // Order status chart
  if (orderStatusChart.value) {
    const orderStatusData = {
      labels: ['Completed', 'Processing', 'Shipped', 'Cancelled'],
      datasets: [{
        data: [65, 20, 10, 5],
        backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444']
      }]
    }
    const chart = createChart(orderStatusChart.value, 'pie', orderStatusData)
    if (chart) chartInstances.value.push(chart)
  }

  // Traffic chart
  if (trafficChart.value) {
    const trafficData = {
      labels: trafficSources.value.map(s => s.name),
      datasets: [{
        data: trafficSources.value.map(s => s.visitors),
        backgroundColor: trafficSources.value.map(s => s.color)
      }]
    }
    const chart = createChart(trafficChart.value, 'doughnut', trafficData)
    if (chart) chartInstances.value.push(chart)
  }

  // Mini charts for metrics
  const miniChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      data: [10, 15, 12, 18, 16, 20, 22],
      backgroundColor: '#3B82F6'
    }]
  }

  if (conversionChart.value) {
    const chart = createChart(conversionChart.value, 'line', miniChartData)
    if (chart) chartInstances.value.push(chart)
  }

  if (aovChart.value) {
    const chart = createChart(aovChart.value, 'line', miniChartData)
    if (chart) chartInstances.value.push(chart)
  }

  if (clvChart.value) {
    const chart = createChart(clvChart.value, 'line', miniChartData)
    if (chart) chartInstances.value.push(chart)
  }
}

// Watch for period changes
watch(salesPeriod, () => {
  initializeCharts()
})

onMounted(() => {
  // Small delay to ensure canvas elements are rendered
  setTimeout(initializeCharts, 100)
})

onUnmounted(() => {
  chartInstances.value.forEach(chart => chart?.destroy())
})
</script>
