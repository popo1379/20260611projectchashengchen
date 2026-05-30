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
    
    <div v-if="showResult" class="result-box">
      <div class="row">
        <span class="label">农历日期</span>
        <span class="values">{{ lunarInfo.yearName }}年{{ lunarInfo.monthName }}{{ lunarInfo.dayName }}</span>
      </div>
      <div class="row">
        <span class="label">公历日期</span>
        <span class="values">{{ formatedDate }}</span>
      </div>
      <div class="row">
        <span class="label mr-20">生肖星座</span>
        <span class="values">{{ zodiac }} · {{ constellation }}</span>
      </div>
      <div class="row">
        <span class="label">干支纪年</span>
        <div class="values bazi">
          <text class="col">{{ eightChar.year.name }}</text>
          <text class="col">{{ eightChar.month.name }}</text>
          <text class="col">{{ eightChar.day.name }}</text>
          <text class="col">{{ eightChar.hour.name }}</text>
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

// 生肖和星座
const zodiac = ref('')
const constellation = ref('')
const eightChar = ref({})
const lunarInfo = ref({})

// 计算属性
const years = computed(() => {
  const y = []
  for (let i = 1900; i <= 2100; i++) y.push(i)
  return y
})

const daysInMonth = computed(() => {
  if (calendarType.value === 1) {
    // 公历
    return new Date(selectYear.value, selectMonth.value, 0).getDate()
  } else {
    // 农历，默认29或30
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

// 监听月份变化，重置日期
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
  
  // 获取生肖和星座（使用公历日期）
  const solar = lunar.solarDay(year, month, day)
  zodiac.value = lunarInfo.value.zodiac || lunar.getZodiac(solar.year)
  constellation.value = lunar.getConstellation(solar.year, solar.month, solar.day)
  
  // 获取八字
  eightChar.value = lunar.getEightChar(year, month, day, hour)
  
  showResult.value = true
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
}

.placeholder-input {
  pointer-events: none;
  color: #666;
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
    }
    
    .picker-confirm {
      color: #f7c261;
      font-size: 14px;
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
