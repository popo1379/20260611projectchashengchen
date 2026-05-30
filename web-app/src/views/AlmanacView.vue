<template>
  <div class="page">
    <div class="title">华夏 · 老黄历</div>
    
    <!-- 日期选择 -->
    <DateTabs 
      :checkedDay="checkedDay"
      mode="week"
      @change="onDateChange"
    />
    
    <div class="almanac-content" v-if="hasData">
      <!-- 日期信息 -->
      <div class="date-section">
        <div class="lunar-date">
          <span class="month">{{ lunarInfo.monthName }}</span>
          <span class="day">{{ lunarInfo.dayName }}</span>
        </div>
        <div class="solar-date">
          {{ lunarInfo.yearName }}年 · {{ zodiac }} · {{ constellation }}
        </div>
        <div class="date-detail">
          {{ lunarInfo.year }}年{{ lunarInfo.month }}月{{ lunarInfo.day }}日
          {{ festivalText }}
        </div>
      </div>
      
      <!-- 八字 -->
      <div class="bazi-section">
        <div class="section-title">生辰八字</div>
        <div class="bazi-grid">
          <div class="bazi-item">
            <div class="label">年柱</div>
            <div class="value">{{ lunarInfo.yearGanZhi }}</div>
          </div>
          <div class="bazi-item">
            <div class="label">月柱</div>
            <div class="value">{{ lunarInfo.monthGanZhi }}</div>
          </div>
          <div class="bazi-item">
            <div class="label">日柱</div>
            <div class="value">{{ lunarInfo.dayGanZhi }}</div>
          </div>
          <div class="bazi-item">
            <div class="label">时柱</div>
            <div class="value">{{ lunarInfo.hourGanZhi }}</div>
          </div>
        </div>
      </div>
      
      <!-- 宜忌 -->
      <div class="yiji-section">
        <div class="recommend-box" v-if="lunarInfo.recommends?.length">
          <div class="box-title recommend">宜</div>
          <div class="box-content">
            <span 
              v-for="(item, index) in lunarInfo.recommends" 
              :key="index" 
              class="tag recommend"
            >
              {{ item }}
            </span>
          </div>
        </div>
        
        <div class="avoid-box" v-if="lunarInfo.avoids?.length">
          <div class="box-title avoid">忌</div>
          <div class="box-content">
            <span 
              v-for="(item, index) in lunarInfo.avoids" 
              :key="index" 
              class="tag avoid"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 吉凶信息 -->
      <div class="info-section">
        <div class="info-item" v-if="lunarInfo.chong">
          <span class="info-label">冲</span>
          <span class="info-value">{{ lunarInfo.chong }}</span>
        </div>
        <div class="info-item" v-if="lunarInfo.sha">
          <span class="info-label">煞</span>
          <span class="info-value">{{ lunarInfo.sha }}</span>
        </div>
        <div class="info-item" v-if="lunarInfo.pengZu">
          <span class="info-label">彭祖百忌</span>
          <span class="info-value">{{ lunarInfo.pengZuDetail }}</span>
        </div>
        <div class="info-item" v-if="lunarInfo.liuYao">
          <span class="info-label">六曜</span>
          <span class="info-value">{{ lunarInfo.liuYao }}</span>
        </div>
        <div class="info-item" v-if="lunarInfo.nineStar">
          <span class="info-label">九星</span>
          <span class="info-value">{{ lunarInfo.nineStar }}</span>
        </div>
      </div>
    </div>
    
    <!-- 加载中或无数据 -->
    <div v-else class="empty-state">
      <div class="empty-text">正在加载老黄历数据...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import DateTabs from '@/components/DateTabs.vue'
import { Lunar, Solar } from 'lunar-javascript'

const checkedDay = ref(Date.now())
const lunarInfo = ref({})

// 生肖和星座
const zodiac = ref('')
const constellation = ref('')

// 判断是否有数据
const hasData = computed(() => {
  return lunarInfo.value.yearName && lunarInfo.value.monthName
})

// 节日文本
const festivalText = computed(() => {
  return lunarInfo.value.lunarFestival || 
         lunarInfo.value.solarFestival || 
         lunarInfo.value.solarTerms || 
         lunarInfo.value.week || ''
})

function onDateChange(date) {
  checkedDay.value = date
  updateInfo(date)
}

