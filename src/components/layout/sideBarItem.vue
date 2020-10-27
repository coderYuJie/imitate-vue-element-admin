<template>
  <div v-if="isHide" class="sidebar-item">
    <template v-if="isOnePath(item.children,item) && ( !oneChild.children || oneChild.noShowingChildren)">
      <el-menu-item :m-index="resolvePath(oneChild.path)" :index="resolvePath(oneChild.path)">
        <svg-icon v-show="item.children" icon="icon"></svg-icon>
        <span slot="title">{{oneChild.meta.title}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :m-index="resolvePath(oneChild.path)" :index="resolvePath(oneChild.path)">
        <template slot="title">
          <svg-icon v-show="item.meta && item.meta.icon" icon="icon"></svg-icon>
          <span slot="title">{{ item.meta.title}}</span>
        </template>
        <sidebar-item v-for="subItem in item.children" :key="subItem.path" :item="subItem" :base-path="resolvePath(subItem.path)"></sidebar-item>
      </el-submenu>
  </div>
</template>

<script>
import path from 'path'
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
      // console.log(routePath, this.basePath)
      // console.log(path.resolve(this.basePath, routePath))
      return path.resolve(this.basePath, routePath)
    }
  },
  mounted () {
    // console.log(this.item)
  }
}
</script>

<style>

</style>
