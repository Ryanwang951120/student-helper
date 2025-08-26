# 🎓 TMT-project - 學生助手課表管理工具

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green.svg)

一個現代化的 React 課表與作業管理應用程式，為學生提供完整的學習管理解決方案。

[🚀 快速開始](#-安裝與執行) · [📖 功能介紹](#-功能特色) · [🛠️ 開發指南](#-開發指南)

</div>

## ✨ 功能特色

### 📅 課表總覽
- **智慧課表顯示** - 清晰的週課表視圖，支援 15 個時段
- **實時高亮** - 自動標示當前時段
- **多日期格式** - 支援多種日期時間格式
- **週末切換** - 可選擇顯示/隱藏週末
- **課程管理** - 完整的課程新增、編輯、刪除功能

### 📚 作業追蹤  
- **智慧排序** - 按截止日期自動排序，逾期作業特別標示
- **狀態管理** - 支援待完成、已完成、已逾期狀態
- **作業封存** - 完成的作業可封存查看
- **剩餘天數** - 清楚顯示截止倒數天數
- **多元操作** - 支援標記完成、刪除、封存等操作

### 📊 統計分析
- **視覺化圖表** - 使用 Chart.js 展示學習數據
- **作業完成率** - 圓餅圖顯示整體完成情況
- **課程統計** - 各科目作業數量分析
- **趨勢追蹤** - 學習進度時間軸

### 🍅 番茄鐘功能
- **專注計時** - 25/5 分鐘專注/休息循環
- **視覺進度** - 圓形進度條實時顯示
- **科目綁定** - 可選擇學習科目進行專注
- **今日統計** - 追蹤每日完成的番茄鐘數量
- **靈活設定** - 可自訂專注和休息時間

### � 現代化介面
- **深色/亮色模式** - 支援主題自由切換
- **響應式設計** - 完美適配手機、平板、桌面
- **PWA 支援** - 可安裝為手機 App 使用
- **通知系統** - 瀏覽器通知提醒重要事項
- **極簡設計** - 注重用戶體驗的現代化界面

### 🔧 資料管理
- **本地存儲** - 所有資料保存在瀏覽器中
- **匯出/匯入** - JSON 格式資料備份
- **一鍵清除** - 安全的資料重置功能
- **版本兼容** - 向後兼容的資料格式

## 🚀 安裝與執行

### 前置需求
- **Node.js** v16.0.0 或以上版本
- **npm** v7.0.0 或以上版本 / **yarn** v1.22.0 或以上版本

### 快速開始

1. **複製專案**
```bash
git clone https://github.com/your-username/TMT-project.git
cd TMT-project
```

2. **安裝依賴**
```bash
npm install
# 或使用 yarn
yarn install
```

3. **啟動開發服務器**
```bash
npm run dev
# 或使用 yarn
yarn dev
```

4. **開啟瀏覽器**
   
   訪問 `http://localhost:5173` 即可使用

### 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發服務器 |
| `npm run build` | 建置生產版本 |
| `npm run preview` | 預覽建置結果 |
| `npm run lint` | 程式碼品質檢查 |

## 📁 專案結構

```
TMT-project/
├── public/                    # 靜態資源
│   ├── sw.js                 # Service Worker
│   └── manifest.json         # PWA 配置
├── src/
│   ├── components/           # React 組件
│   │   ├── StatisticsChart.jsx    # 統計圖表
│   │   ├── PWAInstallPrompt.jsx   # PWA 安裝提示
│   │   ├── PomodoroTimer.jsx      # 番茄鐘計時器
│   │   ├── NotesSystem.jsx        # 筆記系統
│   │   ├── ExamManager.jsx        # 考試管理
│   │   └── ThemeCustomizer.jsx    # 主題自訂
│   ├── hooks/                # 自訂 Hooks
│   │   ├── useNotifications.js    # 通知功能
│   │   └── useSearch.js           # 搜尋功能
│   ├── App.jsx               # 主應用組件
│   ├── App.css               # 組件樣式
│   ├── index.css             # 全域樣式與主題
│   └── main.jsx              # 應用入口
├── index.html                # HTML 模板
├── vite.config.js           # Vite 配置
└── package.json             # 專案配置
```

## 🎯 使用方法

### 課表管理
1. **新增課程** - 點擊浮動的「+」按鈕
2. **查看詳情** - 點擊課表中的課程卡片
3. **編輯課程** - 在課程詳情中可進行修改
4. **時段設定** - 支援第 1-15 節的靈活排課

### 作業追蹤
1. **新增作業** - 在作業頁面點擊「+」按鈕
2. **狀態切換** - 點擊勾選圖示標記完成狀態
3. **作業封存** - 點擊封存圖示移至歷史記錄
4. **查看歷史** - 切換到「歷史作業」查看封存項目

### 統計分析
- **完成率圓餅圖** - 視覺化顯示作業完成情況
- **課程統計** - 各科目的作業數量分佈
- **即時更新** - 數據隨作業狀態即時更新

### 番茄鐘使用
1. **選擇科目** - 從下拉選單選擇學習科目
2. **調整時間** - 使用滑塊設定專注/休息時間
3. **開始計時** - 點擊播放按鈕開始專注
4. **查看統計** - 底部顯示今日完成統計

### 個性化設定
- **主題切換** - 右上角太陽/月亮圖示
- **顯示設定** - 在設定頁面調整時間日期格式
- **通知設定** - 啟用/停用瀏覽器通知
- **資料管理** - 匯出/匯入/清除資料

## 🛠️ 技術棧

### 前端技術
- **React 18.2.0** - 現代化 React 框架
- **Vite 4.4.5** - 快速的前端建置工具
- **Lucide React** - 優雅的圖示庫
- **Chart.js 4.5.0** - 強大的圖表庫

### 開發工具
- **ESLint** - 代碼品質檢查
- **Modern CSS** - CSS Variables + Flexbox/Grid
- **Service Worker** - PWA 離線支援
- **Web Notifications API** - 瀏覽器通知

### 特色技術
- **CSS Variables** - 動態主題切換
- **Responsive Design** - 響應式佈局
- **Local Storage** - 客戶端資料持久化
- **PWA** - 漸進式網頁應用

## 🚧 開發指南

### 已完成功能
- ✅ 課表總覽與管理
- ✅ 作業追蹤系統
- ✅ 統計分析圖表
- ✅ 番茄鐘專注計時器
- ✅ 深色/亮色主題切換
- ✅ 響應式設計
- ✅ PWA 支援
- ✅ 通知系統
- ✅ 資料匯出/匯入
- ✅ 本地資料存儲

### 開發計畫
- [ ] 🔔 更豐富的通知設定
- [ ] 📱 手機端優化
- [ ] 🌐 多語言支援
- [ ] 📅 行事曆整合
- [ ] 🎯 學習目標設定
- [ ] 📈 更詳細的學習分析
- [ ] 🔄 雲端同步功能
- [ ] 👥 多用戶支援

### 貢獻指南
1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 文件

## 🤝 致謝

- **React 團隊** - 提供強大的前端框架
- **Vite 團隊** - 快速的建置工具
- **Lucide** - 美觀的圖示庫
- **Chart.js** - 優秀的圖表解決方案

---

<div align="center">

**[⬆ 回到頂部](#-tmt-project---學生助手課表管理工具)**

Made with ❤️ by TMT Project Team

</div>
