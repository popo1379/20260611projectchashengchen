<template>
  <div class="date-tabs">
    <div class="date-table-title">
      <span 
        v-for="item in weekDays" 
        :key="item.key"
        :class="{ 'week-item-active': currentWeekDay === item.key }"
        class="week-item"
      >
        {{ item.label }}
      </span>
    </div>
    <div class="date-tabs-main">
      <div class="date-tabs-month">
        <div class="swiper-container" ref="swiperRef">
          <div class="swiper-wrapper">
            <div 
              v-for="(week, wi) in weeks" 
              :key="wi"
              class="day-list"
            >
              <div 
                v-for="day in week" 
                :key="day.date"
                :class="getDayClass(day)"
                class="day-item"
                @click="selectDay(day)"
              >
                <div class="day">{{ day.day }}</div>
                <div v-if="day.lunar" class="tag" :style="{ background: day.tagColor }">
                  {{ day.tag }}
                </div>
                <div v-if="day.mark" class="mark">{{ day.mark }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="month-nav">
      <button @click="prevMonth">&lt;</button>
      <span class="current-month">{{ currentYear }}年{{ currentMonth }}月</span>
      <button @click="nextMonth">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import lunar from '@/api/lunar'

const props = defineProps({
  checkedDay: {
    type: Number,
    default: () => Date.now()
  },
  mode: {
    type: String,
    default: 'month'
  }
})

const emit = defineEmits(['change'])

const weekDays = [
  { key: 0, label: '周日' },
  { key: 1, label: '周一' },
  { key: 2, label: '周二' },
  { key: 3, label: '周三' },
  { key: 4, label: '周四' },
  { key: 5, label: '周五' },
  { key: 6, label: '周六' }
]

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const weeks = ref([])

const currentWeekDay = computed(() => {
  const date = new Date(props.checkedDay)
  return date.getDay()
})

function generateCalendar() {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const startWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const result = []
  let week = []
  
  // 填充上月的空白
  for (let i = 0; i < startWeek; i++) {
    week.push({ empty: true })
  }
  
  // 填充当月日期
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d)
    const dayOfWeek = date.getDay()
    
    // 获取农历信息
    const lunarInfo = new lunar.LunarInfo(year, month, d)
    
    // 检查是否是节日
    let tag = ''
    let tagColor = '#f7c261'
    if (lunarInfo.lunarFestival) {
      tag = lunarInfo.lunarFestival
      tagColor = '#bf242a'
    } else if (lunarInfo.solarFestival) {
      tag = lunarInfo.solarFestival
      tagColor = '#bf242a'
    } else if (lunarInfo.solarTerms) {
      tag = lunarInfo.solarTerms
      tagColor = '#4a9c2d'
    } else if (d === 1) {
      tag = lunarInfo.monthName
      tagColor = '#f7c261'
    }
    
    // 检查是否是今天
    const today = new Date()
    const isToday = today.getFullYear() === year && 
                   today.getMonth() + 1 === month && 
                   today.getDate() === d
    
    // 检查是否是选中日期
    const checkDate = new Date(props.checkedDay)
    const isSelected = checkDate.getFullYear() === year && 
                      checkDate.getMonth() + 1 === month && 
                      checkDate.getDate() === d
    
    week.push({
      date: `${year}-${month}-${d}`,
      day: d,
      lunar: lunarInfo.dayName,
      tag: tag,
      tagColor: tagColor,
      mark: lunarInfo.sixStar || '',
      isToday,
      isSelected
    })
    
    if (dayOfWeek === 6 || d === daysInMonth) {
      // 补齐空白
      while (week.length < 7) {
        week.push({ empty: true })
      }
      result.push([...week])
      week = []
    }
  }
  
  if (week.length > 0) {
    while (week.length < 7) {
      week.push({ empty: true })
    }
    result.push([...week])
  }
  
  weeks.value = result
}

function getDayClass(day) {
  if (day.empty) return 'day-item empty'
  return {
    'day-item': true,
    'day-item-today': day.isToday,
    'day-item-selected': day.isSelected
  }
}

function selectDay(day) {
  if (day.empty) return
  const date = new Date(day.date)
  emit('change', date.getTime())
}

function prevMonth() {
  if (currentMonth.value === 1) {
    currentYear.value--
    currentMonth.value = 12
  } else {
    currentMonth.value--
  }
  generateCalendar()
}

function nextMonth() {
  if (currentMonth.value === 12) {
    currentYear.value++
    currentMonth.value = 1
  } else {
    currentMonth.value++
  }
  generateCalendar()
}

watch(() => props.checkedDay, () => {
  const date = new Date(props.checkedDay)
  currentYear.value = date.getFullYear()
  currentMonth.value = date.getMonth() + 1
  generateCalendar()
}, { immediate: true })

onMounted(() => {
  generateCalendar()
})
</script>

<style lang="scss" scoped>
.date-tabs {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.date-table-title {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 16px;
  
  .week-item {
    font-size: 12px;
    color: #999;
    padding: 8px 0;
    
    &.week-item-active {
      color: #f7c261;
      font-weight: bold;
    }
  }
}

.date-tabs-main {
  overflow: hidden;
}

.day-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-item {
  text-align: center;
  padding: 8px 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 60px;
  
  &:not(.empty):hover {
    background: #f5f5f5;
  }
  
  &.empty {
    cursor: default;
  }
  
  &.day-item-today {
    .day {
      background: #f7c261;
      color: #fff;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      line-height: 28px;
      margin: 0 auto 4px;
    }
  }
  
  &.day-item-selected {
    background: #fff8e6;
  }
  
  .day {
    font-size: 16px;
    color: #333;
    margin-bottom: 4px;
  }
  
  .tag {
    font-size: 10px;
    color: #fff;
    padding: 2px 4px;
    border-radius: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .mark {
    font-size: 10px;
    color: #999;
  }
}

.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  
  button {
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
      background: #f5f5f5;
    }
  }
  
  .current-month {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
}
</style>
