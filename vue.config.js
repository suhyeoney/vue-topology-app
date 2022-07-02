const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // ESLint와 컴포넌트명 규칙 충돌을 방지하기 위해 false로 설정
})
