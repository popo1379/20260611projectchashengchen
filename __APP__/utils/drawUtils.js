// 抽签工具函数
// 管理抽签记录、判定今日是否已抽签、抽签算法等

const { qianData } = require('./qianData.js');

// 存储键名
const DRAW_RECORD_KEY = 'drawRecord';

// 获取今日日期字符串 (格式: YYYY-MM-DD)
function getTodayStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 获取当前时间戳
function getNowTimestamp() {
  return Date.now();
}

// 获取抽签记录
function getDrawRecord() {
  try {
    const recordStr = wx.getStorageSync(DRAW_RECORD_KEY);
    if (recordStr) {
      return JSON.parse(recordStr);
    }
    return {};
  } catch (e) {
    console.error('获取抽签记录失败:', e);
    return {};
  }
}

// 保存抽签记录
function saveDrawRecord(record) {
  try {
    wx.setStorageSync(DRAW_RECORD_KEY, JSON.stringify(record));
    return true;
  } catch (e) {
    console.error('保存抽签记录失败:', e);
    return false;
  }
}

// 判定指定场景今日是否已抽签
function isDrawnToday(scene) {
  const today = getTodayStr();
  const record = getDrawRecord();
  
  if (!record[today]) {
    return false;
  }
  
  if (!record[today][scene]) {
    return false;
  }
  
  return true;
}

// 获取指定场景今日的抽签结果
function getTodayDraw(scene) {
  const today = getTodayStr();
  const record = getDrawRecord();
  
  if (!record[today] || !record[today][scene]) {
    return null;
  }
  
  const drawData = record[today][scene];
  // 从签文数据库中获取完整的签文信息
  const qianInfo = qianData.find(item => item.id === drawData.qianId);
  
  if (!qianInfo) {
    return null;
  }
  
  return {
    ...qianInfo,
    drawTime: drawData.timestamp
  };
}

// 执行抽签并保存记录
function drawAndSave(scene) {
  const today = getTodayStr();
  const timestamp = getNowTimestamp();
  
  // 生成随机数进行权重抽签
  const qian = weightedRandomDraw(scene);
  
  // 获取现有记录
  let record = getDrawRecord();
  
  // 初始化今日记录
  if (!record[today]) {
    record[today] = {};
  }
  
  // 保存本次抽签记录
  record[today][scene] = {
    qianId: qian.id,
    timestamp: timestamp
  };
  
  // 保存到本地存储
  saveDrawRecord(record);
  
  // 返回抽签结果
  return {
    ...qian,
    drawTime: timestamp
  };
}

// 权重随机抽签算法
function weightedRandomDraw(scene) {
  // 获取该场景的签（包括专属和综合签）
  const sceneQian = qianData.filter(q => 
    q.scene === scene || q.scene === '综合'
  );
  
  // 构建权重池
  let weightPool = [];
  sceneQian.forEach(q => {
    // 根据等级分配权重
    let weight = 0;
    switch (q.level) {
      case '上上签': weight = 5; break;  // 5%
      case '上吉签': weight = 15; break; // 15%
      case '中吉签': weight = 30; break; // 30%
      case '中平签': weight = 30; break; // 30%
      case '下下签': weight = 5; break;  // 5%
    }
    
    // 每个签根据权重重复加入权重池
    for (let i = 0; i < weight; i++) {
      weightPool.push(q);
    }
  });
  
  // 随机选择
  const randomIndex = Math.floor(Math.random() * weightPool.length);
  return weightPool[randomIndex];
}

// 清除所有抽签记录（用于测试）
function clearDrawRecord() {
  try {
    wx.removeStorageSync(DRAW_RECORD_KEY);
    return true;
  } catch (e) {
    console.error('清除抽签记录失败:', e);
    return false;
  }
}

// 获取场景名称
function getSceneName(scene) {
  const sceneMap = {
    'career': '事业破局',
    'people': '人际解惑',
    'health': '健康静心',
    'fortune': '今日运势'
  };
  return sceneMap[scene] || scene;
}

// 获取场景图标
function getSceneIcon(scene) {
  const iconMap = {
    'career': 'briefcase',
    'people': 'people',
    'health': 'heart',
    'fortune': 'star'
  };
  return iconMap[scene] || 'star';
}

module.exports = {
  getTodayStr,
  getNowTimestamp,
  getDrawRecord,
  saveDrawRecord,
  isDrawnToday,
  getTodayDraw,
  drawAndSave,
  clearDrawRecord,
  getSceneName,
  getSceneIcon
};
