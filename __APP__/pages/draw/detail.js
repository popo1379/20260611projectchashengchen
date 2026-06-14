Page({
  data: {
    qian: null,
    scene: '',
    sceneName: '',
    _interstitialAd: null
  },

  onLoad: function(options) {
    var qianStr = options.qian;
    var scene = options.scene;

    if (!qianStr || !scene) {
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      });
      setTimeout(function() {
        wx.navigateBack();
      }, 1500);
      return;
    }

    try {
      var qian = JSON.parse(decodeURIComponent(qianStr));
      var sceneName = this.getSceneName(scene);

      this.setData({
        qian: qian,
        scene: scene,
        sceneName: sceneName
      });

      wx.setNavigationBarTitle({
        title: qian.title + ' - 签文详情'
      });

      // ===== 进入页面后展示插屏广告 =====
      var that = this;
      if (wx.createInterstitialAd) {
        var ad = wx.createInterstitialAd({
          adUnitId: 'adunit-c379e822cc83fd65'
        });
        ad.onLoad(function() {});
        ad.onError(function(err) {
          console.error('插屏广告加载失败', err);
        });
        ad.onClose(function() {});
        this.data._interstitialAd = ad;
        // 页面渲染完成后延迟一小段时间再展示，体验更自然
        setTimeout(function() {
          ad.show().catch(function(err) {
            console.error('插屏广告显示失败', err);
          });
        }, 300);
      }
    } catch (e) {
      wx.showToast({
        title: '数据解析失败',
        icon: 'none'
      });
    }
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

  // 再抽一签
  drawAgain: function() {
    var that = this;
    wx.showModal({
      title: '确认提示',
      content: '每日每场景仅可抽签一次，确定要重新抽签吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: function(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/draw/draw'
          });
        }
      }
    });
  },

  // 返回首页
  goBackHome: function() {
    wx.switchTab({
      url: '/pages/tabbar/bazi'
    });
  }
});
