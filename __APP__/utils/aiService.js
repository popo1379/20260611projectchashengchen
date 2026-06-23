// ===== AI 命理分析服务 =====
// 使用云函数调用 AI 进行命理分析

// 支持的模型（CloudBase 内置）
var AI_MODEL = 'deepseek-v4-flash';

// 云环境 ID
var CLOUD_ENV = 'mortgagecalculator-9d0fqf0fbb151';

// 构建 Prompt 模板
function buildBaziPrompt(baziData) {
    var prompt = '你是专业命理分析师，请根据以下八字信息进行深度分析，语言要简洁专业，符合现代命理风格，总字数控制在500字以内。\n\n';
    
    prompt += '【八字信息】\n';
    prompt += '- 年柱：' + baziData.yearPillar + '（' + baziData.yearWuxing + '）\n';
    prompt += '- 月柱：' + baziData.monthPillar + '（' + baziData.monthWuxing + '）\n';
    prompt += '- 日柱：' + baziData.dayPillar + '（日主：' + baziData.dayMaster + '，五行：' + baziData.dayWuxing + '）\n';
    prompt += '- 时柱：' + baziData.hourPillar + '（' + baziData.hourWuxing + '）\n';
    prompt += '- 五行分布：' + baziData.wuxingDistribution + '\n';
    prompt += '- 身强/身弱：' + baziData.strengthStatus + '\n';
    prompt += '- 喜用神：喜' + baziData.xiElement + '、用' + baziData.yongElement + '\n';
    prompt += '- 生肖：' + baziData.zodiac + '\n';
    if (baziData.gender) {
        prompt += '- 性别：' + baziData.gender + '\n';
    }
    prompt += '\n';
    
    prompt += '【请重点分析以下内容】\n\n';
    prompt += '1. 【财富分析】（最重要，请详细分析）\n';
    prompt += '   - 财富格局：正财格/偏财格判断，财运算势强弱\n';
    prompt += '   - 理财能力：适合的投资方式、理财建议\n';
    prompt += '   - 财富时机：近期财运走势、适合积累财富的时机\n';
    prompt += '   - 破财风险：需要注意的财务风险时期\n\n';
    
    prompt += '2. 【事业分析】\n';
    prompt += '   - 事业方向：适合的行业领域、职业类型\n';
    prompt += '   - 工作运势：当前事业运势、职场贵人\n';
    prompt += '   - 发展建议：如何提升事业运势\n\n';
    
    prompt += '3. 【感情分析】\n';
    prompt += '   - 感情特质：感情模式、婚姻观念\n';
    prompt += '   - 姻缘时机：适合婚恋的时间节点\n';
    prompt += '   - 相处建议：与伴侣相处之道\n\n';
    
    prompt += '4. 【健康提示】\n';
    prompt += '   - 健康隐患：需要关注的健康问题\n';
    prompt += '   - 养生建议：日常养生重点\n\n';
    
    prompt += '请用分段格式输出，每个模块用【】标注标题。';
    
    return prompt;
}

// 构建问答 Prompt（用于智能问答模式）
function buildQAChatPrompt(baziData, userQuestion) {
    var prompt = '你是专业命理师，基于用户八字信息回答问题。\n\n';
    
    // 八字信息
    prompt += '【用户八字信息】\n';
    prompt += '- 年柱：' + baziData.yearPillar + '\n';
    prompt += '- 月柱：' + baziData.monthPillar + '\n';
    prompt += '- 日柱：' + baziData.dayPillar + '（日主：' + baziData.dayMaster + '）\n';
    prompt += '- 时柱：' + baziData.hourPillar + '\n';
    if (baziData.strengthStatus) {
        prompt += '- 身强/身弱：' + baziData.strengthStatus + '\n';
    }
    if (baziData.xiElement && baziData.yongElement) {
        prompt += '- 喜用神：喜' + baziData.xiElement + '、用' + baziData.yongElement + '\n';
    }
    prompt += '\n';
    
    // 用户问题
    prompt += '【用户问题】\n';
    prompt += userQuestion + '\n\n';
    
    // 回答规则
    prompt += '【回答规则】\n';
    prompt += '1. 回答字数控制在 100-200 字\n';
    prompt += '2. 结合用户具体八字分析，不要泛泛而谈\n';
    prompt += '3. 语气专业有温度，像资深命理师在交谈\n';
    prompt += '4. 涉及财富时，区分正财、偏财、理财建议等维度\n';
    prompt += '5. 适当给出建议，但不做绝对化预测\n';
    prompt += '6. 直接回答问题，不要多余的开场白\n\n';
    
    prompt += '请直接输出回答内容：';
    
    return prompt;
}

