// 图表路由配置

import Layout from '@/components/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  name: 'Charts',
  chlidren: [
    {
      path: 'keyboard',
      name: 'KeyboardChart',
      component: () => import(/* webpackChunkName: "charts" */ '@/views/charts/keyboard'),
      meta: {
        title: 'keyboardChart'
      }
    },
    {
      path: 'line',
      name: 'LineChart',
      component: () => import(/* webpackChunkName: "charts" */ '@/views/charts/line'),
      meta: {
        title: 'lineChart'
      }
    },
    {
      path: 'mix-chart',
      name: 'MixChart',
      component: () => import(/* webpackChunkName: "charts" */ '@/views/charts/mix-chart'),
      meta: {
        title: 'mixChart'
      }
    }
  ]
}

export default chartsRouter
