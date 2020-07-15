// table路由配置

import Layout from '@/components/layout'

const tableRouter = {
  path: '/table',
  name: 'Table',
  component: Layout,
  meta: {
    title: 'table',
    icon: ''
  },
  children: [
    {
      path: 'dynamic-table',
      name: 'DynamicTable',
      component: () => import(/* webpackChunkName: "table" */ '@/views/table/dynamic-table'),
      meta: {
        title: 'dynamicTable'
      }
    },
    {
      path: 'drag-table',
      name: 'DragTable',
      component: () => import(/* webpackChunkName: "table" */ '@/views/table/drag-table'),
      meta: {
        title: 'dragTable'
      }
    },
    {
      path: 'inline-edit-table',
      name: 'InlineEditTable',
      component: () => import(/* webpackChunkName: "table" */ '@/views/table/inline-edit-table'),
      meta: {
        title: 'inlineEditTable'
      }
    }
  ]
}

export default tableRouter
