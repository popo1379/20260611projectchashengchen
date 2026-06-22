Page({
    data: {
        birthDate: '',
        birthTime: '',
        selectedCity: null,
        showCityModal: false,
        citySearchFocus: false,
        searchKeyword: '',
        cityResults: []
    },

    onLoad: function() {
        // 默认显示热门城市
        var cityData = require('../../data/cityCoordinates.js');
        var hotCities = [];
        var hotNames = ['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安', '南京', '重庆'];
        for (var i = 0; i < cityData.cityList.length; i++) {
            if (hotNames.indexOf(cityData.cityList[i].name) !== -1) {
                hotCities.push(cityData.cityList[i]);
            }
        }

        this.setData({
            cityResults: hotCities
        });
    },

    // 日期变更
    onDateChange: function(e) {
        this.setData({
            birthDate: e.detail.value
        });
    },

    // 时间变更
    onTimeChange: function(e) {
        this.setData({
            birthTime: e.detail.value
        });
    },

    // 显示城市搜索
    showCitySearch: function() {
        this.setData({
            showCityModal: true,
            citySearchFocus: true
        });
    },

    hideCitySearch: function() {
        this.setData({ showCityModal: false });
    },

    onSearchInput: function(e) {
        var keyword = e.detail.value;
        var cityData = require('../../data/cityCoordinates.js');
        var results = cityData.searchCity(keyword);

        this.setData({
            searchKeyword: keyword,
            cityResults: results
        });
    },

    selectCity: function(e) {
        var city = e.currentTarget.dataset.city;
        this.setData({
            selectedCity: city,
            showCityModal: false
        });
    },

    // 生成星盘
    generateChart: function() {
        if (!this.data.birthDate) {
            wx.showToast({
                title: '请选择出生日期',
                icon: 'none'
            });
            return;
        }

        if (!this.data.selectedCity) {
            wx.showToast({
                title: '请选择出生城市',
                icon: 'none'
            });
            return;
        }

        // 解析日期
        var dateParts = this.data.birthDate.split('-');
        var year = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]);
        var day = parseInt(dateParts[2]);

        // 解析时间（非必填）
        var hour = 12;
        var minute = 0;
        var hasExactTime = this.data.birthTime && this.data.birthTime.length > 0;

        if (hasExactTime) {
            var timeParts = this.data.birthTime.split(':');
            hour = parseInt(timeParts[0]);
            minute = parseInt(timeParts[1]);
        }

        var city = this.data.selectedCity;

        // 构建出生信息
        var birthInfo = {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            latitude: city.lat,
            longitude: city.lng,
            cityName: city.name,
            hasExactTime: hasExactTime
        };

        // 保存到全局，供结果页使用
        getApp().globalData.astrologyBirthInfo = birthInfo;

        wx.navigateTo({
            url: '/pages/astrology/result'
        });
    }
});
