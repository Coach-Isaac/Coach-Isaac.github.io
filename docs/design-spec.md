# Stepflect｜進一程 視覺設計規格

> 2026-11-25 品牌所有者在 Brand Lab（私人審查頁，不在 repo 內）比較 8 款 Logo 與 8 套配色後選定以下設計。候選方案的比較留在第 9 節。

## 1. 最終設計決策

| 項目 | 決定 | 確認日期 |
|---|---|---|
| Logo 圖形 | 03「向前一格」，雙色（右上角實心格用強調色） | 2026-11-25 |
| 配色 | B Navy & Coral，也就是網站原本的配色，網站色彩不變 | 2026-11-25 |
| 字標 | Stepflect（首字大寫），Inter 700 ＋ 系統黑體 | 2026-11-25 |
| 版面 | 圖形＋Stepflect｜進一程 橫式；英文介面只放圖形＋Stepflect | 2026-11-25 |
| 亮暗策略 | 網站內主題自適應（inline SVG ＋ CSS 變數）；favicon、主畫面圖示、社群頭像、分享圖用深色徽章（固定色值） | 2026-11-25 |
| 簡中品牌名 | 进一程 | 2026-11-25 |

## 2. Logo：向前一格

3×3 方格。走過的格是實心，一格比一格高；最新的一步（右上角）用強調色。空心格是沒走、也不一定要走的位置：前進的方式不只一種，由客戶自己決定。

- 64×64 網格。實心格 15×15、圓角 3.5，位置 (5,44)、(24.5,24.5)、(44,5)。
- 空心格外框對齊實心格：完整版外框線寬 2.4、內縮 1.25；小尺寸版線寬 4、內縮 2（16px 時約 1px）。
- 實心與空心靠**填色與外框**區分，不只靠顏色，灰階與色覺差異下仍可辨識。
- 網站上所有尺寸（Header 28／34px、Footer 30px）都用完整版，形狀與比例一致。小尺寸版只用在 24px 以下的獨立圖示（`favicon.svg`）。

## 3. 色彩

### 3.1 網站 Logo（`src/style.css`，跟隨亮暗模式）

| 變數 | 亮色 | 暗色 | 用途 |
|---|---|---|---|
| `--brand-logo-primary` | `#1F3A5F` | `#8FB3E0` | 實心格（主色） |
| `--brand-logo-accent` | `#EB6B4A` | `#FF8C6E` | 最新一步（強調色） |
| `--brand-logo-muted` | `#7B8BA1` | `#597190` | 空心格（裝飾層，刻意調淡） |
| `--brand-wordmark` | `var(--text-main)` | 同左 | Stepflect |
| `--brand-wordmark-sub` | `var(--text-muted)` | 同左 | 進一程、分隔線 |

亮色的強調色不是網站按鈕的 `#FF7A59`：`#FF7A59` 在白底上只有約 2.5:1，Logo 用加深到 3:1 的 `#EB6B4A`（只降亮度、保留色相與彩度）。網站按鈕、文字的配色不變。

### 3.2 深色徽章（固定色值，用在單獨的檔案）

| 元素 | 色值 |
|---|---|
| 底色 | `#1F3A5F` |
| 實心格 | `#8FB3E0` |
| 強調格 | `#FF8C6E` |
| 空心格 | `#5D7DA6` |
| 字標（分享圖） | `#FFFFFF`，中文與副標 `#C7CED7`，分隔線 `#62758F` |

### 3.3 網站配色

沿用 `src/style.css` 原本的配色 B（亮色 `#1F3A5F`／`#FF7A59`／`#FAFBFC`／`#1A2230`，暗色 `#8FB3E0`／`#FF8C6E`／`#0F1722`／`#E6ECF4`），所有文字與按鈕對比在改版前已經達到 WCAG AA。

## 4. 字體

| 用途 | 字體 | 授權 |
|---|---|---|
| Stepflect | Inter 700（網站已從 Google Fonts 載入） | SIL Open Font License 1.1 |
| 進一程 | 系統黑體（PingFang、Noto Sans、微軟正黑體／雅黑） | 系統字體 |

沒有載入新的 Web Font。中文字標隨裝置字體顯示；若之後要做印刷或獨立的字標檔案，再把字標轉成 SVG 外框（Inter、Noto Sans 都是 OFL，可以合法轉外框）。

## 5. 元件：`src/components/BrandLogo.vue`

- 只包含選定的圖形；不打包其他候選方案。
- 大小由外層的 `--brand-size` 決定（預設 32px），手機和桌機只差尺寸。
- 中文名依語系：zh-TW「進一程」、zh-CN「进一程」、en 不顯示。
- SVG 一律 `aria-hidden`；當首頁連結時，連結的 `aria-label` 用 `site.brand`。
- 用在：`NavBar.vue`（手機 28px、桌機 34px）、`App.vue` Footer（30px）。

## 6. 亮暗模式

- 主題由既有的 `useTheme.js`、`data-theme` 與 `prefers-color-scheme` 決定；品牌只是在同一組變數裡加 `--brand-*`，三個區塊（`:root`、`@media (prefers-color-scheme: dark)`、`[data-theme="dark"]`）要保持一致。
- Logo 是 inline SVG，和頁面同時換色，不會比網站本身多閃一次。
- `favicon.svg`、PNG 圖示、分享圖讀不到頁面的 CSS 變數，所以寫入固定色值。

## 7. 最小尺寸、安全留白、禁止事項

- 單位 x＝圖形高度的 1/8。安全留白：四周至少 2x（圖形高度的 25%）；徽章以徽章外緣起算。
- 最小尺寸：只有圖形 16px；橫式（圖形＋字標）圖形高度至少 24px。
- 禁止：拉伸變形、旋轉、改變方格位置或數量、改線寬、加陰影或漸層、使用規範以外的顏色、放在對比不足的背景上、使用 ® 標示。

## 8. 品牌資產

| 檔案 | 說明 | 來源 |
|---|---|---|
| `public/favicon.svg` | 深色徽章、小尺寸版圖形 | 手寫 SVG |
| `public/icon-square.svg` | 滿版海軍藍、完整版圖形 | 手寫 SVG |
| `public/icon-192.png`、`public/apple-touch-icon.png`（180） | 由 `icon-square.svg` 轉出（`qlmanage` 512px → `sips` 縮小） | `icon-square.svg` |
| `public/og-image.png`（1200×630） | 固定深色品牌底；`index.html` 用 `?v=20261125` | `docs/og-card.html` 在 1200×630 截圖 |
| Header／Footer Logo | 主題自適應 inline SVG | `src/components/BrandLogo.vue` |

沒有 web manifest，所以沒有做 512px PNG 與 favicon.ico；需要時再從 `icon-square.svg` 轉出。

## 9. 候選方案紀錄（未採用）

Brand Lab 中比較過的圖形：01 多重路徑、02 反思與前進、03 向前一格（採用）、04 自主選擇、05 進一程、06 下一步（01–06 來自品牌所有者提供的參考圖），以及新提案 07 S 反思路徑、08 停下來想一想。配色候選：A Sage Green、B Navy & Coral（採用）、C Teal & Amber、D Graphite & Jade、E Indigo & Gold、F Forest & Terracotta、G Midnight & Aqua、H Monochrome。

審查時記錄的 03 注意事項：三格斜向排列可能被讀成「階梯上升」，接近「成長圖表」的聯想；靠空心格與「不一定要走滿」的品牌說明來平衡。
