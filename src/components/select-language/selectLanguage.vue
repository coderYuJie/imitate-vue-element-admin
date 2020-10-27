<template>
  <div class="select-language">
    <el-dropdown trigger="click" @command="changeLang">
      <span class="el-dropdown-link">
        <svg-icon icon="language"></svg-icon>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="locale === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="locale === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    locale () {
      return this.$store.state.setting.locale
    }
  },
  methods: {
    changeLang (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setting/setLocale', lang)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-language {
  /deep/ .el-dropdown {
     .svg-icon {
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
