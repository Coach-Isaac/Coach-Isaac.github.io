# Plan：Coach Isaac → Stepflect｜進一程 品牌重塑

> 2026-11-25。第一輪（研究、盤點、Brand Lab）完成，品牌所有者選定設計；第二輪在 `develop` 實作，品牌所有者看過預覽、說 release 才上線。品牌內容見 `brand-guide.md`，視覺規格見 `design-spec.md`。

## 1. 改版原因

1. 「Coach」在台灣容易被聯想到運動、健身、技能指導。
2. 潛在客戶搜尋的是自己的議題，而不是「Coach」；「Coach Isaac」的辨識度不夠獨特，「Isaac」不好記。
3. 個人名字不適合當多位教練共同的主品牌，也不利跨市場發展。

品牌名稱負責辨識與記憶；「教練會談／教練式對話／Coaching」負責說明服務，所以這些詞彙全部保留。

## 2. 改版前盤點（2026-11-25）

- 架構：Vue 3、Vite 7、vue-router 4（history）、vue-i18n 11；`npm run build` ＝ `vite build && node scripts/page-meta.js`；沒有 lint 或測試指令。
- 部署：push 到 `main` → GitHub Actions build，並把 `dist/index.html` 複製成 `404.html` → `gh-pages`。
- `page-meta.js`：只讀 zh-TW 語系，為每頁寫出獨立 HTML（title、description、og、twitter、canonical）與 `sitemap.xml`；文字含 `{ } @ |` 會讓 build 失敗；首頁刻意不加 canonical（會被複製成 404.html）。
- 品牌字樣出現在：`index.html`、三語 `site.*`、`NavBar.vue`、`App.vue` Footer、英文隱私權一句、README、`public/` 圖示與分享圖。
- 內容問題：未使用但留在語系裡的「腦科學」段落（未經證實的主張）；「心理諮商處理過去創傷 vs 教練聚焦未來」過度簡化；「生存模式」「前行式療癒」帶治療語氣；「最終實現你所渴望的成就」接近成果保證；保密寫成絕對、沒有 ICF 倫理守則 2.3 的法定例外；按鈕上有 ✨。

## 3. 研究摘要

標示方式：已確認事實／初步搜尋結果／待確認。完整表格見 `brand-guide.md` 第 14 節。

- Stepflect 完全同名：網路搜尋沒找到（初步）。近似的 Stepflex 已有美國商標（足部矯具、聯軸器）（已確認）。商標資料庫、網域、多數社群帳號：未查（待確認）。
- ICF：倫理守則 2025-04-01 生效；「ICF Certified」只能用在持有 ACC／PCC／MCC 的人，網站寫「ICF 認證培訓中」符合規範（已確認）。
- 搜尋：拿不到搜尋量，沒有使用任何搜尋量數字。可觀察到搜「教練式對話」多半是職場「教練式領導」、單搜「教練」多半是健身教練（初步），支持「品牌名＋服務詞彙」並列的 Title。

## 4. 確認關卡

| 關卡 | 內容 | 狀態 |
|---|---|---|
| Design Approval | Logo 03、配色 B、字標、亮暗策略、简中「进一程」、文案草稿、內容修正、Footer 聲明 | ✅ 2026-11-25 |
| 公開 | 新品牌名稱可以推上 `develop` | ✅ 2026-11-25 |
| Release Approval | 品牌所有者看過預覽後說 release | ⏳ |

## 5. 這次的改動

| 檔案 | 改動 |
|---|---|
| `src/style.css` | 新增 `--brand-logo-*`、`--brand-wordmark*` 變數（亮暗三個區塊同步）；網站配色不變 |
| `src/components/BrandLogo.vue` | 新增：03 圖形＋字標 |
| `src/components/NavBar.vue` | 文字 Logo 換成 BrandLogo，連結 `aria-label` 用 `site.brand` |
| `src/App.vue` | Footer 改成精簡版面（見下）；版權改成 `site.brand` |
| `src/views/HomeView.vue` | Hero 加副標 `home.hero_lede`；主按鈕用 `nav.book_intro_cta`；按鈕允許換行（英文長按鈕在手機放不下一行） |
| `src/locales/*.json`（三語） | 品牌與 Title、Hero 文案、按鈕去 ✨、新增 Footer 標語／聲明／緊急求助、刪除 `footer.contact_desc` 與腦科學段落、內容修正、隱私權更新日期 |
| `index.html` | Title、description、og、twitter（新增 `twitter:image:alt`）、分亮暗的 theme-color、WebSite JSON-LD；Search Console 驗證、Cloudflare beacon 不動 |
| `public/` | `favicon.svg`、`icon-square.svg`、`icon-192.png`、`apple-touch-icon.png`、`og-image.png` |
| `docs/` | `og-card.html`（分享圖來源）、`brand-guide.md`、`design-spec.md`、本文件 |
| `README.md` | 新品牌名，保留改名說明 |

