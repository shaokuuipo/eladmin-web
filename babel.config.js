const plugins = ['@vue/babel-plugin-transform-vue-jsx']
// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}
module.exports = {
  //vscode调试设置
  "env": {
    "development": {
      "sourceMaps": true,
      "retainLines": true,
    }
  },
  plugins: plugins,
  presets: [
    '@vue/app'
  ]
}
