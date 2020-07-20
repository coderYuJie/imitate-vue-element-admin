<template>
  <div class="login">
    <div class="content">
      <h3 class="login-title">
        {{$t('login.title')}}
        <el-dropdown trigger="click" @command="changeLang">
          <span class="el-dropdown-link">
            <svg-icon icon="language"></svg-icon>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </h3>
      <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm">
      <el-form-item  prop="username">
        <el-input
          prefix-icon="el-icon-user-solid"
          v-model="loginForm.username">
        </el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
          show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading">{{$t("login.login")}}</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '111111111'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [

        ]
      },
      loading: false
    }
  },
  methods: {
    login () {
      login({ username: 'admin', password: '111111' }).then(res => {
        console.log(res)
      })
    },
    handleClick () {
      console.log('111')
    },
    changeLang (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: #2d3a4b;
  position: relative;

  .content {
    position: absolute;
    width: 30%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    .login-title {
      position: relative;
      font-size: 26px;
      font-weight: 700;
      color: #eee;
      line-height: 40px;
      text-align: center;
      margin-bottom: 20px;

      /deep/ .el-dropdown {
        position: absolute;
        top: 0;
        right: 0;

        .svg-icon {
          font-size: 18px;
          cursor: pointer;
        }
      }
    }

    /deep/ .el-form {
      .el-button {
        width: 100%;
      }
    }
  }
}

</style>
