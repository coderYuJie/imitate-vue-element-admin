<template>
  <div class="login">
    <span @click="login">login</span>
  </div>
</template>

<script>
import { login } from '../../api/user'
export default {
  data () {
    return {

    }
  },
  methods: {
    login () {
      login({ username: 'admin', password: '111111' }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>
