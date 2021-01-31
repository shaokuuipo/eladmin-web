<template>
  <div id="app">
    <router-view />
    <register
      v-if="registerDialog"
      :show-dialog="registerDialog"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
// /oauth/redirect/?source=gitee&code=2&state=3
import { getQueryString } from '@/utils/url'
import { validatenull } from '@/utils/validate'
import register from '@/components/Register'
export default {
  name: 'App',
  components: { register },
  data() {
    return { registerDialog: false }
  },
  created() {
    const topUrl = window.location.href.split('?')[0]
    const redirectUrl = '/oauth/redirect/'
    if (topUrl.includes(redirectUrl)) {
      const loginForm = {}
      loginForm.source = topUrl.substring(topUrl.lastIndexOf('/') + 1)
      loginForm.code = getQueryString('code')
      loginForm.state = getQueryString('state')
      if (
        !validatenull(loginForm.source) &&
        !validatenull(loginForm.code) &&
        !validatenull(loginForm.state)
      ) {
        const loading = this.$loading({
          lock: true,
          text: '系统登录中,请稍后。。。',
          spinner: 'el-icon-loading'
        })
        this.$store.dispatch('LoginBySocial', loginForm).then((res) => {
          if (res && res.toBind) {
            this.registerDialog = true
            this.$router.push({ path: '/login' })
            loading.close()
            return
          }
          window.location.href = topUrl.split(redirectUrl)[0]
          this.$router.push({ path: '/dashboard' })
          loading.close()
        }).catch(() => {
          loading.close()
        })
      }
    }
  },
  methods: {
    closeDialog() {
      this.registerDialog = false
    }
  }
}
</script>
