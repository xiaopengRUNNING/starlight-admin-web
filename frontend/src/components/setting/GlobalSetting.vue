<template>
  <a-drawer
    :width="300"
    :mask-closable="false"
    :visible="visible"
    ok-text="复制配置"
    cancel-text="关闭"
    @ok="copySettings"
    @cancel="handleCancel"
  >
    <template #title> 页面配置 </template>
    <h5 class="title">内容区域</h5>
    <div class="block">
      <SettingItem
        v-for="item in settingOptions"
        :key="item.key"
        :option="item"
        @change="handleChange"
      />
    </div>
    <a-alert>
      配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置"
      按钮，将配置替换到 appSettings.json 中即可。
    </a-alert>
  </a-drawer>
</template>

<script setup>
import { Notification } from '@arco-design/web-vue'
import { useAppStore } from '@/store'
import { computed, toRaw } from 'vue'
import SettingItem from './SettingItem.vue'

const appStore = useAppStore()

const visible = computed(() => appStore.globalSetting)
const settingOptions = computed(() => [
  { name: '菜单栏', key: 'menu', defaultVal: appStore.menu },
  { name: '底部', key: 'footer', defaultVal: appStore.footer },
  { name: '多页签', key: 'tabBar', defaultVal: appStore.tabBar },
  { name: '顶部菜单栏', key: 'topMenu', defaultVal: appStore.topMenu },
  {
    name: '动态路由',
    key: 'menuFromServer',
    defaultVal: appStore.menuFromServer
  }
])

const handleChange = async ({ value, key }) => {
  if (key === 'menuFromServer' && value) {
    await appStore.getServerMenu()
  }
  appStore.updateSettings({ [key]: value })
}
const handleCancel = () => {
  appStore.updateSettings({ globalSetting: false })
}
const copySettings = async () => {
  const newSetting = toRaw(appStore.$state)
  newSetting.serverMenu = []
  newSetting.globalSetting = false
  try {
    await navigator.clipboard.writeText(JSON.stringify(newSetting))
    appStore.updateSettings({ globalSetting: false })
    Notification.success({ content: '复制成功' })
  } catch (error) {
    Notification.error({ content: `复制失败，失败原因：${error}！` })
  }
}
</script>

<style scoped lang="less">
.title {
  margin: 10px 0;
  font-size: 14px;
}
.block {
  margin-bottom: 24px;
}
</style>