// 获取农历信息
function getLunarInfo(solarYear, solarMonth, solarDay, hour = 12) {
  try {
    // 公历转农历
    const solar = Solar.fromYmd(solarYear, solarMonth, solarDay)
    const lunar = solar.getLunar()
    
    // 获取农历年月日
    const lunarYear = lunar.getYear()
    const lunarMonth = lunar.getMonth()
    const lunarDay = lunar.getDay()
    
    // 从农历年月日再获取完整信息
    const lunarObj = Lunar.fromYmd(lunarYear, lunarMonth, lunarDay)
    const solarFromLunar = lunarObj.getSolar()
    
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekIndex = lunarObj.getWeek()
    
    return {
      yearName: lunarObj.getYearInChinese(),
      monthName: lunarObj.getMonthInChinese(),
      dayName: lunarObj.getDayInChinese(),
      year: solarFromLunar.getYear(),
      month: solarFromLunar.getMonth(),
      day: solarFromLunar.getDay(),
      week: weekNames[weekIndex] || `周${weekIndex}`,
      yearGanZhi: lunarObj.getBaZi()[0] || '',
      monthGanZhi: lunarObj.getBaZi()[1] || '',
      dayGanZhi: lunarObj.getBaZi()[2] || '',
      hourGanZhi: lunarObj.getBaZi()[3] || '',
      zodiac: lunarObj.getShengxiao() || '',
      recommends: lunarObj.getDayYi() || [],
      avoids: lunarObj.getDayJi() || [],
      chong: lunarObj.getChong() || '',
      sha: lunarObj.getSha() || '',
      pengZu: `${lunarObj.getPengZuGan() || ''}${lunarObj.getPengZuZhi() || ''}`,
      pengZuDetail: `${lunarObj.getPengZuGan() || ''} ${lunarObj.getPengZuZhi() || ''}`,
      liuYao: lunarObj.getLiuYao() || '',
      nineStar: lunarObj.getDayNineStar() ? lunarObj.getDayNineStar().toString() : '',
      lunarFestival: '',
      solarFestival: '',
      solarTerms: '',
      jiShen: [],
      xiongSha: []
    }
  } catch (e) {
    console.error('getLunarInfo error:', e)
    return {}
  }
}

function updateInfo(timestamp) {
  const date = new Date(timestamp)
  const solarYear = date.getFullYear()
  const solarMonth = date.getMonth() + 1
  const solarDay = date.getDate()
  
  // 获取农历信息
  lunarInfo.value = getLunarInfo(solarYear, solarMonth, solarDay)
  
  // 获取生肖和星座
  zodiac.value = lunarInfo.value.zodiac || ''
  constellation.value = getConstellation(solarYear, solarMonth, solarDay)
}

// 获取星座
function getConstellation(year, month, day) {
  try {
    const solar = Solar.fromYmd(year, month, day)
    return solar.getXingZuo() || ''
  } catch (e) {
    return ''
  }
}

onMounted(() => {
  updateInfo(checkedDay.value)
})
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
}

.almanac-content {
  margin-top: 20px;
}

.date-section {
  background: linear-gradient(135deg, #f7c261, #f5a623);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  color: #fff;
  
  .lunar-date {
    margin-bottom: 12px;
    
    .month {
      font-size: 28px;
      font-weight: bold;
    }
    
    .day {
      font-size: 36px;
      font-weight: bold;
      margin-left: 8px;
    }
  }
  
  .solar-date {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 8px;
  }
  
  .date-detail {
    font-size: 13px;
    opacity: 0.8;
  }
}

.bazi-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
  }
}

.bazi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  .bazi-item {
    text-align: center;
    
    .label {
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
    }
    
    .value {
      font-size: 18px;
      font-weight: bold;
      padding: 8px;
      background: #f5f5f5;
      border-radius: 8px;
    }
  }
}

.yiji-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
  
  .recommend-box, .avoid-box {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
  
  .box-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
    
    &.recommend { color: #4a9c2d; }
    &.avoid { color: #bf242a; }
  }
  
  .box-content {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .tag {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      
      &.recommend {
        background: #e8f5e0;
        color: #4a9c2d;
      }
      
      &.avoid {
        background: #fef0f0;
        color: #bf242a;
      }
    }
  }
}

.info-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  .info-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .info-label {
      width: 80px;
      color: #666;
      font-size: 13px;
    }
    
    .info-value {
      flex: 1;
      color: #333;
      font-size: 13px;
    }
  }
}

.empty-state {
  margin-top: 40px;
  text-align: center;
  
  .empty-text {
    color: #999;
    font-size: 14px;
  }
}
</style>
