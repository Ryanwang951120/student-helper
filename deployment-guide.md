# 🌐 學生助手 - 免 Node.js 部署指南

## 📋 準備清單

在開始之前，請確保您有：
- GitHub 帳號
- 所有專案檔案

## 🔧 步驟一：安裝 Node.js（推薦）

1. 前往 [Node.js 官網](https://nodejs.org)
2. 下載 LTS 版本 (推薦 18.x 或更新版本)
3. 執行安裝檔，一路點選「下一步」
4. 重新啟動 PowerShell
5. 測試安裝：在 PowerShell 輸入 `node --version`

## 🌐 步驟二：GitHub 上傳（如果沒有 Git）

### A. 手動上傳方式

1. **前往 GitHub**
   - 網址：https://github.com
   - 登入或註冊新帳號

2. **建立新儲存庫**
   - 點擊右上角 "+" → "New repository"
   - Repository name: `student-helper`
   - 選擇 "Public"
   - 點擊 "Create repository"

3. **上傳檔案**
   - 在儲存庫頁面點擊 "uploading an existing file"
   - 拖拽以下檔案/資料夾：
     ```
     ✅ src/ (整個資料夾)
     ✅ public/ (如果存在)
     ✅ index.html
     ✅ package.json
     ✅ package-lock.json
     ✅ vite.config.js
     ✅ vercel.json
     ✅ README.md
     
     ❌ 不要上傳：
     - node_modules/
     - dist/
     - .env 檔案
     ```

4. **確認上傳**
   - 輸入 commit 訊息：`Initial commit - Student Helper App`
   - 點擊 "Commit changes"

### B. 使用 Git（如果已安裝）

```bash
# 在專案目錄執行
git init
git add .
git commit -m "Initial commit - Student Helper App"
git branch -M main
git remote add origin https://github.com/您的用戶名/student-helper.git
git push -u origin main
```

## 🚀 步驟三：Vercel 部署

1. **前往 Vercel**
   - 網址：https://vercel.com
   - 點擊 "Sign up"

2. **連接 GitHub**
   - 選擇 "Continue with GitHub"
   - 授權 Vercel 存取您的 GitHub

3. **匯入專案**
   - 在 Vercel 儀表板點擊 "Import Project"
   - 找到 `student-helper` 儲存庫
   - 點擊 "Import"

4. **確認設定**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **開始部署**
   - 點擊 "Deploy"
   - 等待 2-5 分鐘完成建構

## 🎉 部署完成！

成功後您會獲得：
- 🌐 公開網址：`https://student-helper-xxx.vercel.app`
- 📱 PWA 功能：可安裝到桌面/手機
- 🔄 自動更新：GitHub 推送即自動重新部署

## 🔧 本地開發（安裝 Node.js 後）

```powershell
# 安裝依賴
npm install

# 本地開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽建構結果
npm run preview
```

## 📱 分享您的應用程式

部署完成後：
1. 複製 Vercel 提供的網址
2. 分享給朋友、同學
3. 可以在社群媒體宣傳
4. 用戶無需下載即可使用

## 🎯 自訂功能

### 自訂網域
1. 在 Vercel 專案設定中
2. 前往 "Domains" 頁籤
3. 添加您的網域

### 環境變數
1. 前往專案設定
2. 在 "Environment Variables" 添加變數

## ❓ 常見問題

**Q: 建構失敗怎麼辦？**
A: 檢查 Vercel 的 "Functions" 頁籤查看錯誤日誌

**Q: 如何更新應用程式？**
A: 在 GitHub 更新檔案，Vercel 會自動重新部署

**Q: 免費嗎？**
A: Vercel Hobby 方案完全免費，適合個人專案

**Q: 可以下線嗎？**
A: 可以在 Vercel 專案設定中暫停或刪除

---

🚀 **準備好讓您的學生助手上線了！**