// 调用 AI 分析（使用云函数方式）
function callAIAnalysis(baziData, callback) {
    var prompt = buildBaziPrompt(baziData);
    
    console.log('=== AI分析请求开始 ===');
    console.log('使用模型:', AI_MODEL);
    console.log('Prompt内容:', prompt.substring(0, 100) + '...');
    
    // 获取云函数调用器
    var cloud = null;
    var app = getApp();
    
    console.log('getApp() 返回:', app);
    console.log('app.globalData:', app ? app.globalData : 'undefined');
    
    // 优先使用共享云实例
    if (app && app.globalData && app.globalData.sharedCloud) {
        cloud = app.globalData.sharedCloud;
        console.log('✓ 使用共享云实例调用云函数');
    } else {
        // 如果没有共享实例，直接创建新的云实例
        console.log('创建新的云实例...');
        if (typeof wx.cloud !== 'undefined' && typeof wx.cloud.Cloud === 'function') {
            try {
                var resourceAppid = "wx02933187189c34ad";
                var resourceEnv = "mortgagecalculator-9d0fqf0fbb151";
                
                cloud = new wx.cloud.Cloud({
                    resourceAppid: resourceAppid,
                    resourceEnv: resourceEnv,
                    traceUser: true
                });
                
                console.log('✓ 使用新创建的云实例');
                
                // 异步初始化
                cloud.init().then(function() {
                    console.log('✓ 云实例初始化成功，开始调用云函数');
                    doCallCloudFunction(cloud, baziData, prompt, callback);
                }).catch(function(err) {
                    console.error('✗ 云实例初始化失败:', err);
                    callback('云环境初始化失败：' + err.message, null);
                });
                return; // 异步执行，避免重复调用
                
            } catch (e) {
                console.error('✗ 创建云实例失败:', e);
                callback('云开发环境不可用：' + e.message, null);
                return;
            }
        } else {
            console.error('✗ 无法获取云开发实例');
            callback('云开发环境不可用', null);
            return;
        }
    }
    
    // 直接调用云函数
    doCallCloudFunction(cloud, baziData, prompt, callback);
}

// 执行云函数调用
function doCallCloudFunction(cloud, baziData, prompt, callback) {
    console.log('调用云函数: bazi-ai-analysis');
    console.log('cloud.callFunction 类型:', typeof cloud.callFunction);
    
    cloud.callFunction({
        name: 'bazi-ai-analysis',
        data: {
            baziData: baziData,
            prompt: prompt,
            model: AI_MODEL
        },
        timeout: 60000, // 60秒超时
        success: function(res) {
            console.log('=== 云函数调用成功 ===');
            console.log('响应结果:', JSON.stringify(res));
            
            if (res.errMsg && res.errMsg.indexOf('ok') !== -1) {
                // 云函数执行成功
                var result = res.result;
                if (result && result.success && result.content) {
                    console.log('AI返回内容长度:', result.content.length);
                    console.log('Token使用:', result.usage);
                    callback(null, result.content);
                } else if (result && result.error) {
                    console.error('AI执行错误:', result.error);
                    callback('AI分析失败：' + result.error, null);
                } else {
                    console.error('云函数返回格式异常:', JSON.stringify(result));
                    callback('云函数返回数据异常', null);
                }
            } else {
                console.error('云函数调用失败:', res.errMsg);
                callback('云函数调用失败：' + res.errMsg, null);
            }
        },
        fail: function(err) {
            console.error('=== 云函数调用失败 ===');
            console.error('错误信息:', err);
            callback('云函数调用失败：' + (err.errMsg || JSON.stringify(err)), null);
        }
    });
}

// 版本比较函数
function compareVersion(v1, v2) {
    v1 = v1 || '0';
    v2 = v2 || '0';
    var arr1 = v1.split('.');
    var arr2 = v2.split('.');
    var len = Math.max(arr1.length, arr2.length);
    for (var i = 0; i < len; i++) {
        var a = parseInt(arr1[i] || '0');
        var b = parseInt(arr2[i] || '0');
        if (a > b) return 1;
        if (a < b) return -1;
    }
    return 0;
}

// 流式调用 AI（可选，用于长文本生成）
function callAIAnalysisStream(baziData, onText, onFinish, onError) {
    var prompt = buildBaziPrompt(baziData);
    
    console.log('=== AI流式分析请求开始 ===');
    
    if (!wx.cloud || !wx.cloud.extend || !wx.cloud.extend.AI) {
        onError('当前微信版本不支持AI功能');
        return;
    }
    
    try {
        var model = wx.cloud.extend.AI.createModel('cloudbase');
        
        // streamText 参数需要包装在 data 对象中
        model.streamText({
            data: {
                model: AI_MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            },
            onText: function(text) {
                console.log('收到文本片段:', text);
                onText(text);
            },
            onFinish: function(fullText) {
                console.log('流式完成，总长度:', fullText.length);
                onFinish(fullText);
            }
        }).catch(function(err) {
            console.error('流式调用失败:', err);
            onError(err.message || '流式调用失败');
        });
    } catch (e) {
        onError(e.message);
    }
}

