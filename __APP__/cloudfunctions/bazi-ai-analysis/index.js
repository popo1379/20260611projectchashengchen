// 云函数：AI命理分析
const tcb = require('@cloudbase/node-sdk');

// 初始化云开发
const app = tcb.init({
    env: 'mortgagecalculator-9d0fqf0fbb151'
});

exports.main = async (event, context) => {
    const { baziData, prompt, model } = event;
    
    console.log('=== AI命理分析云函数 ===');
    console.log('接收到的八字数据:', JSON.stringify(baziData));
    console.log('使用模型:', model || 'deepseek-v4-flash');
    
    try {
        // 获取 AI 实例
        const ai = app.ai();
        
        // 创建模型实例（cloudbase 是内置组名）
        const modelInstance = ai.createModel('cloudbase');
        
        // 调用 AI 生成文本，设置超时
        const result = await modelInstance.generateText({
            model: model || 'deepseek-v4-flash',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            timeout: 60000 // 60秒超时
        });
        
        console.log('=== AI调用成功 ===');
        console.log('生成的文本长度:', result.text ? result.text.length : 0);
        console.log('Token使用:', result.usage);
        
        return {
            success: true,
            content: result.text,
            usage: result.usage
        };
        
    } catch (error) {
        console.error('=== AI调用失败 ===');
        console.error('错误信息:', error);
        
        return {
            success: false,
            error: error.message || 'AI调用失败',
            code: error.code || 'UNKNOWN_ERROR'
        };
    }
};
