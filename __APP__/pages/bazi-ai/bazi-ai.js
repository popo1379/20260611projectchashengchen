// AI 命理分析结果页面
var aiService = require('../../utils/aiService.js');

Page({
    data: {
        baziData: null,
        aiResult: null,
        parsedResult: {
            wealth: '',
            career: '',
            love: '',
            health: ''
        },
        loading: true,
        error: null,
        activeTab: 'wealth'
    },

    onLoad: function(options) {
        // 从全局获取八字数据
        var baziData = getApp().globalData.baziAIData;
        if (!baziData) {
            this.setData({
                loading: false,
                error: '未获取到八字数据，请重新查询'
            });
            return;
        }

        this.setData({
            baziData: baziData
        });

        // 调用 AI 分析
        this.callAI(baziData);
    },

    // 调用 AI 分析
    callAI: function(baziData) {
        var self = this;
        this.setData({ loading: true, error: null });

        aiService.callAIAnalysis(baziData, function(err, result) {
            if (err) {
                self.setData({
                    loading: false,
                    error: err
                });
                return;
            }

            // 解析结果
            var parsed = aiService.parseAIContent(result);

            self.setData({
                loading: false,
                aiResult: result,
                parsedResult: parsed
            });
        });
    },

    // 切换标签
    switchTab: function(e) {
        var tab = e.currentTarget.dataset.tab;
        this.setData({
            activeTab: tab
        });
    },

    // 重新分析
    retryAnalysis: function() {
        if (this.data.baziData) {
            this.callAI(this.data.baziData);
        }
    },

    // 返回首页
    goBack: function() {
        wx.navigateBack({
            delta: 2
        });
    },

    // 分享功能
    onShareAppMessage: function() {
        return {
            title: 'AI命理分析报告',
            path: '/pages/tabbar/bazi'
        };
    }
});