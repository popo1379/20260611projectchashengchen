// AI 命理智能问答页面
var aiService = require('../../utils/aiService.js');

Page({
    data: {
        baziData: null,
        // 对话相关
        messages: [],
        suggestions: [],
        inputText: '',
        isLoading: false,
        error: null,
        scrollToView: '',
        askedQuestions: [] // 已问过的问题
    },

    // 问题池
    questionPool: {
        love: [
            { icon: '💰', text: '我的正缘什么时候出现？' },
            { icon: '❤️', text: '感情中需要注意什么？' },
            { icon: '🌸', text: '最近有桃花运吗？' },
            { icon: '💑', text: '适合什么样的伴侣？' }
        ],
        career: [
            { icon: '💼', text: '我适合创业还是打工？' },
            { icon: '📈', text: '我的事业发展方向是什么？' },
            { icon: '🔄', text: '今年适合跳槽吗？' },
            { icon: '🤝', text: '我的职场贵人是谁？' }
        ],
        wealth: [
            { icon: '💵', text: '今年的财运走势如何？' },
            { icon: '⚠️', text: '有没有破财风险？' },
            { icon: '🍀', text: '有什么旺财建议？' },
            { icon: '💎', text: '适合什么行业赚钱？' }
        ],
        health: [
            { icon: '🏥', text: '需要注意什么健康问题？' },
            { icon: '🧘', text: '有什么养生建议？' },
            { icon: '💪', text: '我的体质特点是什么？' }
        ],
        destiny: [
            { icon: '⭐', text: '我的喜用神是什么？' },
            { icon: '🌟', text: '今年大运走势如何？' },
            { icon: '🎯', text: '我的一生命运如何？' }
        ]
    },

    onLoad: function(options) {
        // 从全局获取八字数据
        var baziData = getApp().globalData.baziAIData;
        if (!baziData) {
            this.setData({
                error: '未获取到八字数据，请重新查询'
            });
            return;
        }

        this.setData({
            baziData: baziData
        });

        // 初始化推荐问题
        this.initSuggestions();
    },

    // 初始化推荐问题
    initSuggestions: function() {
        var pool = this.questionPool;
        var categories = ['love', 'career', 'wealth', 'health', 'destiny'];
        
        // 从每个维度随机选1个，共5个
        var suggestions = [];
        categories.forEach(function(cat) {
            var items = pool[cat];
            if (items && items.length > 0) {
                var randomIndex = Math.floor(Math.random() * items.length);
                suggestions.push({
                    icon: items[randomIndex].icon,
                    text: items[randomIndex].text,
                    category: cat,
                    id: items[randomIndex].text
                });
            }
        });

        // 打乱顺序
        suggestions.sort(function() {
            return 0.5 - Math.random();
        });

        this.setData({
            suggestions: suggestions.slice(0, 4) // 只显示4个
        });
    },

    // 点击推荐问题
    clickSuggestion: function(e) {
        var question = e.currentTarget.dataset.question;
        var text = question.text;
        
        // 添加到已问列表
        var asked = this.data.askedQuestions;
        asked.push(text);
        
        this.setData({
            inputText: text,
            askedQuestions: asked
        });

        // 发送消息
        this.sendMessage();
    },

    // 发送消息
    sendMessage: function() {
        var self = this;
        var text = this.data.inputText.trim();
        
        if (!text) {
            return;
        }

        // 添加用户消息
        var messages = this.data.messages;
        messages.push({
            role: 'user',
            content: text,
            time: self.formatTime(new Date())
        });

        // 清空输入
        var askedQuestions = this.data.askedQuestions;
        askedQuestions.push(text);

        this.setData({
            messages: messages,
            inputText: '',
            isLoading: true,
            askedQuestions: askedQuestions,
            scrollToView: 'msg-' + (messages.length - 1)
        });

        // 调用 AI
        this.callAI(text);
    },

    // 调用 AI
    callAI: function(question) {
        var self = this;

        aiService.callAIForQA(this.data.baziData, question, function(err, result) {
            if (err) {
                self.addAIMessage('抱歉，AI分析遇到问题：' + err);
                return;
            }

            self.addAIMessage(result);
        });
    },

    // 添加AI消息
    addAIMessage: function(content) {
        var messages = this.data.messages;
        var index = messages.length;
        
        messages.push({
            role: 'assistant',
            content: content,
            time: this.formatTime(new Date())
        });

        // 移除刚才选中的问题
        var suggestions = this.data.suggestions.filter(function(item) {
            return item.text !== this.data.inputText;
        }.bind(this));

        // 添加新推荐
        var newSuggestions = this.generateNextSuggestions();

        this.setData({
            messages: messages,
            suggestions: newSuggestions,
            isLoading: false,
            scrollToView: 'msg-' + index
        });
    },

    // 生成下一轮推荐问题
    generateNextSuggestions: function() {
        var pool = this.questionPool;
        var currentSuggestions = this.data.suggestions;
        var asked = this.data.askedQuestions;
        
        var newSuggestions = [];
        var categories = ['love', 'career', 'wealth', 'health', 'destiny'];
        
        // 从未推荐的维度各选1个
        categories.forEach(function(cat) {
            var items = pool[cat];
            if (items) {
                items.forEach(function(item) {
                    if (asked.indexOf(item.text) === -1 && !this.isInSuggestions(item.text)) {
                        newSuggestions.push({
                            icon: item.icon,
                            text: item.text,
                            category: cat,
                            id: item.text
                        });
                    }
                }.bind(this));
            }
        }.bind(this));

        // 随机选4个
        newSuggestions.sort(function() {
            return 0.5 - Math.random();
        });

        return newSuggestions.slice(0, 4);
    },

    // 检查问题是否已在推荐列表
    isInSuggestions: function(text) {
        var current = this.data.suggestions;
        for (var i = 0; i < current.length; i++) {
            if (current[i].text === text) {
                return true;
            }
        }
        return false;
    },

    // 输入框内容变化
    onInputChange: function(e) {
        this.setData({
            inputText: e.detail.value
        });
    },

    // 清空对话
    clearChat: function() {
        var self = this;
        wx.showModal({
            title: '提示',
            content: '确定要清空对话记录吗？',
            success: function(res) {
                if (res.confirm) {
                    self.setData({
                        messages: [],
                        askedQuestions: []
                    });
                    self.initSuggestions();
                }
            }
        });
    },

    // 格式化时间
    formatTime: function(date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        return (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute;
    },

    // 返回
    goBack: function() {
        wx.navigateBack({
            delta: 2
        });
    },

    // 分享
    onShareAppMessage: function() {
        return {
            title: 'AI命理智能问答',
            path: '/pages/tabbar/bazi'
        };
    }
});
