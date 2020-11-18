<template>
  <div class="nav-bar">
    <div class="switch">
      <span :class="{'el-icon-s-fold': !isCollapse,'el-icon-s-unfold': isCollapse}" @click="toggle"></span>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
      v-for="(item,index) in breadcrumbList"
      :key="item.path">
        <span v-if="index === (breadcrumbList.length - 1)">{{generateTitle(item.meta.title)}}</span>
        <router-link v-else :to="{path: item.path}">{{generateTitle(item.meta.title)}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="right-menu">
      <div class="search" @click="showSearchInput"><svg-icon icon="search"></svg-icon></div>
      <el-input ref="searchInp" :class="{'show-input': searchInput}" v-model="queryKey" type="text" placeholder="Search" size="small"></el-input>
      <div @click="fullScreen" class="fullscreen"><svg-icon icon="fullscreen"/></div>
       <el-tooltip class="item" effect="dark" content="布局大小" placement="bottom">
         <select-size></select-size>
      </el-tooltip>
      <select-language></select-language>
      <el-dropdown
        @command="handleCommand"
        trigger="click">
          <span class="el-dropdown-link">
            <el-avatar :size="40" :src="avatar"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="dashboard">首页</el-dropdown-item>
            <el-dropdown-item command="address">项目地址</el-dropdown-item>
            <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import selectLanguage from '../select-language/selectLanguage'
import svgIcon from '../svg-icon/svgIcon'
import selectSize from '../select-size/index'
import generateTitle from '@/utils/i18n'

export default {
  name: 'navBar',
  components: {
    selectLanguage,
    svgIcon,
    selectSize
  },
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      searchInput: false,
      queryKey: '',
      breadcrumbList: []
    }
  },
  created () {
    this.getBreadcrumbList()
  },
  computed: {
    avatar () {
      return this.$store.state.user.avatar
    }
  },
  methods: {
    generateTitle,
    toggle () {
      this.$emit('toggle', !this.isCollapse)
    },
    handleCommand (val) {
      console.log(val)
      if (val === 'personal') {
        this.$router.push('/personal')
      } else if (val === 'dashboard') {
        this.$router.push('/dashboard')
      } else if (val === 'address') {
        window.open('https://github.com/coderYuJie/imitate-vue-element-admin')
      } else if (val === 'logOut') {
        this.logOut()
      }
    },
    showSearchInput () {
      this.searchInput = !this.searchInput
      this.$refs.searchInp.focus()
    },
    // 全屏
    fullScreen () {
      var iFullscreen = false // 当前是否全屏状态
      var fullscreenEnabled = document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled

      if (fullscreenEnabled) {
        const de = document.documentElement
        if (iFullscreen) {
          // 关闭全屏
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
        } else {
          // 打开全屏
          if (de.requestFullscreen) {
            de.requestFullscreen()
          } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen()
          } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen()
          }
        }
      } else {
        alert('浏览器当前不能全屏')
      }
    },
    getBreadcrumbList () {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched.unshift({
          path: '/dashboard',
          name: 'Dashboard',
          meta: {
            title: 'dashboard',
            icon: 'dashboard'
          }
        })
      }
      this.breadcrumbList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      if (route && route.name && route.name === 'Dashboard') {
        return true
      }
      return false
    },
    logOut () {
      this.$store.dispatch('user/logOut').then(() => {
        this.$router.push('/login')
      })
    }
  },
  watch: {
    $route (route) {
      this.getBreadcrumbList()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  align-items: stretch;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  overflow: hidden;
  .switch {
    padding: 0 18px;
    height: 100%;
    font-size: 20px;
    cursor: pointer;
    transition: all .3s;
    margin-right: 5px;
    &:hover {
      background-color: $hoverBgc;
    }
  }
  /deep/.el-breadcrumb {
    flex: 1;
    line-height: 50px;
    font-size: 14px;
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
      font-weight: 400;
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    padding: 0 10px;
    /deep/.svg-icon {
      font-size: 18px;
      fill: $currentColor;
      padding: 0 10px;
      cursor: pointer;
    }
    /deep/.el-input--small .el-input__inner {
      padding: 0;
      border:none;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      width: 0;
      transition: all .3s;
    }
    /deep/.el-input--small.show-input .el-input__inner {
      width: 210px;
    }
    .el-dropdown {
      cursor: pointer;
      padding: 0 10px;
      /deep/.el-avatar {
        margin-top: 19px;
      }
      &:hover {
        background-color: $hoverBgc;
      }
    }
  }
}
</style>
