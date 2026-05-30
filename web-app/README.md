# 中华万年历 Web 版

八字查询、万年历、老黄历 - 基于微信小程序转换的 PC Web 版本

## 功能特性

- **八字查询**：输入出生日期时辰，获取详细八字信息
- **万年历**：查看任意日期的农历、公历信息及节日
- **老黄历**：每日宜忌、吉凶神煞、生辰八字

## 技术栈

- Vue 3
- Vite
- Pinia (状态管理)
- lunar-javascript (农历计算)
- SCSS

## 安装与运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
web-app/
├── src/
│   ├── api/
│   │   └── lunar.js       # 农历计算 API
│   ├── assets/
│   │   └── styles/        # 全局样式
│   ├── components/
│   │   └── DateTabs.vue   # 日期选择组件
│   ├── router/
│   │   └── index.js       # 路由配置
│   ├── stores/
│   │   └── system.js      # 状态管理
│   ├── views/
│   │   ├── BaziView.vue   # 八字查询页面
│   │   ├── CalendarView.vue # 万年历页面
│   │   └── AlmanacView.vue  # 老黄历页面
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

## 部署说明

### 静态部署

构建后的文件在 `dist` 目录，可直接部署到任意静态服务器：

```bash
npm run build
# 将 dist 目录部署到服务器
```

### 推荐的部署方式

1. **Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm i -g netlify-cli
   netlify deploy
   ```

3. **Cloudflare Pages**
   - 连接 GitHub 仓库
   - 设置构建命令: `npm run build`
   - 设置输出目录: `dist`

4. **Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       try_files $uri $uri/ /index.html;
   }
   ```

## 开发说明

本项目由微信小程序转换而来，主要改动：

1. 移除微信专有 API（如 `wx.request` 改为 `fetch`）
2. 适配 Vue 3 + Web 标准组件
3. PC 端布局优化
4. 保留原有业务逻辑

## License

MIT
