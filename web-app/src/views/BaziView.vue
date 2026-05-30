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
      <div class="info-card" v-if="baziResult">
        <div class="card-title">五行统计</div>
        <div class="wuxing-stats">
          <div class="wuxing-item" v-for="(count, wuxing) in wuxingCount" :key="wuxing">
            <div class="wuxing-bar" :style="wuxingBarStyle(wuxing, count)">
              <div class="wuxing-fill" :style="wuxingFillStyle(wuxing)"></div>
            </div>
            <div class="wuxing-label">{{ wuxingInfo[wuxing].name }}: {{ count }}</div>
          </div>
        </div>
        <div class="wuxing-summary">
          <div class="summary-row">
            <span class="label">身强身弱：</span>
            <span class="value">{{ baziResult.xiyongWuxing?.state || '-' }}</span>
          </div>
          <div class="summary-row">
            <span class="label">喜用神：</span>
            <span class="value xi">喜{{ baziResult.xiyongWuxing?.xi || '-' }}</span>
            <span class="value yong">用{{ baziResult.xiyongWuxing?.yong || '-' }}</span>
          </div>
          <div class="summary-row">
            <span class="label">最强五行：</span>
            <span class="value">{{ baziResult.xiyongWuxing?.strong?.join('、') || '-' }}</span>
          </div>
          <div class="summary-row">
            <span class="label">最弱五行：</span>
            <span class="value">{{ baziResult.xiyongWuxing?.weak?.join('、') || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 日主性格 -->
      <div class="info-card" v-if="riGanInfo">
        <div class="card-title">日主性格</div>
        <div class="rigan-info">
          <div class="rigan-name">{{ riGanInfo.name }}</div>
          <div class="rigan-nature">{{ riGanInfo.nature }}</div>
          <div class="rigan-detail">
            <div class="rigan-section">
              <div class="section-title positive">优点</div>
              <div class="section-content">{{ riGanGeXing[riGanInfo.name].positive }}</div>
            </div>
            <div class="rigan-section">
              <div class="section-title negative">缺点</div>
              <div class="section-content">{{ riGanGeXing[riGanInfo.name].negative }}</div>
            </div>
            <div class="rigan-section">
              <div class="section-title profession">适合行业</div>
              <div class="section-content">{{ riGanGeXing[riGanInfo.name].profession }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 十神分析 -->
      <div class="info-card">
        <div class="card-title">十神分析</div>
        <div class="shishen-grid">
          <div class="shishen-item" v-for="shiShen in shiShenList" :key="shiShen.position">
            <div class="shishen-position">{{ shiShen.position }}</div>
            <div class="shishen-name">{{ shiShen.name }}</div>
            <div class="shishen-desc">{{ shiShenInfo[shiShen.name]?.desc || '-' }}</div>
          </div>
        </div>
      </div>

      <!-- 大运分析 -->
      <div class="info-card" v-if="daYun">
        <div class="card-title">大运走势</div>
        <div class="dayun-start">起运: {{ daYun.childLimit?.year }}岁</div>
        <div class="dayun-grid">
          <div class="dayun-item" v-for="(yun, index) in daYun.dayun" :key="index">
            <div class="dayun-age">{{ yun.age }}岁</div>
            <div class="dayun-ganzhi">{{ yun.sixtyCycle }}</div>
            <div class="dayun-year">{{ yun.year }}年起</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 日期选择弹窗 -->
    <div v-if="showPicker" class="picker-modal">
      <div class="picker-overlay" @click="showPicker = false"></div>
      <div class="picker-content">
        <div class="picker-header">
          <span class="picker-cancel" @click="showPicker = false">取消</span>
          <span class="picker-title">选择日期时辰</span>
          <span class="picker-confirm" @click="confirmPicker">确认</span>
        </div>
        <div class="picker-body">
          <div class="calendar-tabs">
            <button 
              :class="{ active: calendarType === 0 }" 
              @click="calendarType = 0"
            >农历</button>
            <button 
              :class="{ active: calendarType === 1 }" 
              @click="calendarType = 1"
            >公历</button>
          </div>
          <div class="date-pickers">
            <div class="picker-item">
              <select v-model="selectYear">
                <option v-for="y in years" :key="y" :value="y">{{ y }}年</option>
              </select>
            </div>
            <div class="picker-item">
              <select v-model="selectMonth">
                <option v-for="m in 12" :key="m" :value="m">{{ m }}月</option>
              </select>
            </div>
            <div class="picker-item">
              <select v-model="selectDay">
                <option v-for="d in daysInMonth" :key="d" :value="d">{{ d }}日</option>
              </select>
            </div>
            <div class="picker-item">
              <select v-model="selectHour">
                <option v-for="(h, i) in hours" :key="i" :value="i">{{ h }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSystemStore } from '@/stores/system'
import lunar from '@/api/lunar'
import * as data from '@/data/baziData.js'

const systemStore = useSystemStore()
systemStore.getSystemConfig()

const birthday = ref('')
const calendarType = ref(0)
const showPicker = ref(false)
const showResult = ref(false)

// 选择的数据
const selectYear = ref(2000)
const selectMonth = ref(1)
const selectDay = ref(1)
const selectHour = ref(0)

// 数据
const zodiac = ref('')
const constellation = ref('')
const eightChar = ref({})
const lunarInfo = ref({})
const baziResult = ref(null)
const daYun = ref(null)

// 数据引用
const heavenStemInfo = data.heavenStemInfo
const earthBranchInfo = data.earthBranchInfo
const shiShenInfo = data.shiShenInfo
const naYinInfo = data.naYinInfo
const wuxingInfo = data.wuxingInfo
const riGanGeXing = data.riGanGeXing

// 计算属性
const years = computed(() => {
  const y = []
  for (let i = 1900; i <= 2100; i++) y.push(i)
  return y
})

const daysInMonth = computed(() => {
  if (calendarType.value === 1) {
    return new Date(selectYear.value, selectMonth.value, 0).getDate()
  } else {
    return lunar.lunarLastDay(selectYear.value, selectMonth.value)
  }
})

const hours = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时']

const birthdayText = computed(() => {
  if (!birthday.value) return ''
  return birthday.value
})

const formatedDate = computed(() => {
  if (!lunarInfo.value.year) return ''
  return `${lunarInfo.value.year}年${lunarInfo.value.month}月${lunarInfo.value.day}日`
})

// 五行统计
const wuxingCount = computed(() => {
  const count = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 }
  if (!eightChar.value.year) return count
  
  count[eightChar.value.year.heavenStem.wuxing]++
  count[eightChar.value.month.heavenStem.wuxing]++
  count[eightChar.value.day.heavenStem.wuxing]++
  count[eightChar.value.hour.heavenStem.wuxing]++
  
  count[eightChar.value.year.earthBranch.wuxing]++
  count[eightChar.value.month.earthBranch.wuxing]++
  count[eightChar.value.day.earthBranch.wuxing]++
  count[eightChar.value.hour.earthBranch.wuxing]++
  
  return count
})

// 十神列表
const shiShenList = computed(() => {
  if (!eightChar.value.year) return []
  return [
    { position: '年干', name: eightChar.value.year.heavenStemTenStar || '' },
    { position: '月干', name: eightChar.value.month.heavenStemTenStar || '' },
    { position: '日干', name: '元' },
    { position: '时干', name: eightChar.value.hour.heavenStemTenStar || '' },
  ]
})

// 日主信息
const riGanInfo = computed(() => {
  if (!eightChar.value.day) return null
  return heavenStemInfo[eightChar.value.day.heavenStem.name]
})

// 五行颜色
const wuxingColors = {
  '金': '#c0c0c0',
  '木': '#4CAF50',
  '水': '#2196F3',
  '火': '#f44336',
  '土': '#FFC107'
}

const wuxingBgColors = {
  '金': '#f0f0f0',
  '木': '#e8f5e9',
  '水': '#e3f2fd',
  '火': '#ffebee',
  '土': '#fff8e1'
}

function heavenColor(wuxing) {
  return {
    backgroundColor: wuxingBgColors[wuxing],
    color: wuxingColors[wuxing]
  }
}

function earthColor(wuxing) {
  return {
    backgroundColor: wuxingBgColors[wuxing],
    color: wuxingColors[wuxing]
  }
}

function wuxingBarStyle(wuxing, count) {
  const maxCount = Math.max(...Object.values(wuxingCount.value), 1)
  const width = (count / maxCount) * 100
  return {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    height: '24px',
    overflow: 'hidden'
  }
}

function wuxingFillStyle(wuxing) {
  const count = wuxingCount.value[wuxing]
  const maxCount = Math.max(...Object.values(wuxingCount.value), 1)
  const width = (count / maxCount) * 100
  return {
    backgroundColor: wuxingColors[wuxing],
    height: '100%',
    width: `${width}%`,
    transition: 'width 0.3s'
  }
}

// 监听月份变化
watch(selectMonth, () => {
  if (selectDay.value > daysInMonth.value) {
    selectDay.value = daysInMonth.value
  }
})

function confirmPicker() {
  const year = selectYear.value
  const month = selectMonth.value
  const day = selectDay.value
  const hour = selectHour.value
  
  birthday.value = `${year}-${month}-${day}-${hour}`
  showPicker.value = false
  showResult.value = false
}

function handleQuery() {
  if (!birthday.value) {
    alert('请选择日期时辰')
    return
  }
  
  const [year, month, day, hour] = birthday.value.split('-').map(Number)
  
  // 获取农历信息
  lunarInfo.value = new lunar.LunarInfo(year, month, day, hour)
  
  // 获取生肖和星座
  const solar = lunar.solarDay(year, month, day)
  zodiac.value = lunarInfo.value.zodiac || lunar.getZodiac(solar.year)
  constellation.value = lunar.getConstellation(solar.year, solar.month, solar.day)
  
  // 获取完整八字分析
  baziResult.value = lunar.bazi(year, month, day, hour)
  
  // 获取八字基础信息
  eightChar.value = lunar.getEightChar(year, month, day, hour)
  
  // 获取大运
  try {
    daYun.value = lunar.getDecadeFortune(year, month, day, hour, 1)
  } catch (e) {
    console.log('大运计算失败', e)
  }
  
  showResult.value = true
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.input-wrapper {
  margin-bottom: 20px;
  .placeholder-input {
    pointer-events: none;
    color: #666;
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
    background: #f9f9f9;
  }
}

.btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #f7c261 0%, #f5a623 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(247, 194, 97, 0.4);
  }
}

.result-container {
  margin-top: 24px;
}

.info-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .label {
    font-size: 13px;
    color: #999;
  }
  
  .value {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
}

.bazi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.bazi-pillar {
  text-align: center;
  padding: 12px 8px;
  background: #f9f9f9;
  border-radius: 8px;
  
  &.highlight {
    background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
    border: 2px solid #f7c261;
  }
  
  .pillar-title {
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
  }
  
  .pillar-heaven,
  .pillar-earth {
    font-size: 24px;
    font-weight: bold;
    padding: 8px 0;
    border-radius: 4px;
    margin: 4px 0;
  }
  
  .pillar-naYin {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }
  
  .pillar-cangGan {
    font-size: 11px;
    color: #999;
    margin-top: 4px;
    line-height: 1.4;
  }
}

.wuxing-stats {
  margin-bottom: 16px;
}

.wuxing-item {
  margin-bottom: 12px;
}

.wuxing-label {
  font-size: 14px;
  margin-top: 4px;
  color: #666;
}

.wuxing-summary {
  .summary-row {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      font-size: 14px;
      color: #666;
      min-width: 80px;
    }
    
    .value {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      
      &.xi {
        color: #4CAF50;
        margin-right: 12px;
      }
      
      &.yong {
        color: #2196F3;
      }
    }
  }
}