// 解析 AI 返回内容为结构化数据
function parseAIContent(content) {
    var result = {
        wealth: '',
        career: '',
        love: '',
        health: '',
        raw: content
    };
    
    // 尝试按分段解析
    var sections = content.split(/\n\n+/);
    
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i].trim();
        
        if (section.indexOf('【财富') !== -1 || section.indexOf('财富分析') !== -1) {
            result.wealth = section;
        } else if (section.indexOf('【事业') !== -1 || section.indexOf('事业分析') !== -1) {
            result.career = section;
        } else if (section.indexOf('【感情') !== -1 || section.indexOf('感情分析') !== -1) {
            result.love = section;
        } else if (section.indexOf('【健康') !== -1 || section.indexOf('健康提示') !== -1) {
            result.health = section;
        }
    }
    
    // 如果分段解析失败，整体放入财富分析
    if (!result.wealth && !result.career && !result.love && !result.health) {
        result.wealth = content;
    }
    
    return result;
}

// 调用 AI 问答（用于智能问答模式）
function callAIForQA(baziData, userQuestion, callback) {
    // 如果是完整命理分析报告请求，使用完整Prompt
    var isFullReport = userQuestion.indexOf('完整命理分析报告') !== -1 || userQuestion.indexOf('命理分析报告') !== -1;
    var prompt = isFullReport ? buildBaziPrompt(baziData) : buildQAChatPrompt(baziData, userQuestion);
    
    console.log('=== AI问答请求开始 ===');
    console.log('使用模型:', AI_MODEL);
    console.log('用户问题:', userQuestion);
    console.log('是否完整报告:', isFullReport);
    
    // 获取云函数调用器
    var cloud = null;
    var app = getApp();
    
    // 优先使用共享云实例
    if (app && app.globalData && app.globalData.sharedCloud) {
        cloud = app.globalData.sharedCloud;
        console.log('✓ 使用共享云实例调用云函数');
    } else {
        // 如果没有共享实例，直接创建新的云实例
        console.log('创建新的云实例...');
        if (typeof wx.cloud !== 'undefined' && typeof wx.cloud.Cloud === 'function') {
            try {
                var resourceAppid = "wx02933187189c34ad";
                var resourceEnv = "mortgagecalculator-9d0fqf0fbb151";
                
                cloud = new wx.cloud.Cloud({
                    resourceAppid: resourceAppid,
                    resourceEnv: resourceEnv,
                    traceUser: true
                });
                
                console.log('✓ 使用新创建的云实例');
                
                // 异步初始化
                cloud.init().then(function() {
                    console.log('✓ 云实例初始化成功');
                    doCallCloudFunctionQA(cloud, baziData, prompt, callback);
                }).catch(function(err) {
                    console.error('✗ 云实例初始化失败:', err);
                    callback('云环境初始化失败：' + err.message, null);
                });
                return; // 异步执行
                
            } catch (e) {
                console.error('✗ 创建云实例失败:', e);
                callback('云开发环境不可用：' + e.message, null);
                return;
            }
        } else {
            console.error('✗ 无法获取云开发实例');
            callback('云开发环境不可用', null);
            return;
        }
    }
    
    // 直接调用云函数
    doCallCloudFunctionQA(cloud, baziData, prompt, callback);
}

// 执行云函数调用（问答模式）
function doCallCloudFunctionQA(cloud, baziData, prompt, callback) {
    console.log('调用云函数: bazi-ai-analysis');
    
    cloud.callFunction({
        name: 'bazi-ai-analysis',
        data: {
            baziData: baziData,
            prompt: prompt,
            model: AI_MODEL
        },
        timeout: 60000,
        success: function(res) {
            console.log('=== 云函数调用成功 ===');
            
            if (res.errMsg && res.errMsg.indexOf('ok') !== -1) {
                var result = res.result;
                if (result && result.success && result.content) {
                    console.log('AI返回内容长度:', result.content.length);
                    callback(null, result.content);
                } else if (result && result.error) {
                    console.error('AI执行错误:', result.error);
                    callback('AI分析失败：' + result.error, null);
                } else {
                    console.error('云函数返回格式异常:', JSON.stringify(result));
                    callback('云函数返回数据异常', null);
                }
            } else {
                console.error('云函数调用失败:', res.errMsg);
                callback('云函数调用失败：' + res.errMsg, null);
            }
        },
        fail: function(err) {
            console.error('=== 云函数调用失败 ===');
            console.error('错误信息:', err);
            callback('云函数调用失败：' + (err.errMsg || JSON.stringify(err)), null);
        }
    });
}

module.exports = {
    callAIAnalysis: callAIAnalysis,
    callAIAnalysisStream: callAIAnalysisStream,
    callAIForQA: callAIForQA,
    parseAIContent: parseAIContent,
    buildBaziPrompt: buildBaziPrompt,
    buildQAChatPrompt: buildQAChatPrompt
};