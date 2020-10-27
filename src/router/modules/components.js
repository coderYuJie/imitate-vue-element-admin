// 组件路由配置

import Layout from '@/components/layout'

const componentsRouter = {
  path: '/components',
  name: 'ComponentDemo',
  components: Layout,
  meta: {
    title: '组件',
    icon: 'icon'
  },
  children: [
    // 富文本编辑器
    {
      path: 'tinymce',
      name: 'TinymceDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/tinymce'),
      meta: {
        title: 'tinymce'
      }
    },
    // markdown 编辑器
    {
      path: 'markdown',
      name: 'MarkdownDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/markdown'),
      meta: {
        title: 'markdown'
      }
    },
    // json 编辑器
    {
      path: 'json-editor',
      name: 'JsonEditorDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/json-editor'),
      meta: {
        title: 'jsonEditor'
      }
    },
    // splitpane
    {
      path: 'split-pane',
      name: 'SplitpaneDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/split-pane'),
      meta: {
        title: 'splitpane'
      }
    },
    // 头像上传
    {
      path: 'avatar-upload',
      name: 'AvatarUploadDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/avatar-upload'),
      meta: {
        title: 'avatarUpload'
      }
    },
    // sticky 吸顶
    {
      path: 'sticky',
      name: 'StickyDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/sticky'),
      meta: {
        title: 'sticky'
      }
    },
    // count to
    {
      path: 'count-to',
      name: 'CountToDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/count-to'),
      meta: {
        title: 'countTo'
      }
    },
    // mixin 小组件
    {
      path: 'mixin',
      name: 'MixinDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/mixin'),
      meta: {
        title: 'mixin'
      }
    },
    // back-to-top 返回顶部
    {
      path: 'back-to-top',
      name: 'BackToTopDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/back-to-top'),
      meta: {
        title: 'backToTop'
      }
    },
    // drag-dialog 可拖拽dialog
    {
      path: 'drag-dialog',
      name: 'DragDialogDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/drag-dialog'),
      meta: {
        title: 'dragDialog'
      }
    },
    // drag-select 可拖拽select
    {
      path: 'drag-select',
      name: 'DragSelectDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/drag-select'),
      meta: {
        title: 'dragSelect'
      }
    },
    // dnd-list 列表拖拽
    {
      path: 'dnd-list',
      name: 'DndListDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/dnd-list'),
      meta: {
        title: 'dndList'
      }
    },
    // drag-kanban 可拖拽看板
    {
      path: 'drag-kanban',
      name: 'DragKanbanDemo',
      component: () => import(/* webpackChunkName: "components-demo" */ '@/views/components-demo/drag-kanban'),
      meta: {
        title: 'dragKanban'
      }
    }
  ]
}

export default componentsRouter
