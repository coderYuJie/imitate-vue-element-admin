<template>
  <el-container class="layout">
    <el-aside :width="sideWidth">
      <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      unique-opened
      router
      collapse-transition
      background-color="#545c64"
      text-color="#fff">
        <sidebar-item v-for="item in sideBar" :key="item.path" :item="item" :base-path="item.path"></sidebar-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="80px">
        <nav-bar :isCollapse="isCollapse" @toggle="toggleCollapse"></nav-bar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sidebarItem from './sideBarItem'
import navBar from './navBar'
export default {
  components: { sidebarItem, navBar },
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    sideWidth () {
      return this.isCollapse ? '56px' : '210px'
    },
    sideBar () {
      return this.$store.state.verify.routes
    }
  },
  methods: {
    toggleCollapse (value) {
      this.isCollapse = value
    }
  },
  mounted () {
    // console.log(this.$store.state.verify.routes)
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .el-aside {
    background-color: #545c64;
    transition: all .5s;
    overflow-x: hidden;
    /deep/.el-menu {
      border-right: none;

    }
    &::-webkit-scrollbar {
      width: 5px; /*对垂直流动条有效*/
    }
    &::-webkit-scrollbar-track{
      background-color: #545c64;
      border-radius: 3px;
    }
    /*定义滑块颜色、内阴影及圆角*/
    &::-webkit-scrollbar-thumb{
      border-radius: 7px;
      background-color: rgba(255,255,255,.2);
    }
  }
  .el-header {
    padding: 0;
  }
}

</style>
