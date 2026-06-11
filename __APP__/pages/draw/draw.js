Page({
  data: {
    scene: '',
    sceneName: '',
    hasDrawn: false,
    qian: null,
    isDrawing: false,
    showResult: false,
    tubeAnimation: {}
  },

  onLoad: function(options) {
    // 从 globalData 获取场景参数
    var scene = getApp().globalData.drawScene;
    
    if (!scene) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      });
      setTimeout(function() {
        wx.navigateBack();
      }, 1500);
      return;
    }

    var sceneName = this.getSceneName(scene);

    this.setData({
      scene: scene,
      sceneName: sceneName
    });

    wx.setNavigationBarTitle({
      title: sceneName + '抽签'
    });

    // 检查今日是否已抽签
    this.checkTodayDraw();
  },

  // 获取场景名称
  getSceneName: function(scene) {
    var sceneMap = {
      'career': '事业破局',
      'people': '人际解惑',
      'health': '健康静心',
      'fortune': '今日运势'
    };
    return sceneMap[scene] || scene;
  },

  // 检查今日是否已抽签
  checkTodayDraw: function() {
    var scene = this.data.scene;
    var record = wx.getStorageSync('drawRecord') || {};
    var today = this.getTodayStr();

    if (record[today] && record[today][scene]) {
      var qianId = record[today][scene].qianId;
      var qian = this.getQianById(qianId);
      if (qian) {
        this.setData({
          hasDrawn: true,
          qian: qian
        });
      }
    }
  },

  // 获取今日日期字符串
  getTodayStr: function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  },

  // 根据ID获取签文
  getQianById: function(id) {
    var qianData = require('../../data/qianData.js').qianList;
    for (var i = 0; i < qianData.length; i++) {
      if (qianData[i].id === id) {
        return qianData[i];
      }
    }
    return null;
  },

  // 执行抽签
  doDraw: function() {
    if (this.data.isDrawing) {
      return;
    }

    this.setData({
      isDrawing: true
    });

    // 创建签筒摇晃动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    });

    // 摇晃动画
    var that = this;
    animation.rotate(-15).step();
    animation.rotate(15).step();
    animation.rotate(-10).step();
    animation.rotate(10).step();
    animation.rotate(-5).step();
    animation.rotate(5).step();
    animation.rotate(0).step();

    this.setData({
      tubeAnimation: animation.export()
    });

    // 2秒后执行抽签
    setTimeout(function() {
      that.performDraw();
    }, 2000);
  },

  // 执行抽签算法
  performDraw: function() {
    var scene = this.data.scene;
    var qian = this.weightedRandomDraw(scene);

    // 保存抽签记录
    this.saveDrawRecord(scene, qian.id);

    this.setData({
      isDrawing: false,
      qian: qian,
      showResult: true
    });
  },

  // 权重随机抽签
  weightedRandomDraw: function(scene) {
    var qianData = require('../../data/qianData.js').qianList;
    var sceneQian = [];

    // 筛选该场景的签（包括专属和综合签）
    for (var i = 0; i < qianData.length; i++) {
      if (qianData[i].scene === scene || qianData[i].scene === '综合') {
        sceneQian.push(qianData[i]);
      }
    }

    // 构建权重池
    var weightPool = [];
    for (var j = 0; j < sceneQian.length; j++) {
      var qian = sceneQian[j];
      var weight = 0;
      switch (qian.level) {
        case '上上签': weight = 5; break;
        case '上吉签': weight = 15; break;
        case '中吉签': weight = 30; break;
        case '中平签': weight = 30; break;
        case '下下签': weight = 5; break;
      }
      for (var k = 0; k < weight; k++) {
        weightPool.push(qian);
      }
    }

    // 随机选择
    var randomIndex = Math.floor(Math.random() * weightPool.length);
    return weightPool[randomIndex];
  },

  // 保存抽签记录
  saveDrawRecord: function(scene, qianId) {
    var today = this.getTodayStr();
    var record = wx.getStorageSync('drawRecord') || {};
    
    if (!record[today]) {
      record[today] = {};
    }
    
    record[today][scene] = {
      qianId: qianId,
      timestamp: Date.now()
    };
    
    wx.setStorageSync('drawRecord', record);
  },

  // 跳转到签文详情页
  goToDetail: function() {
    var qian = this.data.qian;
    var scene = this.data.scene;

    if (!qian) {
      wx.showToast({
        title: '签文数据错误',
        icon: 'none'
      });
      return;
    }

    var qianStr = encodeURIComponent(JSON.stringify(qian));
    
    wx.navigateTo({
      url: '/pages/draw/detail?qian=' + qianStr + '&scene=' + scene
    });
  }
});
