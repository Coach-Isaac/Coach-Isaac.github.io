# Plan: 全站改版 第一階段（設計系統＋導覽＋頁尾＋首頁）

分支：develop
日期：2026-11-23
狀態：草稿（等使用者同意後開工）
配色試看：https://claude.ai/artifact/XUivHMW99gnNb68GsebSwP （使用者選 A 深海藍＋珊瑚）

## 需求摘要（使用者已確認）

1. 整體更吸引人、更現代，手機瀏覽體驗特別優化；電腦版與手機版一致。
2. 配色 A：深海藍 `#1F3A5F` 主色＋珊瑚 `#FF7A59` 行動按鈕，深色模式一併調整。
3. 中文標題用 Noto Serif TC／SC（Google Fonts，不加 npm 套件）。
4. 手機：底部固定分頁列「首頁／教練團隊／服務流程／預約」，預約開 Google 表單；
   頂部細欄只放 Logo＋語言按鈕（點開 EN／繁／简）＋深色模式按鈕。
5. 電腦：頂部選單，項目與手機分頁列相同。
6. 首頁手機版「固定預約條」拿掉，由分頁列的「預約」取代。
7. 首頁新增三位教練小卡（電腦版在主視覺右側、手機版在信任標籤下方），點了進個人頁；
   內容用現有教練資料（名字、頭銜、專長標籤）。
8. 分兩階段，第二階段（教練列表、三個個人頁、服務頁的排版）做完後兩階段一起 release。

## 範圍

- 這次要做： `src/style.css`、`index.html`（字體）、`src/App.vue`（頁尾、html lang）、
  `src/components/NavBar.vue`、新元件 `src/components/BottomTabBar.vue`、`src/components/ScrollToTop.vue`
  （避開分頁列）、`src/views/HomeView.vue`、三個 `src/locales/*.json`（新增／修改的字串）。
- 第二階段才做： CoachesIndexView、CoachIsaac/Pauline/VincentView、ServicesView、CoachTabNav 的排版。
  這些頁面在第一階段會自動套到新顏色與新字體（共用 token），排版不動。
- 不做： 教練照片、favicon、SEO、新增路由、改寫既有文案內容。

## 需求對應

| 需求 | 實作步驟 | 驗收條件 |
|---|---|---|
| 2 配色 A＋深色 | Step 1 | AC-1, AC-2 |
| 3 中文襯線標題 | Step 2 | AC-3 |
| 4 手機頂欄＋底部分頁列 | Step 3, 4 | AC-4, AC-5, AC-6 |
| 5 電腦頂部選單 | Step 3 | AC-7 |
| 1 頁尾一致 | Step 5 | AC-8 |
| 1, 7 首頁改版＋教練卡 | Step 6 | AC-9, AC-10 |
| 6 拿掉固定預約條 | Step 6 | AC-11 |
| 三語 | Step 7 | AC-12 |

## 技術做法

- **沿用現有 token 名稱**（`--color-primary`、`--color-secondary`、`--bg-color`、`--bg-card`、`--text-main`、
  `--text-muted`、`--border-color`、`--hero-gradient`…），只換值，第二階段頁面不改程式也會換色。
  新增 `--color-surface`（卡片底）、`--color-soft`（淡藍底）、`--accent-ink`（珊瑚按鈕上的字色）、
  `--accent-text`（珊瑚當文字色時的可讀版本）、`--tabbar-h`（分頁列高度）。
- 深色 token 只寫兩份（`prefers-color-scheme` 且非 light、`[data-theme="dark"]`），拿掉多餘的
  `[data-theme="light"]` 區塊（bare `:root` 就是淺色值）。
- 把舊主題殘留的 Vue 綠／藍綠陰影換成 token。
- 移除 Vite 範本殘留的 `body { display:flex; place-items:center }`，`#app` 不再限寬 1280px，
  讓頂欄與頁尾滿版；`#app` 的 `text-align:center` 保留（第二階段頁面依賴它，屆時再處理）。
- 字體：`index.html` 改載 Inter（400–700）＋ Noto Serif TC／SC（600、700），拿掉 Cormorant；
  `--font-heading` 預設 Noto Serif TC，`:lang(zh-CN)` 時用 Noto Serif SC。
  App.vue 依目前語言設定 `<html lang>`（en／zh-TW／zh-CN）。
- 斷點統一：手機 `< 768px` 用分頁列；`≥ 768px` 頂部完整選單；首頁主視覺雙欄 `≥ 960px`。
- 分頁列：`position: fixed; bottom: 0`，加 `env(safe-area-inset-bottom)`；`main` 和頁尾在手機加
  `padding-bottom` 讓內容不被蓋住；TOP 按鈕在手機上移到分頁列上方。
  「教練團隊」在 `/coaches` 與 `/coaches/*` 都顯示為選中。「預約」是外部連結（新分頁）。
- 首頁教練卡資料在 HomeView 裡寫一個小陣列（名字、頭銜、標籤 key、路由），沿用既有 i18n key，
  不抽共用模組（避免擴大範圍）。

