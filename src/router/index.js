import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout/index.vue'

Vue.use(VueRouter)

// {
// path: '/about',
// name: 'About'
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// }
const routes = [
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/errorPage/404.vue')
  },
  {
    path: '/401',
    hidden: true,
    component: () => import('@/views/errorPage/401.vue')
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import('@/views/documentation'),
        meta: {
          title: '文档'
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    children: [
      {
        path: 'page',
        name: 'Page',
        component: () => import('@/views/permission/page'),
        meta: {
          title: '文档',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'directive',
        name: 'Directive',
        component: () => import('@/views/permission/directive'),
        meta: {
          title: '指令权限'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
