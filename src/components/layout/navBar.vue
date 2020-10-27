<template>
  <div class="nav-bar">
    <div class="switch">
      <span :class="{'el-icon-s-fold': !isCollapse,'el-icon-s-unfold': isCollapse}" @click="toggle"></span>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">{{ $t('routes.dashboard') }}</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="right-menu">
      <div class="search" @click="showSearchInput"><svg-icon icon="search"></svg-icon></div>
      <el-input ref="searchInp" :class="{'show-input': searchInput}" v-model="queryKey" type="text" placeholder="Search" size="small"></el-input>
      <div class="fullscreen"><svg-icon icon="fullscreen"/></div>
       <el-tooltip class="item" effect="dark" content="布局大小" placement="bottom">
         <select-size></select-size>
      </el-tooltip>
      <select-language></select-language>
      <el-dropdown
        @command="handleCommand"
        trigger="click">
          <span class="el-dropdown-link">
            <el-avatar :size="40" src="circleUrl"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">首页</el-dropdown-item>
            <el-dropdown-item command="c">项目地址</el-dropdown-item>
            <el-dropdown-item command="d">Docs</el-dropdown-item>
            <el-dropdown-item command="e">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import selectLanguage from '../select-language/selectLanguage'
import svgIcon from '../svg-icon/svgIcon'
import selectSize from '../select-size/index'
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
      queryKey: ''
    }
  },
  methods: {
    toggle () {
      this.$emit('toggle', !this.isCollapse)
    },
    handleCommand () {

    },
    showSearchInput () {
      this.searchInput = !this.searchInput
      this.$refs.searchInp.focus()
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
