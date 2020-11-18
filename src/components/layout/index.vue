<template>
  <div class="layout" :class="{'hide-sidebar': isCollapse }">
    <aside class="aside" :style="{'width':sideWidth}">
      <router-link v-if="logo" class="logo-link" to="/">
        <div class="logo">
          <img src="@/assets/logo.png" alt="">
          <h1>Vue Element Admin</h1>
        </div>
      </router-link>
      <div class="side-bar">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          unique-opened
          router
          collapse-transition
          :default-active="currentRoute"
          background-color="rgb(48, 65, 86)"
          text-color="#bfcbd9">
          <sidebar-item v-for="item in sideBar" :key="item.path" :item="item" :base-path="item.path"></sidebar-item>
        </el-menu>
      </div>
    </aside>
    <div class="container" :style="{'padding-top': handlePadding}">
      <header
        class="header"
        :style="{'height': handleHeight}"
        :class="{'is-fixed': headerFixed}">
        <nav-bar :isCollapse="isCollapse" @toggle="toggleCollapse"></nav-bar>
        <tags-view v-if="tagsView"></tags-view>
      </header>
      <el-main>
        <transition name="fade-transform">
          <app-main></app-main>
        </transition>
        <right-panel></right-panel>
      </el-main>
    </div>
  </div>
</template>

<script>
import sidebarItem from './sideBarItem'
import navBar from './navBar'
import tagsView from './tagsView'
import appMain from './appMain'
import rightPanel from './rightPanel'
export default {
  components: { sidebarItem, navBar, tagsView, appMain, rightPanel },
  data () {
    return {
      isCollapse: false,
      drawer: false
    }
  },
  computed: {
    sideWidth () {
      return this.isCollapse ? '69px' : '210px'
    },
    sideBar () {
      return this.$store.state.verify.routes
    },
    currentRoute () {
      return this.$route.fullPath
    },
    tagsView () {
      return this.$store.state.setting.tagsView
    },
    handleHeight () {
      return this.tagsView ? '90px' : '50px'
    },
    headerFixed () {
      return this.$store.state.setting.headerFixed
    },
    handlePadding () {
      return this.headerFixed ? this.handleHeight : ''
    },
    logo () {
      return this.$store.state.setting.logo
    }
  },
  methods: {
    toggleCollapse (value) {
      this.isCollapse = value
    },
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  },
  mounted () {
    // console.log(this.$store.state.verify.routes)
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  &.hide-sidebar {
    .header.is-fixed {
      width: calc(100% - 64px);
    }
    .aside {
      .logo h1 {
        display: none;
      }
    }
  }
  .container {
    display: block;
    flex: 1;
    min-height: 100%;
    overflow-y: auto;
  }
  .aside {
    background-color: rgb(48, 65, 86);
    transition: all .5s;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    .logo-link {
      display: block;
      height: 50px;
    }

    .logo {
      display: flex;
      height: 50px;
      align-items: center;
      padding-left: 20px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #2b2f3a;

      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
      h1 {
        font-size: 14px;
        color: #fff;
      }
    }
    .side-bar {
      flex: 1;
      overflow-y: auto;
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
    /deep/.el-menu {
      border-right: none;
      .el-menu-item {
        &.is-active {
          .icon {
            fill: $navbarActiveColor;
          }
        }
      }
    }
    /deep/.el-menu--collapse {
      .el-submenu {
        &>.el-submenu__title {
          &>span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }
    }
  }
  .header {
    padding: 0;
    transition: all .5s;
    background-color: #fff;
    &.is-fixed {
      position: fixed;
      width: calc(100% - 210px);
      top: 0;
      z-index: 9999;
    }
  }
  .toggle-drawer {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
    font-size: 26px;
    color: #fff;
    border-radius: 5px 0 0 5px;
    background-color: #ccc;
  }
  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}

</style>
