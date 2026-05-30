import { Lunar, Solar } from 'lunar-javascript'

// 获取节气
export function getSolarTerms(year, month, day) {
  try {
    // 从公历转农历获取节气
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    const jq = lunar.getJieQi()
    if (jq && jq.length > 0) {
      return jq
    }
    return null
  } catch (e) {
    return null
  }
}

// 获取农历节日
export function getLunarFestival(year, month, day) {
  try {
    // 公历转农历
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    const festivals = lunar.getFestivals()
    if (festivals && festivals.length > 0) {
      return festivals[0]
    }
    const otherFestivals = lunar.getOtherFestivals()
    if (otherFestivals && otherFestivals.length > 0) {
      return otherFestivals[0]
    }
    return null
  } catch (e) {
    return null
  }
}

// 获取公历节日
export function getSolarFestival(year, month, day) {
  try {
    const solarHolidays = [
      ['元旦', 1, 1], ['情人节', 2, 14], ['妇女节', 3, 8], ['清明节', 4, 4], ['劳动节', 5, 1],
      ['青年节', 5, 4], ['儿童节', 6, 1], ['建军节', 8, 1], ['国庆节', 10, 1],
      ['愚人节', 4, 1], ['平安夜', 12, 24], ['圣诞节', 12, 25], ['万圣节', 11, 1]
    ]
    const m = solarHolidays.find(e => e[1] == month && e[2] == day)
    return m ? m[0] : null
  } catch (e) {
    return null
  }
}

// 农历转公历
export function solarDay(year, month, day) {
  try {
    const lunar = Lunar.fromYmd(year, month, day)
    const solar = lunar.getSolar()
    return {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay()
    }
  } catch (e) {
    return { year, month, day }
  }
}

// 公历转农历
export function lunarDay(year, month, day) {
  try {
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()
    return {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      isLeap: lunar.isLeap()
    }
  } catch (e) {
    return null
  }
}

// 农历信息
export class LunarInfo {
  constructor(year, month, day, hour = 0) {
    try {
      // 创建农历对象（输入应该是农历日期）
      const lunar = Lunar.fromYmd(year, month, day)
      // 获取对应的公历日期
      const solar = lunar.getSolar()
      
      // 农历日期名称
      this.yearName = lunar.getYearInChinese() || ''
      this.monthName = lunar.getMonthInChinese()
      this.dayName = lunar.getDayInChinese()
      this.hourName = this.getHourName(hour)
      
      // 公历日期
      this.year = solar.getYear()
      this.month = solar.getMonth()
      this.day = solar.getDay()
      this.hour = hour
      
      // 星期（1=周一，0=周日）
      const weekIndex = lunar.getWeek()
      const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      this.week = weekNames[weekIndex] || `周${weekIndex}`
      
      // 节气和节日
      this.solarTerms = getSolarTerms(this.year, this.month, this.day)
      this.lunarFestival = getLunarFestival(this.year, this.month, this.day)
      this.solarFestival = getSolarFestival(this.year, this.month, this.day)
      
      // 八字
      const baZi = lunar.getBaZi()
      this.yearGanZhi = baZi[0]
      this.monthGanZhi = baZi[1]
      this.dayGanZhi = baZi[2]
      this.hourGanZhi = baZi[3]
      
      // 生肖
      this.zodiac = lunar.getShengxiao()
      
      // 宜忌
      this.recommends = lunar.getDayYi() || []
      this.avoids = lunar.getDayJi() || []
      
      // 吉凶神煞
      this.jiShen = lunar.getDayJiShen() || []
      this.xiongSha = lunar.getDayXiongSha() || []
      
      // 其他信息
      this.chong = lunar.getChong()
      this.sha = lunar.getSha()
      this.pengZu = `${lunar.getPengZuGan() || ''}${lunar.getPengZuZhi() || ''}`
      
      // 九星 - 使用 toString() 方法
      const nineStar = lunar.getDayNineStar()
      this.nineStar = nineStar ? nineStar.toString() : ''
      
      // 六曜
      this.liuYao = lunar.getLiuYao()
      
      // 彭祖百忌
      const pengZuGan = lunar.getPengZuGan() || ''
      const pengZuZhi = lunar.getPengZuZhi() || ''
      this.pengZu = `${pengZuGan}${pengZuZhi}`
      this.pengZuDetail = `${pengZuGan}${pengZuZhi}`
      
    } catch (e) {
      console.error('LunarInfo error:', e)
      // 初始化所有属性以确保组件正常工作
      this.yearName = ''
      this.monthName = ''
      this.dayName = ''
      this.year = 0
      this.month = 0
      this.day = 0
      this.week = ''
      this.yearGanZhi = ''
      this.monthGanZhi = ''
      this.dayGanZhi = ''
      this.hourGanZhi = ''
      this.zodiac = ''
      this.recommends = []
      this.avoids = []
      this.chong = ''
      this.sha = ''
      this.pengZu = ''
      this.pengZuDetail = ''
      this.liuYao = ''
      this.nineStar = ''
      this.lunarFestival = ''
      this.solarFestival = ''
      this.solarTerms = ''
      this.jiShen = []
      this.xiongSha = []
    }
  }
  
  getHourName(hour) {
    const hourNames = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时']
    // 时辰索引: 23-1点=子时(0), 1-3点=丑时(1), ...
    const index = Math.floor((hour + 1) / 2) % 12
    return hourNames[index] || '子时'
  }
}

