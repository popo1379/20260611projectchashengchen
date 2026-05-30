import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore('system', () => {
  const open = ref(false)
  const officialAccount = ref(false)
  const navbar = ref('甲子纪年')
  const title = ref('农历 · 公历 · 转换')
  const mainBtn = ref('开始转换')
  const share = ref(false)
  const qrcode = ref('')
  const officialAccountBtn = ref('查看详细信息')
  const modalText = ref('查看详细排盘')

  async function getSystemConfig() {
    // Web 版本使用默认配置，不再请求微信 API
    // 可以在这里加载本地配置或从服务器获取
    navbar.value = '甲子纪年'
    title.value = '农历 · 公历 · 转换'
    mainBtn.value = '开始转换'
    share.value = false
  }

  return {
    open,
    officialAccount,
    navbar,
    title,
    mainBtn,
    share,
    qrcode,
    officialAccountBtn,
    modalText,
    getSystemConfig
  }
})
