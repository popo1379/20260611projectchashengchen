Page({
    data: {
        birthInfo: null,
        chart: null,
        sunKeywords: '',
        moonKeywords: '',
        ascKeywords: '',
        planetDisplay: [],
        legendItems: [],
        fortune: null,
        starText: '',
        currentDateText: '',
        selectedPlanetDetail: null,
        showPlanetModal: false,
        timelineDays: [],
        selectedDateIndex: 7,
        horoscopeParagraphs: [],
        dominantTitle: ''
    },

    onLoad: function() {
        var birthInfo = getApp().globalData.astrologyBirthInfo;
        if (!birthInfo) {
            wx.showToast({
                title: '请先填写出生信息',
                icon: 'none'
            });
            setTimeout(function() {
                wx.navigateBack();
            }, 1500);
            return;
        }

        this.setData({
            birthInfo: birthInfo
        });

        // 计算本命星盘
        this.calculateChart();

        // 初始化时间轴（过去7天 - 未来14天）
        this.initTimeline();

        // 计算初始运势
        this.calculateFortuneForDate(0);
    },

    onReady: function() {
        // 延迟绘制星盘图，确保canvas已渲染
        var self = this;
        setTimeout(function() {
            self.drawNatalChart();
        }, 200);
    },

    // 计算本命星盘
    calculateChart: function() {
        var engine = require('../../utils/astrologyEngine.js');
        var interpretation = require('../../data/astrologyInterpretation.js');

        var chart = engine.calculateNatalChart(this.data.birthInfo);

        // 关键词
        var sunKeywords = interpretation.getSignKeywords(chart.sun.signName).keywords;
        var moonKeywords = interpretation.getSignKeywords(chart.moon.signName).keywords;
        var ascKeywords = '';
        if (chart.ascendant) {
            ascKeywords = interpretation.getSignKeywords(chart.ascendant.signName).keywords;
        }

        // 行星展示列表（包括所有 10 颗行星）
        var planets = [];
        var allPlanets = [
            chart.sun, chart.moon, chart.mercury, chart.venus,
            chart.mars, chart.jupiter, chart.saturn
        ];

        if (chart.uranus) allPlanets.push(chart.uranus);
        if (chart.neptune) allPlanets.push(chart.neptune);
        if (chart.pluto) allPlanets.push(chart.pluto);

        if (chart.ascendant) {
            allPlanets.unshift(chart.ascendant);
        }

        for (var i = 0; i < allPlanets.length; i++) {
            var p = allPlanets[i];
            var interp = interpretation.getPlanetInterpretation(p.name, p.signName);
            planets.push({
                name: p.name,
                symbol: p.symbol,
                signName: p.signName,
                degreeInSign: p.degreeInSign,
                minuteInSign: p.minuteInSign,
                longitude: p.longitude,
                house: p.house || null,
                interpretation: interp,
                expanded: false
            });
        }

        // 图例
        var legend = [];
        for (var j = 0; j < chart.planets.length; j++) {
            legend.push({
                name: chart.planets[j].name,
                symbol: chart.planets[j].symbol
            });
        }

        this.setData({
            chart: chart,
            sunKeywords: sunKeywords,
            moonKeywords: moonKeywords,
            ascKeywords: ascKeywords,
            planetDisplay: planets,
            legendItems: legend
        });
    },

    // 绘制本命星盘图
    drawNatalChart: function() {
        if (!this.data.chart) return;

        try {
            var ctx = wx.createCanvasContext('natalChart', this);
            var centerX = 170;
            var centerY = 170;
            var outerRadius = 150;      // 黄道外圈
            var midRadius = 115;        // 宫位分隔环外边界
            var innerRadius = 70;       // 行星显示区外边界
            var centerRadius = 30;      // 中心小圆

            // ===== 1. 绘制外边框（黄道环）=====
            ctx.setStrokeStyle('rgba(244, 211, 94, 0.8)');
            ctx.setLineWidth(2);
            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
            ctx.stroke();

            // ===== 2. 绘制宫位环外圈 =====
            ctx.setStrokeStyle('rgba(244, 211, 94, 0.5)');
            ctx.setLineWidth(1);
            ctx.beginPath();
            ctx.arc(centerX, centerY, midRadius, 0, 2 * Math.PI);
            ctx.stroke();

            // ===== 3. 绘制行星区外圈 =====
            ctx.setStrokeStyle('rgba(201, 201, 214, 0.5)');
            ctx.setLineWidth(1);
            ctx.beginPath();
            ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
            ctx.stroke();

            // ===== 4. 中心圆 =====
            ctx.setStrokeStyle('rgba(244, 211, 94, 0.6)');
            ctx.setLineWidth(1);
            ctx.beginPath();
            ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
            ctx.stroke();

            // 定义坐标换算工具：以 ASC 作为 1 宫起点（在 canvas 中位于 180°/9 点钟方向），
            // 逆时针方向依次为 2、3、4... 12 宫
            // 即，某经度 L 在 canvas 中的角度 = -(L - ASC.longitude) + 180°
            // 为简化，统一用：相对于 ASC 的偏移（deg）→ canvas 角度
            var asc = this.data.chart.ascendant;
            var mc = this.data.chart.midheaven;

            function lonToCanvasAngle(lon) {
                // 若无 ASC，则以白羊座起点为参考（但本次有 ASC）
                var rel = asc ? (lon - asc.longitude) : lon;
                // 逆时针方向：rel 越大，角度越大（在 canvas 上 0° 为 12 点方向，顺时针增加）
                return (180 - rel) * Math.PI / 180;
            }

            function posAt(radius, lon) {
                var a = lonToCanvasAngle(lon);
                return {
                    x: centerX + radius * Math.cos(a),
                    y: centerY + radius * Math.sin(a)
                };
            }

            // ===== 5. 绘制 12 宫分界线（从中心贯穿到黄道外圈的实线）=====
            // 整宫制：宫位分界正好对应每个星座的 0°
            if (this.data.chart.houseCusps) {
                var cusps = this.data.chart.houseCusps;
                for (var ci = 0; ci < cusps.length; ci++) {
                    var cusp = cusps[ci];
                    var posOuter = posAt(outerRadius, cusp.longitude);
                    var posCenter = { x: centerX, y: centerY };

                    // 1宫（ASC）、4宫（IC）、7宫（DSC）、10宫（MC）为粗线（四大象限轴）
                    var isAxis = (cusp.houseNumber === 1 ||
                                  cusp.houseNumber === 4 ||
                                  cusp.houseNumber === 7 ||
                                  cusp.houseNumber === 10);

                    ctx.setStrokeStyle(isAxis ? 'rgba(238, 150, 75, 1.0)' : 'rgba(244, 211, 94, 0.5)');
                    ctx.setLineWidth(isAxis ? 2 : 1);
                    ctx.beginPath();
                    ctx.moveTo(posCenter.x, posCenter.y);
                    ctx.lineTo(posOuter.x, posOuter.y);
                    ctx.stroke();
                }
            }

            // ===== 6. 绘制黄道 12 星座符号（在黄道环与宫位环之间显示）=====
            ctx.setFillStyle('#f4d35e');
            ctx.setFontSize(14);

            var zodiacSyms = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

            // 每宫中心经度（以 1 宫中心为参考）
            if (this.data.chart.houseCusps) {
                var cusps = this.data.chart.houseCusps;
                for (var zi = 0; zi < 12; zi++) {
                    // 每宫中心
                    var centerLon = (cusps[zi].longitude + 15);
                    var textPos = posAt((midRadius + outerRadius) / 2, centerLon);

                    var symIdx = cusps[zi].signIndex;
                    ctx.setFillStyle('#f4d35e');
                    ctx.fillText(zodiacSyms[symIdx], textPos.x - 7, textPos.y + 5);

                    // 宫位编号（更小，靠近宫位环内侧）
                    var houseTextPos = posAt((innerRadius + midRadius) / 2, centerLon);
                    ctx.setFillStyle('#c9c9d6');
                    ctx.setFontSize(11);
                    ctx.fillText(String(cusps[zi].houseNumber), houseTextPos.x - 5, houseTextPos.y + 4);

                    ctx.setFontSize(14);
                    ctx.setFillStyle('#f4d35e');
                }
            } else {
                // 没有宫位数据（理论上不会出现），仍尝试显示星座符号
                for (var zi = 0; zi < 12; zi++) {
                    var lon = zi * 30 + 15;
                    var textPos = posAt((midRadius + outerRadius) / 2, lon);
                    ctx.fillText(zodiacSyms[zi], textPos.x - 7, textPos.y + 5);
                }
            }

            // ===== 7. 绘制行星（位于 innerRadius 与 centerRadius 之间）=====
            var planets = this.data.chart.planets;
            var planetColors = ['#f4d35e', '#c9c9d6', '#64b5f6', '#f48fb1', '#ef5350', '#81c784', '#bdbdbd'];

            ctx.setFontSize(16);

            for (var m = 0; m < planets.length; m++) {
                var p = planets[m];
                var planetPos = posAt((innerRadius + centerRadius) / 2 + 10, p.longitude);

                ctx.setFillStyle(planetColors[m % planetColors.length]);
                ctx.fillText(p.symbol, planetPos.x - 8, planetPos.y + 6);

                // 行星在内圈的小刻度（向外延伸到 innerRadius）
                var tickInner = { x: planetPos.x, y: planetPos.y };
                var tickOuterP = posAt(innerRadius - 2, p.longitude);

                ctx.setStrokeStyle(planetColors[m % planetColors.length]);
                ctx.setLineWidth(2);
                ctx.beginPath();
                ctx.moveTo(tickInner.x, tickInner.y);
                ctx.lineTo(tickOuterP.x, tickOuterP.y);
                ctx.stroke();

                // 行星度数（小字，贴近符号下方）
                ctx.setFillStyle('#c9c9d6');
                ctx.setFontSize(10);
                var degreeTextPos = posAt((innerRadius + centerRadius) / 2 - 5, p.longitude);
                ctx.fillText(p.degreeInSign + '°', degreeTextPos.x - 8, degreeTextPos.y + 20);
                ctx.setFontSize(16);
            }

            // ===== 8. 标记 ASC / DSC / MC / IC 文字 =====
            if (asc) {
                // ASC 在最左侧（9点钟）
                var ascPos = posAt(outerRadius + 18, asc.longitude);
                ctx.setFillStyle('#ee964b');
                ctx.setFontSize(12);
                ctx.fillText('ASC', ascPos.x - 12, ascPos.y + 4);

                // DSC（对宫）：第 7 宫宫头 = ASC + 180°
                var dscLon = ((asc.longitude + 180) % 360);
                var dscPos = posAt(outerRadius + 18, dscLon);
                ctx.fillText('DSC', dscPos.x - 12, dscPos.y + 4);
            }

            if (mc) {
                var mcPos = posAt(outerRadius + 18, mc.longitude);
                ctx.setFillStyle('#ee964b');
                ctx.setFontSize(12);
                ctx.fillText('MC', mcPos.x - 10, mcPos.y + 4);

                // IC：MC 对宫 = mc.longitude + 180
                var icLon = ((mc.longitude + 180) % 360);
                var icPos = posAt(outerRadius + 18, icLon);
                ctx.fillText('IC', icPos.x - 8, icPos.y + 4);
            }

            // ===== 9. 中心文字：本命星盘 =====
            ctx.setFillStyle('rgba(244, 211, 94, 0.7)');
            ctx.setFontSize(12);
            ctx.fillText('本命', centerX - 12, centerY - 2);
            ctx.fillText('星盘', centerX - 12, centerY + 12);

            // 绘制完成
            ctx.draw();
        } catch (e) {
            console.error('绘制星盘失败', e);
        }
    },

    // 显示行星详情
    showPlanetDetail: function(e) {
        var planetName = e.currentTarget.dataset.planet;
        var displayList = this.data.planetDisplay;

        for (var i = 0; i < displayList.length; i++) {
            if (displayList[i].name === planetName) {
                this.setData({
                    selectedPlanetDetail: displayList[i],
                    showPlanetModal: true
                });
                return;
            }
        }
    },

    closePlanetDetail: function() {
        this.setData({ showPlanetModal: false });
    },

    // 展开/收起行星解读
    togglePlanet: function(e) {
        var index = e.currentTarget.dataset.index;
        var displayList = this.data.planetDisplay;
        displayList[index].expanded = !displayList[index].expanded;
        this.setData({ planetDisplay: displayList });
    },

    // 初始化时间轴
    initTimeline: function() {
        var today = new Date();
        var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var days = [];

        // 生成过去7天到未来14天（共22天）
        for (var i = -7; i <= 14; i++) {
            var d = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
            days.push({
                day: d.getDate(),
                month: d.getMonth() + 1,
                monthText: (d.getMonth() + 1) + '月',
                weekday: d.getDay(),
                weekdayText: weekdays[d.getDay()],
                year: d.getFullYear(),
                isToday: i === 0,
                isSelected: i === 0,
                dateKey: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            });
        }

        this.setData({
            timelineDays: days,
            selectedDateIndex: 7
        });
    },

    // 选择日期
    selectDate: function(e) {
        var index = e.currentTarget.dataset.index;
        var days = this.data.timelineDays;

        for (var i = 0; i < days.length; i++) {
            days[i].isSelected = i === index;
        }

        this.setData({
            timelineDays: days,
            selectedDateIndex: index
        });

        // 计算选中日期的运势
        this.calculateFortuneForDate(index - 7);
    },

    // 计算指定日期的运势
    calculateFortuneForDate: function(offsetDays) {
        var engine = require('../../utils/astrologyEngine.js');
        var interpretation = require('../../data/astrologyInterpretation.js');

        var today = new Date();
        var targetDate = new Date(today.getTime() + offsetDays * 24 * 60 * 60 * 1000);

        var transitDate = {
            year: targetDate.getFullYear(),
            month: targetDate.getMonth() + 1,
            day: targetDate.getDate()
        };

        // 计算运势（包含相位事件）
        var chart = this.data.chart;
        var houseCusp = chart && chart.houseCusps ? chart.houseCusps : null;
        var firstCusp = houseCusp && houseCusp.length > 0 ? houseCusp[0].longitude : null;

        var fortune = engine.calculateDailyFortune(chart, transitDate, firstCusp);

        // 使用新的内容生成系统生成 Co-Star 风格段落
        var horoscopeParagraphs = interpretation.generateDailyHoroscope(fortune.events, fortune.dominantEvent);

        // 五星评级文字
        var starTexts = ['', '起伏日', '平稳日', '顺意日', '不错', '极佳'];

        var dateText = targetDate.getFullYear() + '年' +
                       (targetDate.getMonth() + 1) + '月' +
                       targetDate.getDate() + '日';

        this.setData({
            fortune: fortune,
            starText: starTexts[fortune.starRating] || '',
            currentDateText: (offsetDays === 0 ? '今日' : (offsetDays < 0 ? Math.abs(offsetDays) + '天前' : offsetDays + '天后')) + ' (' + dateText + ')',
            horoscopeParagraphs: horoscopeParagraphs,
            dominantTitle: fortune.dominantTitle || '今日宇宙讯息'
        });
    },

    // 返回输入页
    goBack: function() {
        wx.navigateBack();
    },

    // 返回首页
    goHome: function() {
        wx.navigateBack({
            delta: 10
        });
    }
});
