# 部署到 Cloudflare Pages 指南

## 方式 A：通過 GitHub 連接（推薦）

### 第 1 步：上傳到 GitHub
```bash
# 在 GitHub 上創建新倉庫，複製倉庫 URL
git remote add origin https://github.com/YOUR_USERNAME/loan-recommendation.git
git branch -M main
git push -u origin main
```

### 第 2 步：連接到 Cloudflare Pages
1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Pages**
3. 點擊 **Create a project** > **Connect to Git**
4. 授權 GitHub
5. 選擇 `loan-recommendation` 倉庫
6. 設定構建設置：
   - **Framework preset**: 選擇 "None"
   - **Build command**: 留空（保持空白）
   - **Build output directory**: 留空或不指定
7. 點擊 **Save and Deploy**

網站將自動部署至: `https://你的-project-name.pages.dev`

---

## 方式 B：使用 Wrangler CLI（直接上傳）

### 第 1 步：安裝 Wrangler
```bash
npm install -g @cloudflare/wrangler
```

### 第 2 步：創建 wrangler.toml 設定檔
在專案根目錄創建 `wrangler.toml`：

```toml
name = "loan-recommendation"
type = "javascript"
compatibility_date = "2026-01-01"
```

### 第 3 步：部署
```bash
wrangler pages deploy .
```

按照指示完成認證，網站將自動部署。

---

## 方式 C：拖拉拽上傳

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Pages**
3. 點擊 **Create a project** > **Direct Upload**
4. 將整個專案資料夾拖放到上傳區域
5. 點擊 **Deploy**

---

## 完成後

- ✅ 網站在 Cloudflare 上線
- ✅ 使用 Cloudflare 的全球 CDN
- ✅ 自動 HTTPS
- ✅ 支持自訂域名

## 配置自訂域名（可選）

1. 在 Cloudflare Pages 專案設定中
2. 進入 **Custom domains**
3. 點擊 **Add domain**
4. 輸入你的域名並按照指示設定 DNS

---

## 常見問題

**Q：如何更新網站？**
A：如果使用 GitHub 連接，只需推送代碼到 main 分支，Cloudflare 會自動重新部署。

**Q：如何設定環境變數？**
A：在 Cloudflare Pages 設定頁面的 **Environment variables** 部分添加。

**Q：網站的性能如何？**
A：Cloudflare Pages 使用全球 CDN，確保超快速度和高可用性。