**Footer 版面**：桌機一排四欄（品牌｜頁面連結｜聯絡｜預約按鈕），細線下方左邊是服務聲明與 1925（`tel:` 連結）、右邊是版權與隱私權；平板兩排；手機靠左、連結一行，不放預約按鈕（底部分頁列已有「預約」）。

**不改**：路由、`useTheme.js`、`i18n.js`、`router.js`、`coaches.js`（一般預約連結、三位教練的預填連結、Email、社群連結）、`scripts/page-meta.js`、`.github/`、網域與所有網址。

## 6. Metadata

首頁（`index.html`，zh-TW）：

| 欄位 | 值 |
|---|---|
| title | Stepflect 進一程｜一對一教練會談・教練式對話 |
| og:site_name | Stepflect 進一程 |
| og:title、twitter:title | Stepflect 進一程｜前進，不只有一種方式 |
| og:image | `og-image.png?v=20261125` |
| JSON-LD | WebSite：name「Stepflect」，alternateName「Stepflect 進一程」「進一程」 |

各頁 Title 由 `page-meta.js` 用 `site.page_title`「{page}｜Stepflect 進一程」產生，description 沿用各頁內容。結構化資料只有 WebSite；Service／Person 這次不加（待確認）。

## 7. 驗收條件

**AC**
1. 三種語言、亮暗模式、手機與桌機的 Header 都顯示 03 Logo；形狀一致、不換行、不擠壓按鈕。
2. 中文介面 Header 是「圖形＋Stepflect｜進一程」（簡中「进一程」）；英文是「圖形＋Stepflect」。
3. 首頁 Hero 顯示新主標、副標與「預約初次教練會談」；英文長按鈕在手機不超出畫面。
4. Footer 是精簡版面，比改版前矮；每頁都有服務聲明與 1925，手機點「1925」會撥號。
5. 一般預約按鈕與三位教練的預約按鈕，打開的表單與預填選項和改版前一致。
6. 分頁顯示新 favicon；加到 iPhone 主畫面看到新圖示；分享首頁看到新分享圖（社群平台快取更新後）。
7. 腦科學段落不在語系裡；教練與心理諮商區別、保密例外在三種語言都看得到。

**TAC**
1. `npm run build` 成功；`dist/` 各頁 head 的 title、description、og、twitter、canonical 正確。
2. `dist/index.html` 沒有 canonical；`sitemap.xml` 仍是 7 個網址；`robots.txt` 不變。
3. Search Console 驗證 meta、Cloudflare beacon、Inter 字體連結都在。
4. 沒有修改 `useTheme.js`、`i18n.js`、`router.js`、`coaches.js`、`page-meta.js`、`.github/`。
5. 三套語系 key 一致；英文的 `|` 有轉義。
6. 頁面上沒有「Coach Isaac」品牌字樣（教練名字、個人帳號、網址除外）。
7. console 沒有錯誤。

## 8. 部署限制

- 正式站 `https://coach-isaac.github.io/`，只從 `main` 部署；開發機不推 `main`／`gh-pages`。
- 不改網域、canonical／sitemap／OG／結構化資料的網址、Search Console Property。
- 若未來取得新網域，另外做 SEO Migration Plan（新舊網址對應、轉址、canonical、sitemap、Search Console、Custom Domain、舊品牌銜接）。

## 9. 待確認與外部事項

1. 商標、網域、社群帳號的正式查詢（品牌所有者或代理人）。
2. Google 表單標題是否改成新品牌（外部服務，手動）。
3. 結構化資料是否加 Service／Person。
4. 手動選了和系統相反主題的使用者，載入時會短暫看到系統主題（改版前就有）；是否在 `<head>` 加同步設定。
5. 另外兩位教練是否同意以 Stepflect 共同品牌呈現。

Logo 參考圖已放在 `docs/design-references/`（2026-11-25）。

## 10. 上線檢查清單

- [ ] 預覽檢查三語、亮暗、手機與桌機（首頁、教練團隊、一位教練、服務流程、隱私權）
- [ ] `dist/` 各頁 head、sitemap、robots、Search Console meta、Cloudflare beacon
- [ ] 一般與三位教練的預約連結
- [ ] favicon、主畫面圖示、分享圖
- [ ] 品牌所有者說 release
- [ ] 上線後檢查正式站首頁、一個教練頁、分享預覽
