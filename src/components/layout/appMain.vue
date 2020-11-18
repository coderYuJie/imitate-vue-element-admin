<template>
  <keep-alive :include="cachedViews">
     <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    }
  },
  updated () {
    console.log(this.cachedViews, '111')
  }
}
</script>

<style>

</style>