.rigan-info {
  .rigan-name {
    font-size: 20px;
    font-weight: bold;
    color: #f7c261;
    margin-bottom: 8px;
  }
  
  .rigan-nature {
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
    line-height: 1.6;
  }
  
  .rigan-detail {
    .rigan-section {
      margin-bottom: 12px;
      
      .section-title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 6px;
        
        &.positive {
          color: #4CAF50;
        }
        
        &.negative {
          color: #f44336;
        }
        
        &.profession {
          color: #2196F3;
        }
      }
      
      .section-content {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
      }
    }
  }
}

.shishen-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.shishen-item {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  
  .shishen-position {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
  }
  
  .shishen-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 6px;
  }
  
  .shishen-desc {
    font-size: 12px;
    color: #666;
    line-height: 1.4;
  }
}

.dayun-start {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.dayun-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dayun-item {
  flex: 1;
  min-width: 80px;
  text-align: center;
  padding: 12px 8px;
  background: #f9f9f9;
  border-radius: 8px;
  
  .dayun-age {
    font-size: 14px;
    font-weight: bold;
    color: #f7c261;
    margin-bottom: 4px;
  }
  
  .dayun-ganzhi {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
  }
  
  .dayun-year {
    font-size: 12px;
    color: #999;
  }
}

.picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  
  .picker-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .picker-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 16px 16px 0 0;
    max-height: 70vh;
  }
  
  .picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
    
    .picker-title {
      font-size: 16px;
      font-weight: bold;
    }
    
    .picker-cancel {
      color: #999;
      font-size: 14px;
      cursor: pointer;
    }
    
    .picker-confirm {
      color: #f7c261;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }
  }
  
  .picker-body {
    padding: 20px;
  }
  
  .calendar-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    
    button {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      
      &.active {
        background: #f7c261;
        color: #fff;
        border-color: #f7c261;
      }
    }
  }
  
  .date-pickers {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    
    .picker-item {
      select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        background: #fff;
      }
    }
  }
}
</style>
