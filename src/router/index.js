import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout/index.vue'
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'

Vue.use(VueRouter)

// 无需验证权限的路由
const constantRoutes = [
  // 404
  {
    path: '/404',
    hidden: true,
    component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/404.vue')
  },
  // 401
  {
    path: '/401',
    hidden: true,
    component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/401.vue')
  },
  // 登录页
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },
  // 首页
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
  // 文档
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation'),
        meta: {
          title: '文档'
        }
      }
    ]
  },
  // 引导页
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide'),
        meta: {
          title: '引导页'
        }
      }
    ]
  },
  // 个人中心
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Personal',
        component: () => import(/* webpackChunkName: "personal" */ '@/views/personal/index'),
        meta: {
          title: 'personal'
        }
      }
    ]
  }
]

// 动态添加的路由
export const asyncRoutes = [
  // 权限测试页
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: '',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        name: 'PagePermission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/page'),
        meta: {
          title: '页面权限',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        name: 'DirectivePermission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/directive'),
        meta: {
          title: '指令权限'
        }
      },
      {
        path: 'role',
        name: 'RolePermission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/role'),
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },
  // 图标
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Icons',
        component: () => import(/* webpackChunkName: "icon" */ '@/views/icons/index'),
        meta: {
          title: '图标',
          icon: '',
          noCache: true
        }
      }
    ]
  },
  // 组件
  componentsRouter,
  // 图表
  chartsRouter,
  // table
  tableRouter,
  // 综合实例
  {
    path: '/example',
    name: 'Example',
    component: Layout,
    meta: {
      title: 'example',
      icon: ''
    },
    children: [
      {
        path: 'create',
        name: 'CreateArticle',
        component: () => import(/* webpackChunkName: "example" */ '@/views/example/create'),
        meta: {
          title: 'createArticle',
          icon: ''
        }
      },
      {
        // 只有id为数字时才会进入此路由
        path: 'edit/:id(\\d+)',
        name: 'EditArticle',
        hidden: true,
        component: () => import(/* webpackChunkName: "example" */ '@/views/example/edit'),
        meta: {
          title: 'editArticle',
          activeMenu: '/example/list'
        }
      },
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import(/* webpackChunkName: "example" */ '@/views/example/list'),
        meta: {
          title: 'articleList',
          icon: ''
        }
      }
    ]
  },
  // tab
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Tab',
        component: () => import(/* webpackChunkName: "tab" */ '@/views/tab/index'),
        meta: {
          title: 'tab',
          icon: ''
        }
      }
    ]
  },
  // 错误页面
  {
    path: '/error',
    component: Layout,
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: ''
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/404'),
        meta: {
          title: 'page404'
        }
      },
      {
        path: '401',
        name: 'Page401',
        component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/401'),
        meta: {
          title: 'page401'
        }
      }
    ]
  },
  // 错误日志
  {
    path: '/error-log',
    component: Layout,
    chlidren: [
      {
        path: 'log',
        name: 'ErrorLog',
        component: () => import(/* webpackChunkName: "errorLog" */ '@/views/error-log/index'),
        meta: {
          title: 'errorLog'
        }
      }
    ]
  },
  // Excel
  {
    path: '/excel',
    name: 'Excel',
    component: Layout,
    meta: {
      title: 'excel',
      icon: ''
    },
    children: [
      {
        path: 'export-excel',
        name: 'ExportExcel',
        component: () => import(/* webpackChunkName: "excel" */ '@/views/excel/export-excel'),
        meta: {
          title: 'exportExcel'
        }
      },
      {
        path: 'export-selected-excel',
        name: 'ExportSelectedExcel',
        component: () => import(/* webpackChunkName: "excel" */ '@/views/excel/export-selected-excel'),
        meta: {
          title: 'exportSelectedExcel'
        }
      },
      {
        path: 'export-merge-header',
        name: 'ExportMergeHeader',
        component: () => import(/* webpackChunkName: "excel" */ '@/views/excel/export-merge-header'),
        meta: {
          title: 'exportMergeHeader'
        }
      },
      {
        path: 'upload-excel',
        name: 'UploadExcel',
        component: () => import(/* webpackChunkName: "excel" */ '@/views/excel/upload-excel'),
        meta: {
          title: 'uploadExcel'
        }
      }
    ]
  },
  // ZIP
  {
    path: '/zip',
    name: 'Zip',
    component: Layout,
    redirect: '/zip/download',
    meta: {
      title: 'zip',
      icon: ''
    },
    children: [
      {
        path: 'download',
        name: 'ExportZip',
        component: () => import(/* webpackChunkName: "zip" */ '@/views/zip/index'),
        meta: {
          title: 'exportZip'
        }
      }
    ]
  },
  // Pdf
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        name: 'PDF',
        component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/index'),
        meta: {
          title: 'pdf',
          icon: ''
        }
      }
    ]
  },
  // 换肤
  {
    path: '/theme',
    component: Layout,
    redirect: '/theme/index',
    children: [
      {
        path: 'index',
        name: 'Theme',
        component: () => import(/* webpackChunkName: "theme" */ '@/views/theme/index'),
        meta: {
          title: 'theme',
          icon: ''
        }
      }
    ]
  },
  // clipboard
  {
    path: '/clipboard',
    component: Layout,
    redirect: '/clipboard/index',
    children: [
      {
        path: 'index',
        name: 'Clipboard',
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/index'),
        meta: {
          title: 'clipboard',
          icon: ''
        }
      }
    ]
  },
  // 国际化
  {
    path: '/i18n',
    component: Layout,
    redirect: '/i18n/index',
    children: [
      {
        path: 'index',
        name: 'I18n',
        component: () => import(/* webpackChunkName: "i18n" */ '@/views/i18n/index'),
        meta: {
          title: 'i18n',
          icon: ''
        }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
