# 上線檢查清單

> 每次 release 前後照這份檢查。技術細節見 `technical-seo.md`。標示「品牌所有者」的步驟需要帳號權限，開發工作階段不會代做。

## 1. 上線前（開發工作階段，在預覽站）

- [ ] `npm run build` 成功，最後一行是 `verify-dist: … look right`（它會檢查每頁的 lang、title、description、canonical、hreflang、結構化資料、預約連結與 sitemap）
- [ ] 預覽 `http://127.0.0.1:4173/`：首頁、教練團隊、一位教練、服務流程、隱私權，三種語言（`/`、`/en/`、`/zh-CN/`）
- [ ] 亮色、暗色、跟隨系統；手機、平板、桌機
- [ ] 語言切換會留在同一頁；不存在的網址顯示 404 頁
- [ ] 預約按鈕：一般表單、三位教練的預填連結（`src/data/coaches.js` 沒有被改）
- [ ] console 沒有錯誤（Cloudflare 統計在本機的 CORS 錯誤除外，正式站不會有）
- [ ] 品牌所有者看過預覽，說 release

## 2. 上線後（開發工作階段）

- [ ] `coach-wait-live` 回報 live
- [ ] 正式站直接打開：`/`、`/en/`、`/zh-CN/coaches/isaac`、`/services`、`/about`、一個不存在的網址
- [ ] 檢視原始碼（不執行 JS）看得到頁面正文、正確的 `<html lang>` 與 title
- [ ] `https://coach-isaac.github.io/sitemap.xml`、`/robots.txt` 可以打開

## 3. Google Search Console（品牌所有者）

前提：網站擁有權驗證碼在 `index.html`，不要刪除。

1. **Sitemap**：左側「Sitemap」→ 輸入 `sitemap.xml` → 提交（已提交過就按重新提交）。顯示「成功」只代表讀得到，不代表已收錄。
2. **網址檢查首頁**：上方搜尋列貼 `https://coach-isaac.github.io/` → 「測試線上網址」→「查看已測試的網頁」→「HTML」，確認看得到首頁正文（例如「前進，不只有一種方式。」）。
3. **確認 canonical**：同一畫面的「網頁索引」→「Google 選擇的標準網址」應該是該頁自己。
4. **要求建立索引**：對首頁、`/coaches`、`/services` 按「要求建立索引」。每天有次數限制；送出不保證收錄或時間。
5. **教練頁與語言版本**：對 `/coaches/isaac`、`/en/`、`/zh-CN/` 各做一次步驟 2–4。
6. **之後每週看一次**：「網頁」報表的已索引數量與原因；「成效」報表的查詢（品牌字 Stepflect／進一程 vs 非品牌字）、各頁曝光與點擊、CTR。
7. **結構化資料**：用 https://validator.schema.org/ 和 https://search.google.com/test/rich-results 測首頁與一位教練頁。「有效」只代表格式正確，不保證出現複合式結果。

## 4. 外部品牌一致性（品牌所有者）

| 項目 | 狀態（2026-11-25） | 要做的事 |
|---|---|---|
| Google 表單標題與說明 | 已更新為 Stepflect（研究時讀取確認） | 確認「送出後的確認訊息」也改成新品牌（研究時看不到） |
| 表單「選擇教練」選項 | 三位教練的文字與網站預填連結一致 | **不要改選項文字**；要改請先告訴開發工作階段同步更新 `coaches.js` |
| 教練個人社群（Instagram、LinkedIn） | 個人帳號，不屬於品牌 | 各教練自行決定是否在簡介提到 Stepflect |
| 品牌官方社群帳號 | 尚未建立 | 建立後才能加進結構化資料的 `sameAs` |
| Email 簽名、LINE、其他對外介紹 | 未確認 | 有用到「Coach Isaac」的地方改成 Stepflect 進一程 |

## 5. 商標與網域（品牌所有者，待確認）

| 項目 | 狀態 |
|---|---|
| 「Stepflect」完全同名 | 網路搜尋沒找到（初步） |
| 近似 Stepflex | 已有美國商標（足部矯具 Class 10、聯軸器 Class 7）與產品（已確認） |
| 台灣智慧局、USPTO、WIPO、EUIPO 檢索 | 未查，需要瀏覽器互動；建議請代理人查 Nice 第 41 類 |
| 網域 stepflect.com 等 | 未查；可用 `https://rdap.verisign.com/com/v1/domain/stepflect.com` 自行確認（404 通常代表未註冊，以註冊商為準） |
| 社群帳號名稱 | YouTube @stepflect 當時回 404，其他平台未確認 |

不購買網域、不註冊商標、不改 GitHub Pages 網域。取得新網域時，先寫 SEO 遷移計畫再動手。
