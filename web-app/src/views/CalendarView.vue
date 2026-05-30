<template>
  <div class="page">
    <div class="title">中华万年历</div>
    
    <!-- 日期选择 -->
    <DateTabs 
      :checkedDay="checkedDay"
      @change="onDateChange"
    />
    
    <!-- 当前日期信息 -->
    <div class="calendar-info" v-if="lunarInfo.year">
      <div class="date-header">
        <span class="year">{{ lunarInfo.year }}</span>
        <span class="month-day">年{{ lunarInfo.month }}月{{ lunarInfo.day }}日</span>
      </div>
      
      <div class="lunar-info">
        <div class="festival">{{ festivalText }}</div>
        <div class="detail">
          <span>{{ lunarInfo.yearName }}年</span>
          <span>{{ lunarInfo.monthName }}</span>
          <span>{{ lunarInfo.dayName }}</span>
        </div>
        <div class="meta">
          <span class="tag">{{ zodiac }}</span>
          <span class="tag">{{ constellation }}</span>
          <span class="tag">{{ lunarInfo.season }}</span>
        </div>
      </div>
      
      <!-- 时辰宜忌 -->
      <div class="hour-info" v-if="currentHour">
        <div class="hour-title">时辰宜忌 - {{ currentHour }}</div>
        <div class="hour-detail">
          <div class="recommends" v-if="hourRecommends.length">
            <span class="label">宜：</span>
            <span class="items">{{ hourRecommends.join('、') }}</span>
          </div>
          <div class="avoids" v-if="hourAvoids.length">
            <span class="label">忌：</span>
            <span class="items">{{ hourAvoids.join('、') }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 未来节日 -->
    <div class="festivals-section">
      <div class="section-title">近期节日</div>
      <div class="festival-list">
        <div 
          v-for="(item, index) in festivals" 
          :key="index" 
          class="festival-item"
        >
          <span class="festival-name">{{ item.name }}</span>
          <span class="festival-date">{{ item.month }}/{{ item.day }}</span>
          <span class="festival-day">还有{{ item.dayNum }}天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DateTabs from '@/components/DateTabs.vue'
import lunar from '@/api/lunar'

const checkedDay = ref(Date.now())
const lunarInfo = ref({})
const eightChar = ref({})
const hourInfo = ref([])
const currentHour = ref('')
const hourRecommends = ref([])
const hourAvoids = ref([])
const festivals = ref([])

// 生肖和星座
const zodiac = ref('')
const constellation = ref('')

const festivalText = computed(() => {
  return lunarInfo.value.lunarFestival || 
         lunarInfo.value.solarFestival || 
         lunarInfo.value.solarTerms || 
         `周${lunarInfo.value.week}`
})

function onDateChange(date) {
  checkedDay.value = date
  updateInfo(date)
}

function updateInfo(timestamp) {
  const date = new Date(timestamp)
  const solarYear = date.getFullYear()
  const solarMonth = date.getMonth() + 1
  const solarDay = date.getDate()
  const hour = date.getHours()
  
  // 先获取农历日期
  const lunarDateInfo = lunar.lunarDay(solarYear, solarMonth, solarDay)
  if (lunarDateInfo) {
    // 使用农历日期创建 LunarInfo
    lunarInfo.value = new lunar.LunarInfo(lunarDateInfo.year, lunarDateInfo.month, lunarDateInfo.day, hour)
  }
  
  // 获取生肖和星座
  zodiac.value = lunar.getZodiac(solarYear)
  constellation.value = lunar.getConstellation(solarYear, solarMonth, solarDay)
  
  // 获取八字
  eightChar.value = lunar.getEightChar(solarYear, solarMonth, solarDay)
  
  // 获取时辰宜忌
  const info = lunar.getLunarHourYiJi(lunarDateInfo.year, lunarDateInfo.month, lunarDateInfo.day, hour)
  hourInfo.value = info.hours
  currentHour.value = info.getCurHour()
  
  const curHourInfo = info.hours.find(h => h.name === currentHour.value)
  if (curHourInfo) {
    hourRecommends.value = curHourInfo.recommends
    hourAvoids.value = curHourInfo.avoids
  }
}

onMounted(() => {
  updateInfo(checkedDay.value)
  festivals.value = lunar.getFestival()
})
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
}

.calendar-info {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.date-header {
  text-align: center;
  margin-bottom: 16px;
  
  .year {
    font-size: 28px;
    font-weight: bold;
    color: #f7c261;
  }
  
  .month-day {
    font-size: 18px;
    color: #333;
    margin-left: 8px;
  }
}

.lunar-info {
  text-align: center;
  
  .festival {
    font-size: 16px;
    color: #bf242a;
    margin-bottom: 12px;
  }
  
  .detail {
    color: #666;
    font-size: 14px;
    margin-bottom: 12px;
    
    span {
      margin: 0 4px;
    }
  }
  
  .meta {
    display: flex;
    justify-content: center;
    gap: 12px;
    
    .tag {
      padding: 4px 12px;
      background: #f5f5f5;
      border-radius: 12px;
      font-size: 12px;
      color: #666;
    }
  }
}

.hour-info {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  
  .hour-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
    font-weight: bold;
  }
  
  .hour-detail {
    font-size: 13px;
    
    .recommends {
      color: #4a9c2d;
      margin-bottom: 8px;
    }
    
    .avoids {
      color: #bf242a;
    }
    
    .label {
      font-weight: bold;
    }
  }
}

.festivals-section {
  margin-top: 24px;
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
  }
}

.festival-list {
  display: grid;
  gap: 12px;
}

.festival-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  .festival-name {
    flex: 1;
    font-size: 14px;
    color: #333;
  }
  
  .festival-date {
    font-size: 13px;
    color: #999;
    margin-right: 12px;
  }
  
  .festival-day {
    font-size: 12px;
    color: #f7c261;
    background: #fff8e6;
    padding: 2px 8px;
    border-radius: 10px;
  }
}
</style>
