<template>
  <div class="page">
    <div class="title">{{ systemStore.title }}</div>
    
    <div class="input-wrapper" @click="showPicker = true">
      <input 
        type="text" 
        :value="birthdayText" 
        placeholder="请选择出生日期时辰" 
        disabled 
        class="placeholder-input"
      />
    </div>
    
    <button class="btn" @click="handleQuery">{{ systemStore.mainBtn }}</button>
    
    <div v-if="showResult" class="result-container">
      <!-- 基础信息卡片 -->
      <div class="info-card">
        <div class="card-title">基础信息</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">公历</span>
            <span class="value">{{ formatedDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">农历</span>
            <span class="value">{{ lunarInfo.yearName }}{{ lunarInfo.monthName }}{{ lunarInfo.dayName }}</span>
          </div>
          <div class="info-item">
            <span class="label">生肖</span>
            <span class="value">{{ zodiac }}</span>
          </div>
          <div class="info-item">
            <span class="label">星座</span>
            <span class="value">{{ constellation }}</span>
          </div>
        </div>
      </div>

      <!-- 八字排盘 -->
      <div class="info-card">
        <div class="card-title">八字排盘</div>
        <div class="bazi-grid">
          <div class="bazi-pillar">
            <div class="pillar-title">年柱</div>
            <div class="pillar-heaven" :style="heavenColor(eightChar.year.heavenStem.wuxing)">
              {{ eightChar.year.heavenStem.name }}
            </div>
            <div class="pillar-earth" :style="earthColor(eightChar.year.earthBranch.wuxing)">
              {{ eightChar.year.earthBranch.name }}
            </div>
            <div class="pillar-naYin">{{ eightChar.year.sound || '' }}</div>
            <div class="pillar-cangGan" v-if="earthBranchInfo[eightChar.year.earthBranch.name]">
              {{ earthBranchInfo[eightChar.year.earthBranch.name].cangGanDesc.join(' · ') }}
            </div>
          </div>
          
          <div class="bazi-pillar">
            <div class="pillar-title">月柱</div>
            <div class="pillar-heaven" :style="heavenColor(eightChar.month.heavenStem.wuxing)">
              {{ eightChar.month.heavenStem.name }}
            </div>
            <div class="pillar-earth" :style="earthColor(eightChar.month.earthBranch.wuxing)">
              {{ eightChar.month.earthBranch.name }}
            </div>
            <div class="pillar-naYin">{{ eightChar.month.sound || '' }}</div>
            <div class="pillar-cangGan" v-if="earthBranchInfo[eightChar.month.earthBranch.name]">
              {{ earthBranchInfo[eightChar.month.earthBranch.name].cangGanDesc.join(' · ') }}
            </div>
          </div>
          
          <div class="bazi-pillar highlight">
            <div class="pillar-title">日柱（命主）</div>
            <div class="pillar-heaven" :style="heavenColor(eightChar.day.heavenStem.wuxing)">
              {{ eightChar.day.heavenStem.name }}
            </div>
            <div class="pillar-earth" :style="earthColor(eightChar.day.earthBranch.wuxing)">
              {{ eightChar.day.earthBranch.name }}
            </div>
            <div class="pillar-naYin">{{ eightChar.day.sound || '' }}</div>
            <div class="pillar-cangGan" v-if="earthBranchInfo[eightChar.day.earthBranch.name]">
              {{ earthBranchInfo[eightChar.day.earthBranch.name].cangGanDesc.join(' · ') }}
            </div>
          </div>
          
          <div class="bazi-pillar">
            <div class="pillar-title">时柱</div>
            <div class="pillar-heaven" :style="heavenColor(eightChar.hour.heavenStem.wuxing)">
              {{ eightChar.hour.heavenStem.name }}
            </div>
            <div class="pillar-earth" :style="earthColor(eightChar.hour.earthBranch.wuxing)">
              {{ eightChar.hour.earthBranch.name }}
            </div>
            <div class="pillar-naYin">{{ eightChar.hour.sound || '' }}</div>
            <div class="pillar-cangGan" v-if="earthBranchInfo[eightChar.hour.earthBranch.name]">
              {{ earthBranchInfo[eightChar.hour.earthBranch.name].cangGanDesc.join(' · ') }}
            </div>
          </div>
        </div>
      </div>

      <!-- 五行统计 -->
      <div class="info-card">
        <div class="card-title">五行统计</div>
        <div class="wuxing-container">
          <div 
            v-for="(count, wuxing) in wuxingCount" 
            :key="wuxing" 
            class="wuxing-bar"
          >
            <div class="wuxing-label">{{ wuxing }}</div>
            <div class="wuxing-bar-bg">
              <div 
                class="wuxing-bar-fill" 
                :style="wuxingBarStyle(wuxing)"
              ></div>
            </div>
            <div class="wuxing-count">{{ count }}</div>
          </div>
        </div>
        
        <div class="wuxing-analyze">
          <div class="wuxing-item">
            <span class="label">身强身弱</span>
            <span class="value">{{ eightChar.xiyongWuxing?.state || '' }}</span>
          </div>
          <div class="wuxing-item">
            <span class="label">喜用神</span>
            <span class="value">
              <span class="xi">喜{{ eightChar.xiyongWuxing?.xi || '' }}</span>
              <span class="yong">用{{ eightChar.xiyongWuxing?.yong || '' }}</span>
            </span>
          </div>
          <div class="wuxing-item">
            <span class="label">最强五行</span>
            <span class="value">{{ eightChar.xiyongWuxing?.strong?.join('·') || '' }}</span>
          </div>
          <div class="wuxing-item">
            <span class="label">最弱五行</span>
            <span class="value">{{ eightChar.xiyongWuxing?.weak?.join('·') || '' }}</span>
          </div>
        </div>
      </div>
      
      <!-- 日主分析 -->
      <div class="info-card">
        <div class="card-title">日主性格</div>
        <div class="personality-box">
          <div class="personality-header">
            <div class="personality-name">{{ riGanInfo?.name || '' }}日主</div>
            <div class="personality-wuxing" :style="wuxingColor(riGanInfo?.wuxing)">
              {{ riGanInfo?.wuxing || '' }}
            </div>
          </div>
          <div class="personality-content">
            <div class="personality-positive">
              <div class="personality-title">优点</div>
              <div class="personality-text">{{ riGanGeXingInfo?.positive || '' }}</div>
            </div>
            <div class="personality-negative">
              <div class="personality-title">缺点</div>
              <div class="personality-text">{{ riGanGeXingInfo?.negative || '' }}</div>
            </div>
            <div class="personality-career">
              <div class="personality-title">适合职业</div>
              <div class="personality-text">{{ riGanGeXingInfo?.profession || '' }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 十神分析 -->
      <div class="info-card">
        <div class="card-title">十神分析</div>
        <div class="shishen-grid">
          <div class="shishen-item">
            <div class="shishen-label">年干</div>
            <div class="shishen-value">{{ eightChar.year.heavenStemTenStar || '' }}</div>
          </div>
          <div class="shishen-item">
            <div class="shishen-label">月干</div>
            <div class="shishen-value">{{ eightChar.month.heavenStemTenStar || '' }}</div>
          </div>
          <div class="shishen-item">
            <div class="shishen-label">日干</div>
            <div class="shishen-value">元</div>
          </div>
          <div class="shishen-item">
            <div class="shishen-label">时干</div>
            <div class="shishen-value">{{ eightChar.hour.heavenStemTenStar || '' }}</div>
          </div>
        </div>
      </div>
      
      <!-- 大运 -->
      <div class="info-card" v-if="dayunList.length > 0">
        <div class="card-title">大运走势</div>
        <div class="dayun-start">起运：{{ dayunList[0]?.age || '' }}岁</div>
        <div class="dayun-scroll">
          <div class="dayun-list">
            <div v-for="(item, index) in dayunList.slice(0, 5)" :key="index" class="dayun-item">
              <div class="dayun-age">{{ item.age }}岁</div>
              <div class="dayun-ganzhi">{{ item.sixtyCycle }}</div>
              <div class="dayun-year">{{ item.year }}年</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 查看详细解读按钮 -->
      <div class="interpret-btn-box">
        <button class="interpret-btn" @click="showInterpretModal = true">查看详细解读</button>
      </div>
    </div>
    
    <!-- 解读弹窗 -->
    <div v-if="showInterpretModal" class="interpret-modal-mask" @click="showInterpretModal = false"></div>
    <div v-if="showInterpretModal" class="interpret-modal">
      <div class="interpret-header">
        <div class="interpret-title">生辰命理解读</div>
        <div class="interpret-close" @click="showInterpretModal = false">×</div>
      </div>
      <div class="interpret-content">
        <div class="interpret-section">
          <div class="interpret-section-title">日主解读</div>
          <div class="interpret-summary">{{ interpretation.riGan?.summary || '' }}</div>
          <div class="interpret-keywords">关键词：{{ interpretation.riGan?.keywords?.join(' · ') || '' }}</div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">核心优势</div>
            <div class="interpret-detail-text">{{ interpretation.riGan?.advantages || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">注意事项</div>
            <div class="interpret-detail-text">{{ interpretation.riGan?.notes || '' }}</div>
          </div>
        </div>
        
        <div class="interpret-section">
          <div class="interpret-section-title">五行分析</div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">最强五行</div>
            <div class="interpret-detail-text">{{ interpretation.wuxing?.strongest?.strong || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">最弱五行</div>
            <div class="interpret-detail-text">{{ interpretation.wuxing?.weakest?.weak || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">调节建议</div>
            <div class="interpret-detail-text">{{ interpretation.wuxing?.strongest?.tips || '' }}</div>
          </div>
        </div>
        
        <div class="interpret-section">
          <div class="interpret-section-title">事业学业</div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">适合行业</div>
            <div class="interpret-detail-text">{{ interpretation.career?.career?.join('、') || '' }}</div>
          </div>
        </div>
        
        <div class="interpret-section">
          <div class="interpret-section-title">感情婚恋</div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">感情特质</div>
            <div class="interpret-detail-text">{{ interpretation.love?.trait || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">适合伴侣</div>
            <div class="interpret-detail-text">生肖：{{ interpretation.love?.suitable?.join('、') || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">相处建议</div>
            <div class="interpret-detail-text">{{ interpretation.love?.tips || '' }}</div>
          </div>
        </div>
        
        <div class="interpret-section">
          <div class="interpret-section-title">健康养生</div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">对应器官</div>
            <div class="interpret-detail-text">{{ interpretation.health?.organs || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">注意事项</div>
            <div class="interpret-detail-text">{{ interpretation.health?.notes || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">养生建议</div>
            <div class="interpret-detail-text">{{ interpretation.health?.tips || '' }}</div>
          </div>
        </div>
        
        <div class="interpret-section">
          <div class="interpret-section-title">开运建议</div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">幸运颜色</div>
            <div class="interpret-detail-text">{{ interpretation.lucky?.luckyColor || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">幸运数字</div>
            <div class="interpret-detail-text">{{ interpretation.lucky?.luckyNumber || '' }}</div>
          </div>
          <div class="interpret-detail">
            <div class="interpret-detail-title">幸运方位</div>
            <div class="interpret-detail-text">{{ interpretation.lucky?.luckyDirection || '' }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 日期选择器 -->
    <DateTimePicker 
      v-if="showPicker" 
      v-model:date="birthday"
      @confirm="handlePickerConfirm"
      @close="showPicker = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useSystemStore } from '@/stores/system'
import { useRouter } from 'vue-router'
import lunar from '@/lunar'
import DateTimePicker from '@/components/DateTimePicker.vue'
import { heavenStemInfo, earthBranchInfo, riGanGeXing, naYinInfo, riGanInterpretation, wuxingInterpretation, xiYongShenApplication, healthGuide, loveGuide } from '@/data/baziData'

const systemStore = useSystemStore()
const router = useRouter()

const birthday = ref(new Date())
const showPicker = ref(false)
const showResult = ref(false)
const showInterpretModal = ref(false)
const lunarInfo = reactive({
  yearName: '',
  monthName: '',
  dayName: '',
  hourName: ''
})

const eightChar = reactive({
  year: {},
  month: {},
  day: {},
  hour: {},
  ownSign: {},
  bodySign: {},
  fetalOrigin: {},
  detalBreath: {},
  xiyongWuxing: {}
})
const dayunList = ref([])
const interpretation = reactive({
  riGan: {},
  wuxing: {},
  career: {},
  health: {},
  love: {},
  lucky: {}
})

const birthdayText = computed(() => {
  const date = birthday.value
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  return `${year}年${month}月${day}日 ${hour}时`
})

const formatedDate = computed(() => {
  const date = birthday.value
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = date.getHours()
  return `${year}年${month}月${day}日 ${hour}时`
})

const zodiac = computed(() => {
  if (!lunarInfo.yearName) return ''
  const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  const year = parseInt(lunarInfo.yearName)
  const index = (year - 4) % 12
  return zodiacs[index]
})

const constellation = computed(() => {
  const date = birthday.value
  const month = date.getMonth() + 1
  const day = date.getDate()
  const constellations = [
    '摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座',
    '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座'
  ]
  const lastDay = [20, 19, 21, 20, 21, 22, 23, 23, 23, 23, 22, 22]
  let index = month - 1
  if (day > lastDay[index]) index += 1
  if (index >= 12) index = 0
  return constellations[index]
})

const riGanInfo = computed(() => {
  if (!eightChar.day?.heavenStem?.name) return null
  return heavenStemInfo[eightChar.day.heavenStem.name]
})

const riGanGeXingInfo = computed(() => {
  if (!riGanInfo.value?.name) return null
  return riGanGeXing[riGanInfo.value.name]
})

const wuxingCount = computed(() => {
  const counts = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 }
  if (eightChar.year?.heavenStem?.wuxing) counts[eightChar.year.heavenStem.wuxing]++
  if (eightChar.year?.earthBranch?.wuxing) counts[eightChar.year.earthBranch.wuxing]++
  if (eightChar.month?.heavenStem?.wuxing) counts[eightChar.month.heavenStem.wuxing]++
  if (eightChar.month?.earthBranch?.wuxing) counts[eightChar.month.earthBranch.wuxing]++
  if (eightChar.day?.heavenStem?.wuxing) counts[eightChar.day.heavenStem.wuxing]++
  if (eightChar.day?.earthBranch?.wuxing) counts[eightChar.day.earthBranch.wuxing]++
  if (eightChar.hour?.heavenStem?.wuxing) counts[eightChar.hour.heavenStem.wuxing]++
  if (eightChar.hour?.earthBranch?.wuxing) counts[eightChar.hour.earthBranch.wuxing]++
  return counts
})

const wuxingColorMap = {
  '金': { bg: '#f0f0f0', color: '#FFD700' },
  '木': { bg: '#e8f5e9', color: '#4CAF50' },
  '水': { bg: '#e3f2fd', color: '#2196F3' },
  '火': { bg: '#ffebee', color: '#f44336' },
  '土': { bg: '#fff8e1', color: '#FFC107' }
}

const heavenColor = (wuxing) => {
  const color = wuxingColorMap[wuxing] || { bg: '#fff', color: '#333' }
  return { backgroundColor: color.bg, color: color.color, border: `2px solid ${color.color}` }
}

const earthColor = (wuxing) => {
  const color = wuxingColorMap[wuxing] || { bg: '#fff', color: '#333' }
  return { backgroundColor: color.bg, color: color.color, border: `2px solid ${color.color}` }
}

const wuxingColor = (wuxing) => {
  const color = wuxingColorMap[wuxing] || { color: '#333' }
  return { color: color.color }
}

const wuxingBarStyle = (wuxing) => {
  const color = wuxingColorMap[wuxing] || { color: '#333' }
  const maxCount = Math.max(...Object.values(wuxingCount.value))
  const width = maxCount > 0 ? (wuxingCount.value[wuxing] / maxCount * 100) : 0
  return {
    backgroundColor: color.color,
    width: `${width}%`
  }
}

const handlePickerConfirm = () => {
  showPicker.value = false
}

const handleQuery = () => {
  const date = birthday.value
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  
  try {
    const lunarDays = new lunar.LunarDays(year, month, day, hour)
    lunarInfo.yearName = lunarDays.year
    lunarInfo.monthName = lunarDays.monthName
    lunarInfo.dayName = lunarDays.dayName
    lunarInfo.hourName = lunarDays.hourName
    
    const baziResult = lunar.bazi(lunarDays.year, lunarDays.month, lunarDays.day, hour)
    eightChar.year = baziResult.year
    eightChar.month = baziResult.month
    eightChar.day = baziResult.day
    eightChar.hour = baziResult.hour
    eightChar.ownSign = baziResult.ownSign
    eightChar.bodySign = baziResult.bodySign
    eightChar.fetalOrigin = baziResult.fetalOrigin
    eightChar.detalBreath = baziResult.detalBreath
    eightChar.xiyongWuxing = baziResult.xiyongWuxing
    
    try {
      const dayun = lunar.getDecadeFortune(lunarDays.year, lunarDays.month, lunarDays.day, hour, 1)
      dayunList.value = dayun.dayun || []
    } catch (e) {
      console.log('Dayun error:', e)
    }
    
    const riGanName = riGanInfo.value?.name
    const strongestWuxing = eightChar.xiyongWuxing?.strong?.[0] || '木'
    const weakestWuxing = eightChar.xiyongWuxing?.weak?.[0] || '木'
    const xiWuxing = eightChar.xiyongWuxing?.xi || '木'
    
    interpretation.riGan = riGanInterpretation[riGanName] || {}
    interpretation.wuxing = {
      strongest: wuxingInterpretation[strongestWuxing] || wuxingInterpretation['木'],
      weakest: wuxingInterpretation[weakestWuxing] || wuxingInterpretation['木']
    }
    interpretation.career = xiYongShenApplication[xiWuxing] || xiYongShenApplication['木']
    interpretation.health = healthGuide[xiWuxing] || healthGuide['木']
    interpretation.love = loveGuide[xiWuxing] || loveGuide['木']
    interpretation.lucky = xiYongShenApplication[xiWuxing] || xiYongShenApplication['木']
    
    showResult.value = true
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(() => {
  systemStore.getSystemConfig()
})
</script>

<style scoped>
.page {
  background: linear-gradient(180deg, #fff5e6 0%, #fff 50%, #fff 100%);
  min-height: 100vh;
  padding: 30px 20px;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #f7c261;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
  background: white;
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(247, 194, 97, 0.2);
}

.placeholder-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  background: transparent;
}

.placeholder-input::placeholder {
  color: #999;
}

.btn {
  width: 100%;
  background: linear-gradient(135deg, #f7c261 0%, #f5a623 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(247, 194, 97, 0.4);
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(247, 194, 97, 0.5);
}

.btn:active {
  transform: translateY(0);
}

.result-container {
  margin-top: 30px;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f7c261;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item .label {
  color: #999;
  font-size: 13px;
}

.info-item .value {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.bazi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.bazi-pillar {
  text-align: center;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 15px 10px;
  border: 2px solid #eee;
  transition: all 0.3s ease;
}

.bazi-pillar:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.bazi-pillar.highlight {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-color: #f7c261;
  box-shadow: 0 4px 12px rgba(247, 194, 97, 0.3);
}

.pillar-title {
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
}

.pillar-heaven,
.pillar-earth {
  width: 50px;
  height: 50px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
}

.pillar-naYin {
  margin-top: 8px;
  font-size: 13px;
  color: #f7c261;
  font-weight: 500;
}

.pillar-cangGan {
  margin-top: 5px;
  font-size: 11px;
  color: #999;
  line-height: 1.4;
}

.wuxing-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.wuxing-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wuxing-label {
  width: 30px;
  font-weight: bold;
  color: #333;
}

.wuxing-bar-bg {
  flex: 1;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.wuxing-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.8s ease;
}

.wuxing-count {
  width: 30px;
  text-align: right;
  color: #666;
  font-weight: 500;
}

.wuxing-analyze {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 15px;
}

.wuxing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.wuxing-item:last-child {
  border-bottom: none;
}

.wuxing-item .label {
  color: #666;
  font-size: 14px;
}

.wuxing-item .value {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.wuxing-item .xi {
  color: #4CAF50;
  font-weight: bold;
  margin-right: 10px;
}

.wuxing-item .yong {
  color: #2196F3;
  font-weight: bold;
}

.personality-box {
  margin-top: 10px;
}

.personality-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.personality-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.personality-wuxing {
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
}

.personality-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.personality-positive,
.personality-negative,
.personality-career {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
}

.personality-positive {
  border-left: 4px solid #4CAF50;
}

.personality-negative {
  border-left: 4px solid #f44336;
}

.personality-career {
  border-left: 4px solid #2196F3;
}

.personality-title {
  font-size: 14px;
  font-weight: bold;
  color: #666;
  margin-bottom: 8px;
}

.personality-text {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.shishen-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.shishen-item {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-radius: 10px;
  padding: 15px 10px;
  text-align: center;
  border: 2px solid #f7c261;
}

.shishen-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.shishen-value {
  font-size: 18px;
  font-weight: bold;
  color: #e65100;
}

.dayun-start {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.dayun-scroll {
  width: 100%;
  overflow-x: auto;
}

.dayun-list {
  display: flex;
  gap: 15px;
  padding: 5px 0;
}

.dayun-item {
  flex-shrink: 0;
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border: 2px solid #f7c261;
  border-radius: 10px;
  padding: 15px 20px;
  text-align: center;
  min-width: 100px;
}

.dayun-age {
  font-size: 16px;
  color: #f7c261;
  font-weight: bold;
}

.dayun-ganzhi {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
}

.dayun-year {
  font-size: 12px;
  color: #999;
}

.interpret-btn-box {
  margin-top: 20px;
  padding-bottom: 20px;
}

.interpret-btn {
  width: 100%;
  background: linear-gradient(135deg, #f7c261 0%, #f5a623 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(247, 194, 97, 0.4);
  transition: all 0.3s ease;
}

.interpret-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(247, 194, 97, 0.5);
}

.interpret-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.interpret-modal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 30px 30px 0 0;
  z-index: 1000;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.interpret-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
  background: #fff;
}

.interpret-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.interpret-close {
  font-size: 40px;
  color: #999;
  line-height: 1;
  padding: 0 10px;
  cursor: pointer;
}

.interpret-content {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
}

.interpret-section {
  margin-bottom: 40px;
}

.interpret-section-title {
  font-size: 18px;
  font-weight: bold;
  color: #f7c261;
  margin-bottom: 20px;
  padding-left: 16px;
  border-left: 4px solid #f7c261;
}

.interpret-summary {
  background: #fff8e1;
  border-radius: 12px;
  padding: 20px;
  color: #333;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.interpret-keywords {
  color: #999;
  font-size: 14px;
  margin-bottom: 20px;
}

.interpret-detail {
  margin-bottom: 20px;
}

.interpret-detail-title {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.interpret-detail-text {
  color: #333;
  font-size: 15px;
  line-height: 1.6;
  padding-left: 12px;
  border-left: 2px solid #f7c261;
}
</style>
