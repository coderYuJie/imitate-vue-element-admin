<template>
  <div class="login">
    <div class="content">
      <h3 class="login-title">
        {{$t('login.title')}}
        <select-language></select-language>
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
            ref="password"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            :type="inputType">
            <template v-slot:suffix>
              <span  @click="handleInput">
                <svg-icon :icon="inputIcon"></svg-icon>
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleLogin" type="primary" :loading="loading" class="login-btn">{{$t("login.login")}}</el-button>
          <div class="other">
            <div class="tips">
              <span>{{$t('login.username')}} : admin</span> <span>{{$t('login.password')}} : {{$t('login.tip')}}</span>
            </div>
            <div class="tips">
              <span>{{$t('login.username')}} : editor</span> <span>{{$t('login.password')}} : {{$t('login.tip')}}</span>
            </div>

            <el-button @click="handleOther" type="primary">{{$t('login.other')}}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <!-- 第三方登录dialog -->
    <el-dialog
      :title="$t('login.other')"
      :visible.sync="dialogVisible"
      width="50%">
      <span>
        <div>{{ $t('login.otherTip') }}</div>
        <div class="sgin-container">
          <div @click="handleSgin" class="sign-btn">
            <span class="svg-container wechat">
              <svg-icon icon="wechat"></svg-icon>
            </span> WeChat
          </div>
          <div @click="handleSgin" class="sign-btn">
            <span class="svg-container qq">
              <svg-icon icon="qq"></svg-icon>
            </span> QQ
          </div>
        </div>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import selectLanguage from '@/components/select-language/selectLanguage'
export default {
  components: { selectLanguage },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        if (value === 'admin' || value === 'editor') {
          callback()
        } else {
          callback(new Error('请输入正确的用户名'))
        }
      }
    }

    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为6到12个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      inputType: 'password',
      dialogVisible: false
    }
  },
  computed: {
    inputIcon () {
      return this.inputType === 'password' ? 'eye' : 'eye-open'
    }
  },
  methods: {
    async handleLogin () {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        this.$store.dispatch('user/login', this.loginForm).then(() => {
          console.log(11)
          this.$router.push({ path: this.$route.query.redirect || '/' })
          console.log(22)
          this.loading = false
        })
      } catch (e) {
        this.loading = false
        this.$message.error(e)
      }
    },
    handleInput () {
      this.$refs.password.focus()
      this.inputType = this.inputType === 'password' ? 'text' : 'password'
    },
    handleOther () {
      this.dialogVisible = true
    },
    handleSgin () {
      alert('OK')
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    height: 100%;
    background-color: $login-bgc;
    position: relative;

    .content {
      @include box-center();
      width: 400px;

      .login-title {
        position: relative;
        font-size: 26px;
        font-weight: 700;
        color: #eee;
        line-height: 40px;
        text-align: center;
        margin-bottom: 20px;

        .select-language {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      /deep/ .el-form {
        .login-btn {
          width: 100%;
          margin-bottom: 10px;
        }

        /deep/ .svg-icon {
          fill: #ccc;
          margin-right: 4px;
          cursor: pointer;
        }

        .other {
          position: relative;

          .tips {
            color:#fff;
            span {
              &:first-child {
                margin-right: 10px;
              }
            }
          }

          .el-button {
            @include box-center-y(right);
          }
        }
      }
    }
    /deep/ .el-dialog {
      .sgin-container {
        display: flex;
        margin: 30px 0;
        .sign-btn {
          cursor: pointer;
          margin-right: 20px;
          width: 25%;
          .svg-container {
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 5px;

            text-align: center;
            line-height: 32px;
          }
          .wechat {
            background-color: $wechat-bgc;
          }
          .qq {
            background-color: $qq-bgc;
          }
          .svg-icon {
            font-size: 22px;
            margin-top: 8px;
          }
        }
      }
    }
  }
</style>
