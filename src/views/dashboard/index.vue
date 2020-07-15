<template>
  <div class="dashboard">
    <button @click="CH">中文</button>
    <button @click="EN">English</button>
    {{ $t('title')}}
  </div>
</template>

<script>
export default {
  methods: {
    CH () {
      this.$i18n.locale = 'zh'
    },
    EN () {
      this.$i18n.locale = 'en'
    }
  }
}
</script>

<style>

</style>
