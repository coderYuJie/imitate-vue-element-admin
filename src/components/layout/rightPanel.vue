<template>
  <div :class="{'show': show}" class="right-panel">
    <div class="panel-mask"></div>
    <div class="panel-content">
      <span @click="showPanel" class="panel-switch" :class="handelBtnClass"></span>
      <h3 class="panel-title">系统布局配置</h3>
      <div class="panel-item">
        <span>主题色</span>
        <el-color-picker
        size="mini"
        v-model="color"
        :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"></el-color-picker>
      </div>
      <div class="panel-item">
        <span>开启tags-view</span>
        <el-switch :value="tagsView" @input="toggleTagsView"></el-switch>
      </div>
      <div class="panel-item">
        <span>固定Header</span>
        <el-switch :value="headerFixed" @input="toggleHeaderFixed"></el-switch>
      </div>
      <div class="panel-item">
        <span>侧边栏Logo</span>
        <el-switch :value="logo" @input="toggleLogo"></el-switch>
      </div>
      <div class="panel-item">
        <span>菜单支持拼音搜索</span>
        <el-switch :value="pinyin" @input="togglePinyin"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      color: '#409EFF'
    }
  },
  computed: {
    handelBtnClass () {
      return this.show ? 'el-icon-close' : 'el-icon-setting'
    },
    tagsView () {
      return this.$store.state.setting.tagsView
    },
    headerFixed () {
      return this.$store.state.setting.headerFixed
    },
    logo () {
      return this.$store.state.setting.logo
    },
    pinyin () {
      return this.$store.state.setting.pinyin
    }
  },
  methods: {
    showPanel () {
      this.show = !this.show
    },
    toggleTagsView (val) {
      this.$store.dispatch('setting/changeTagsView', val)
    },
    toggleHeaderFixed (val) {
      this.$store.dispatch('setting/changeHeaderFixed', val)
    },
    toggleLogo (val) {
      this.$store.dispatch('setting/changeLogo', val)
    },
    togglePinyin (val) {
      this.$store.dispatch('setting/changePinyin', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-panel {
  &.show {
    .panel-content {
      transform: translate(0);
    }
    .panel-mask {
      z-index: 40000;
      opacity: 1;
    }
  }
  .panel-content {
    width: 100%;
    max-width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
    transition: all .25s cubic-bezier(.7, .3, .1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
    padding: 24px;

    .panel-title {
      margin-bottom: 12px;
      font-size: 14px;
      color: rgba(0, 0, 0, .85);
      line-height: 22px;
    }
    .panel-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding: 12px 0;
      color: rgba(0, 0, 0, .65);
    }

    .panel-switch {
      position: absolute;
      top: 40%;
      right: 100%;
      width: 50px;
      height: 50px;
      text-align: center;
      font-size: 26px;
      line-height: 50px;
      cursor: pointer;
      background-color: rgb(24, 144, 255);
      border-radius: 5px 0 0 5px;
      color: #fff;
    }
  }
  .panel-mask{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0;
    transition: all .3s cubic-bezier(.7, .3, .1, 1);
    background: rgba(0, 0, 0, .2);
    z-index: -1;
  }
}
</style>
<style lang="scss">
.el-color-picker__panel {
  z-index: 40001 !important;
}
</style>
