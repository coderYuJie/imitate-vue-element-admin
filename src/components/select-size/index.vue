<template>
  <el-dropdown
  @command="handleCommand"
  trigger="click">
    <span class="el-dropdown-link"> <svg-icon icon="size"/></span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="isDisabled(item.value)" v-for="item in sizeData" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'selectSize',
  data () {
    return {
      sizeData: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Samll', value: 'samll' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  methods: {
    handleCommand (value) {
      this.$ELEMENT.size = value
      this.$store.dispatch('setting/setSize', value)
      this.refreshView()
    },
    isDisabled (size) {
      return this.$store.state.setting.size === size
    },
    refreshView () {
      // const route = this.$route.fullPath
      this.$nextTick(() => {
        this.$router.replace('/redirect' + this.$route.path)
      })
    }
  }
}
</script>

<style>

</style>
