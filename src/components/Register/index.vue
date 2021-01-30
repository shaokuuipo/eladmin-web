<template>
  <el-dialog title="账号绑定" :visible.sync="openStatus" width="300px" @close="doClose">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我没有账号" name="first">
        <el-form ref="regForm" label-position="right" :model="regForm" :rules="rules">
          <el-form-item
            label="账号"
            prop="account"
          >
            <el-input
              v-model="regForm.account"
              placeholder="登录账号"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="regForm.password"
              type="password"
              placeholder="密码"
              autocomplete="off"
            >
              <svg-icon
                slot="prefix"
                icon-class="password"
                class="el-input__icon input-icon"
              />
            </el-input>
          </el-form-item>
          <el-form-item
            label="验证密码"
            prop="password2"
          >
            <el-input
              v-model="regForm.password2"
              type="password"
              placeholder="再输入一次密码"
              autocomplete="off"
            >
              <svg-icon
                slot="prefix"
                icon-class="password"
                class="el-input__icon input-icon"
              />
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        label="我有账号"
        name="second"
      >关闭本窗口，直接登录即可绑定</el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="doClose">关 闭</el-button>
      <el-button
        v-if="activeName == 'first'"
        type="primary"
        @click="register"
      >注 册</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: false
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.regForm.password2 !== '') {
          this.$refs.regForm.validateField('password2')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      openStatus: this.showDialog,
      activeName: 'first',
      regForm: {},
      loginForm: {},
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        password2: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  watch: {
    showDialog(val) {
      this.openStatus = val
    }
  },
  methods: {
    doClose() {
      this.$emit('closeDialog', false)
    },
    register() {

    }
  }
}
</script>
