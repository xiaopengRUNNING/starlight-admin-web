<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
</script>

<style scoped></style>
