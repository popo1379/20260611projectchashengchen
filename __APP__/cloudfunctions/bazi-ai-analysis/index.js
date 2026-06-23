// 云函数：AI命理分析
const tcb = require('@cloudbase/node-sdk');

const app = tcb.init({
    env: 'mortgagecalculator-9d0fqf0fbb151'
});

// 复用 AI 实例，减少冷启动开销
let modelInstance = null;

exports.main = async (event, context) => {
    const { baziData, prompt, model } = event;
    
    try {
        if (!modelInstance) {
            const ai = app.ai();
            modelInstance = ai.createModel('cloudbase');
        }
        
        const result = await modelInstance.generateText({
            model: model || 'deepseek-v4-flash',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            timeout: 60000
        });
        
        return {
            success: true,
            content: result.text,
            usage: result.usage
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message || 'AI调用失败',
            code: error.code || 'UNKNOWN_ERROR'
        };
    }
};
