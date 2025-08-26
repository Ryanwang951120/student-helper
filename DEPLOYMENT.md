# 🚀 學生助手 - 一鍵部署指南 | Student Helper - One-Click Deployment Guide

[中文](#中文版本) | [English](#english-version)

## 中文版本

### 🎯 快速部署（推薦方式）

這個專案已經配置好自動部署！只需要三個步驟：

#### 方式一：使用 Vercel 一鍵部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ryanwang951120/student-helper)

1. 點擊上方按鈕
2. 連接您的 GitHub 帳號
3. 等待部署完成（約2-3分鐘）

#### 方式二：Fork 後自動部署

1. **Fork 此專案**：點擊頁面右上角的 "Fork" 按鈕
2. **開啟 Vercel**：前往 [vercel.com](https://vercel.com) 並使用 GitHub 登入
3. **匯入專案**：選擇您 fork 的 `student-helper` 專案
4. **一鍵部署**：Vercel 會自動檢測設定並開始部署

#### 方式三：手動部署

詳細步驟請參考：
- [快速部署指南](./QUICK-DEPLOY.md) - 3步驟，7分鐘完成
- [完整部署指南](./deployment-guide.md) - 包含進階設定

### ✨ 部署後功能

部署成功後，您的學生助手將擁有：

- 📱 **PWA 支援**：可安裝到手機和電腦桌面
- 🌐 **全球 CDN**：快速載入，穩定存取
- 🔄 **自動更新**：推送程式碼自動重新部署
- 📊 **課表管理**：智能課表排程
- 📝 **作業追蹤**：作業提醒和統計
- 🎨 **主題切換**：深色/淺色模式
- 📈 **學習統計**：視覺化學習進度

### 🛠️ 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽建構結果
npm run preview
```

---

## English Version

### 🎯 Quick Deployment (Recommended)

This project is pre-configured for automatic deployment! Just three steps:

#### Method 1: One-Click Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ryanwang951120/student-helper)

1. Click the button above
2. Connect your GitHub account
3. Wait for deployment to complete (~2-3 minutes)

#### Method 2: Fork and Auto-Deploy

1. **Fork this project**: Click the "Fork" button in the top-right corner
2. **Open Vercel**: Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. **Import project**: Select your forked `student-helper` project
4. **One-click deploy**: Vercel will auto-detect settings and start deployment

#### Method 3: Manual Deployment

For detailed steps, see:
- [Quick Deploy Guide](./QUICK-DEPLOY.md) - 3 steps, 7 minutes
- [Complete Deployment Guide](./deployment-guide.md) - includes advanced settings

### ✨ Features After Deployment

Once deployed, your Student Helper will have:

- 📱 **PWA Support**: Installable on mobile and desktop
- 🌐 **Global CDN**: Fast loading, stable access
- 🔄 **Auto Updates**: Automatic redeployment on code push
- 📊 **Timetable Management**: Smart schedule planning
- 📝 **Assignment Tracking**: Assignment reminders and statistics
- 🎨 **Theme Switching**: Dark/Light mode
- 📈 **Learning Analytics**: Visual learning progress

### 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🚀 Deployment Options

- **Vercel** (Recommended): Zero-config deployment
- **Netlify**: Alternative static hosting
- **GitHub Pages**: Free hosting for public repos
- **Self-hosted**: Any static file server

### 📚 Additional Resources

- [Deployment Troubleshooting](./docs/troubleshooting.md)
- [Environment Variables Setup](./docs/environment.md)
- [Custom Domain Configuration](./docs/custom-domain.md)