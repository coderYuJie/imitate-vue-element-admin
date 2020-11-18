import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout/index.vue'
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'

Vue.use(VueRouter)

/*
  meta: {
    breadcrumb: false   // 当值为false时，将不在面包屑导航中渲染，反之则在面包屑中渲染  默认为true
    affix   当值为true时 该会固定展示在面包屑中
    noCache 当值为true时  该组件不会被缓存
  }
*/
// 无需验证权限的路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
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
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
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
          title: 'documentation',
          icon: 'documentation',
          affix: true
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
          title: 'guide',
          icon: 'guide'
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
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        name: 'PagePermission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/page'),
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        name: 'DirectivePermission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/directive'),
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        name: 'RolePermission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/role'),
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  // 图标
  {
    path: '/icon',
    component: Layout,
    meta: {
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        name: 'Icons',
        component: () => import(/* webpackChunkName: "icon" */ '@/views/icons/index'),
        meta: {
          title: 'icon',
          icon: 'icon',
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
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        name: 'CreateArticle',
        component: () => import(/* webpackChunkName: "example" */ '@/views/example/create'),
        meta: {
          title: 'createArticle'
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
          icon: 'tab'
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
      icon: '404'
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
    children: [
      {
        path: 'log',
        name: 'ErrorLog',
        component: () => import(/* webpackChunkName: "errorLog" */ '@/views/error-log/index'),
        meta: {
          title: 'errorLog',
          icon: 'bug'
        }
      }
    ]
  },
  // Excel
  {
    path: '/excel',
    name: 'Excel',
    component: Layout,
    redirect: '/excel/export-excel',
    meta: {
      title: 'excel',
      icon: 'excel'
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
    children: [
      {
        path: 'download',
        name: 'ExportZip',
        component: () => import(/* webpackChunkName: "zip" */ '@/views/zip/index'),
        meta: {
          title: 'zip',
          icon: 'zip'
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
          icon: 'pdf'
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
          icon: 'theme'
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
          icon: 'clipboard'
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
          icon: 'international'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