// 获取八字
export function getEightChar(year, month, day, hour) {
  try {
    // 如果输入是农历日期
    const lunar = Lunar.fromYmd(year, month, day)
    const baZi = lunar.getBaZi()
    
    // 计算时辰干支
    const timeGanZhi = lunar.getTimeInGanZhi()
    
    return {
      year: { name: baZi[0] },
      month: { name: baZi[1] },
      day: { name: baZi[2] },
      hour: { name: timeGanZhi }
    }
  } catch (e) {
    console.error('getEightChar error:', e)
    return {
      year: { name: '' },
      month: { name: '' },
      day: { name: '' },
      hour: { name: '' }
    }
  }
}

// 获取五行阴阳
export function getElementYinYang(name) {
  try {
    const parts = name.split('')
    if (parts.length < 2) return { name, heavenStem: { name: '', wuxing: '', yinyang: '' }, earthBranch: { name: '', wuxing: '', yinyang: '' } }
    
    const heavenStemName = parts[0]
    const earthBranchName = parts[1]
    
    const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
    const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    const wuxing = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']
    const yinyang = ['阳', '阴', '阳', '阴', '阳', '阴', '阳', '阴', '阳', '阴']
    
    const hsIndex = heavenlyStems.indexOf(heavenStemName)
    const ebIndex = earthlyBranches.indexOf(earthBranchName)
    
    return {
      name: name,
      heavenStem: {
        name: heavenStemName,
        wuxing: hsIndex >= 0 ? wuxing[hsIndex] : '',
        yinyang: hsIndex >= 0 ? yinyang[hsIndex] : ''
      },
      earthBranch: {
        name: earthBranchName,
        wuxing: ebIndex >= 0 ? wuxing[ebIndex] : '',
        yinyang: ebIndex >= 0 ? yinyang[ebIndex] : ''
      }
    }
  } catch (e) {
    return { name, heavenStem: { name: '', wuxing: '', yinyang: '' }, earthBranch: { name: '', wuxing: '', yinyang: '' } }
  }
}

// 获取生肖
export function getZodiac(year) {
  try {
    const lunar = Lunar.fromYmd(year, 1, 1)
    return lunar.getShengxiao() || ''
  } catch (e) {
    return ''
  }
}

// 获取星座
export function getConstellation(year, month, day) {
  try {
    const solar = Solar.fromYmd(year, month, day)
    return solar.getXingZuo() || ''
  } catch (e) {
    return ''
  }
}


// 获取未来节日
export function getFestival() {
  try {
    const festivals = []
    const date = new Date()
    let dayNum = 1
    
    while (festivals.length < 26 && dayNum < 365) {
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + dayNum)
      const year = nextDate.getFullYear()
      const month = nextDate.getMonth() + 1
      const day = nextDate.getDate()
      
      const lunarFest = getLunarFestival(year, month, day)
      const solarFest = getSolarFestival(year, month, day)
      
      if (lunarFest || solarFest) {
        festivals.push({
          name: lunarFest || solarFest,
          year,
          month,
          day,
          dayNum
        })
      }
      dayNum++
    }
    
    return festivals
  } catch (e) {
    console.error('getFestival error:', e)
    return []
  }
}

// 获取本月农历天数
export function lunarLastDay(year, month) {
  for (let d = 31; d >= 29; d--) {
    try {
      Lunar.fromYmd(year, month, d)
      return d
    } catch (e) {
      continue
    }
  }
  return 29
}

// 农历月天数
export function getLunarDays(year, month, day, hour) {
  const solar = solarDay(year, month, day)
  return new LunarInfo(solar.year, solar.month, solar.day, hour)
}

// 获取时辰宜忌
export function getLunarHourYiJi(year, month, day, hour) {
  try {
    const lunar = Lunar.fromYmd(year, month, day)
    const hours = []
    const hourNames = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时']
    
    // 获取当前时辰
    const hourIndex = Math.floor((hour + 1) / 2) % 12
    const curHour = hourNames[hourIndex]
    
    // 获取所有时辰的宜忌
    for (let i = 0; i < 12; i++) {
      try {
        // 尝试用当时的农历对象获取时辰信息
        const lunarHour = lunar.getShiShenYiJi(i)
        hours.push({
          name: hourNames[i],
          recommends: lunarHour ? lunarHour.filter((_, idx) => idx % 2 === 0) : [],
          avoids: lunarHour ? lunarHour.filter((_, idx) => idx % 2 === 1) : []
        })
      } catch (e) {
        hours.push({
          name: hourNames[i],
          recommends: [],
          avoids: []
        })
      }
    }
    
    return {
      hours,
      curHour,
      getCurHour: () => curHour
    }
  } catch (e) {
    console.error('getLunarHourYiJi error:', e)
    return {
      hours: [],
      curHour: '',
      getCurHour: () => ''
    }
  }
}

// 时辰名
export function lunarHourName(year, month, day, hour) {
  try {
    const lunar = Lunar.fromYmd(year, month, day)
    return lunar.getTimeInGanZhi()
  } catch (e) {
    return ''
  }
}

export default {
  getSolarTerms,
  getLunarFestival,
  getSolarFestival,
  lunarDay,
  solarDay,
  LunarInfo,
  getEightChar,
  getElementYinYang,
  getZodiac,
  getConstellation,
  getFestival,
  lunarLastDay,
  getLunarDays,
  lunarHourName,
  getLunarHourYiJi
}
