# 🚀 3步驟快速部署指南

## 📦 步驟 1: 準備檔案

### 需要上傳的檔案清單：
```
📁 必須上傳：
├── src/ (整個資料夾)
├── public/ (如果存在)
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
└── README.md
```

### 🎯 快速打包方式：
1. 選擇上述所有檔案和資料夾
2. 右鍵 → 傳送到 → 壓縮(zipped)資料夾
3. 命名為 `student-helper.zip`

---

## 🌐 步驟 2: GitHub 上傳（3分鐘）

### A. 建立儲存庫
1. 前往：https://github.com
2. 登入 → 點擊 "+" → "New repository"
3. 填入：
   - **Repository name**: `student-helper`
   - 選擇 **Public**
   - 勾選 **Add a README file**
4. 點擊 **Create repository**

### B. 上傳檔案
1. 在新儲存庫頁面點擊 **Add files** → **Upload files**
2. 拖拽 `student-helper.zip` 到上傳區域
3. 等待上傳完成
4. 在底部輸入：`Initial commit - Student Helper App`
5. 點擊 **Commit changes**

---

## 🚀 步驟 3: Vercel 部署（2分鐘）

### A. 連接 Vercel
1. 前往：https://vercel.com
2. 點擊 **Sign up**
3. 選擇 **Continue with GitHub**
4. 授權 Vercel 存取 GitHub

### B. 部署專案
1. 在 Vercel 儀表板點擊 **Import Project**
2. 找到 `student-helper` 儲存庫
3. 點擊 **Import**
4. 確認設定：
   ```
   Framework Preset: Vite ✅
   Build Command: npm run build ✅
   Output Directory: dist ✅
   ```
5. 點擊 **Deploy**
6. 等待 2-3 分鐘完成

---

## 🎉 完成！

部署成功後您會獲得：
- 🌐 **公開網址**: https://student-helper-xxx.vercel.app
- 📱 **可分享**: 任何人都能使用
- 🔄 **自動更新**: 更新 GitHub 自動重新部署

### 🎯 下一步：
1. 複製您的應用程式網址
2. 分享給朋友同學
3. 享受您的學生助手！

---

**⏱️ 總計時間：約 7 分鐘**
**💡 一次設定，終身使用！**