## 實作步驟

1. `src/style.css`：A 配色 light／dark token、新 token、清掉殘留樣式、通用 `.btn` 不加（各元件 scoped）。
2. `index.html`：換 Google Fonts 連結；`App.vue`：watch locale 設 `<html lang>`。
3. `NavBar.vue`：sticky 頂欄。≥768px：Logo｜首頁 教練團隊 服務流程｜語言分段鈕＋深色鈕（SVG 圖示）＋珊瑚預約鈕。
   <768px：Logo＋語言鈕（顯示目前語言，點開三選一小選單，點外面或選完關閉）＋深色鈕，按鈕觸控區 ≥ 44px。
4. 新 `BottomTabBar.vue`（只在 <768px 顯示）並在 App.vue 掛上；調整 ScrollToTop 位置。
5. 頁尾（App.vue）：Logo＋一句介紹、三個頁面連結、珊瑚預約鈕、`© {今年} Coach Isaac`＋「網站持續更新中」。
6. `HomeView.vue`：主視覺（深海藍漸層、手機置中滿版按鈕／電腦左文右教練卡）、信任標籤改膠囊樣式、
   手機版「認識教練」區塊、見證卡、什麼是教練區塊換新樣式；刪除固定預約條與 `has-mobile-bar` 相關程式。
7. 三語 locale：見下方「文字改動」。

## 文字改動（三語）

| key | en | zh-TW | zh-CN |
|---|---|---|---|
| `nav.home`（改） | Home | 首頁 | 首页 |
| `nav.book`（新） | Book | 預約 | 预约 |
| `nav.language`（新，按鈕無障礙標籤） | Language | 語言 | 语言 |
| `nav.theme_dark`／`nav.theme_light`（新） | Dark mode／Light mode | 深色模式／淺色模式 | 深色模式／浅色模式 |
| `home.coaches_title`（新） | Meet the coaches | 認識教練 | 认识教练 |
| `home.coaches_subtitle`（新） | Three coaches, each with their own focus | 三位教練，各有專長 | 三位教练，各有专长 |
| `footer.tagline`（新） | ICF coaches in training · bilingual EN/ZH | ICF 認證培訓中的教練團隊 · 中英雙語 | ICF 认证培训中的教练团队 · 中英双语 |

頁尾年份由寫死的 2025 改成自動顯示今年。

## 驗收條件

- **AC-1** 全站主色深海藍、預約按鈕珊瑚色；畫面上不再出現舊的綠色／陶土橘（第二階段頁面也是新顏色）。
- **AC-2** 深色模式（系統設定或手動切換）所有新元件文字可讀，切換後重新整理仍保留選擇。
- **AC-3** 繁中、簡中標題顯示為襯線字體（Noto Serif TC／SC），英文標題也一致。
- **AC-4** 手機寬度（375、390px）：頂欄一排不換行，只有 Logo、語言鈕、深色鈕；捲動時頂欄固定在上方。
- **AC-5** 手機寬度：底部分頁列固定顯示四項；目前頁面那一項高亮；「預約」珊瑚色、開新分頁到 Google 表單；
  iPhone 底部安全區不被遮住；頁面最後的內容與頁尾不被分頁列蓋住；TOP 按鈕在分頁列上方。
- **AC-6** 手機語言鈕點開可選 EN／繁／简，選完立即切換並關閉；點選單外面也會關閉。
- **AC-7** 768px 以上：沒有底部分頁列；頂部選單一排顯示同樣四個項目（首頁、教練團隊、服務流程、預約按鈕）＋語言＋深色鈕；
  768px（平板）不擠、不換行。
- **AC-8** 頁尾在每一頁都相同：Logo、介紹、連結、預約鈕、今年年份。
- **AC-9** 首頁主視覺：手機上標題、副標、兩個按鈕（預約、了解什麼是教練）在第一個畫面內，按鈕滿版好按；
  電腦上左文右三張教練卡。
- **AC-10** 三張教練卡顯示名字、頭銜、兩個專長標籤，點擊進到對應個人頁；手機版在「認識教練」區塊，電腦版在主視覺右側。
- **AC-11** 首頁不再有舊的手機固定預約條。
- **AC-12** EN／繁／简 三種語言下，所有新文字都有翻譯，沒有顯示 key 名稱。
- **TAC-1** 不新增 npm 套件；`npm run build` 成功；瀏覽器 console 無錯誤。
- **TAC-2** 375／768／1280px 三種寬度沒有水平捲動。
- **TAC-3** 只用 `<script setup>`、`<style scoped>`（分頁列與 token 例外放全域 style.css）、JS、無 TypeScript。

## 測試方式

`npm run build` 後在 http://127.0.0.1:4173/ 用 browse 工具：首頁、/coaches、/services 各截 responsive
（mobile／tablet／desktop），淺色＋深色各一輪，三種語言各看一次首頁，console 無錯誤。
