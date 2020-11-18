<template>
  <div v-if="isHide" class="sidebar-item">
    <template v-if="isOnePath(item.children,item) && ( !oneChild.children || oneChild.noShowingChildren)">
      <el-menu-item :index="resolvePath(oneChild.path)">
        <svg-icon class="icon" v-show="item.children" :icon="oneChild.meta.icon ||'' "></svg-icon>
        <span slot="title">{{generateTitle(oneChild.meta.title)}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(oneChild.path)">
        <template slot="title">
          <svg-icon class="icon" v-show="item.meta && item.meta.icon" :icon="item.meta.icon"></svg-icon>
          <span slot="title">{{ generateTitle(item.meta.title)}}</span>
        </template>
        <sidebar-item v-for="subItem in item.children" :key="subItem.path" :item="subItem" :base-path="resolvePath(subItem.path)"></sidebar-item>
      </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import generateTitle from '@/utils/i18n'
export default {
  name: 'sidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.oneChild = null
    return {
    }
  },
  computed: {
    isHide () {
      return !this.item.hidden
    }
  },
  methods: {
    generateTitle,
    isOnePath (child = [], parent) {
      const filterList = child.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.oneChild = item
          return true
        }
      })
      if (filterList.length === 1) {
        return true
      }
      if (filterList.length === 0) {
        this.oneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-item {
  .icon {
    width: 24px !important;
    margin-right: 6px;
  }

  /deep/.el-menu-item:focus, .el-menu-item:hover, {
    background-color: rgba(0,0,0,.2) !important;
  }
  /deep/.el-submenu .el-submenu__title:hover {
    background-color: rgba(0,0,0,.2) !important;
  }
  /deep/.el-menu--inline .el-menu-item {
    background-color: rgba(0,0,0,.3) !important;
  }
  /deep/.el-menu--inline .el-menu-item:focus,.el-menu--inline .el-menu-item:hover {
    background-color: #001528 !important;
  }
}

</style>
