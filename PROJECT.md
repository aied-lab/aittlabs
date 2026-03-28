# AI TalenTech Labs 官網專案說明

## 品牌架構

```
AI TalenTech Labs（AI 人才科技實驗室）— attlabs.org
├── AI Products（AI 模擬教練產品線）
│   ├── AI Interviewer — AI 面試官
│   ├── iCoach360 — 高擬真情境模擬教練
│   └── PPTutor — 簡報提案模擬教練
├── AI TalenTech Institute（AI 人才科技研訓院）— aitti.online (Teachify)
│   └── 課程培訓、B2B/政府培訓業務
└── Consulting（顧問服務）
    ├── Systemaster — 系統思考大師
    └── FlowMaster — 流程大師
```

## 技術方案
- **框架**: Astro（靜態網站生成）
- **部署**: GitHub Pages（repo: aied-lab/aied-lab.github.io）
- **網域**: attlabs.org（Google Workspace DNS，加 A 記錄 + CNAME 指向 GitHub）
- **維護方式**: VS Code + Claude Code，改完 git push 即上線

## 網站架構（多頁式）
- `/` — 首頁：Hero + 產品精選 + 服務概覽 + 客戶案例 + 內容專欄 + CTA
- `/products/` — 產品總覽（AI Interviewer、iCoach360、PPTutor）
- `/institute/` — AI 人才科技研訓院，連結到 aitti.online
- `/consulting/` — 顧問服務（Systemaster、FlowMaster）+ 服務項目
- `/about/` — 創辦人廖肇弘博士介紹 + 公司使命願景 + 發展歷程
- `/contact/` — 聯絡表單 + 聯絡方式（表單後端方案待定）

## 導覽列
Home | Products | Institute | Consulting | About | Contact（聯絡我們）

## 設計方向
- **風格**: 深色科技感，參考 eightfold.ai 的大氣感
- **色調**: 深藍/藏青底色 + 科技藍主色 + 金色/琥珀色點綴
- **色調要與 aitti.online（研訓院 Teachify 課程平台）保持一致性**
- **字體**: Outfit（標題）、Noto Sans TC（內文）、JetBrains Mono（標籤）
- **需要改進**: 目前版本太素，需要更多視覺亮點、動態效果、圖片元素
- **首頁要有大面積創辦人形象照**（照片之後提供）

## 內容狀態
- 目前全部使用佔位假文，之後替換成正式文案
- 產品功能說明、個人簡介、客戶案例等待補充

## 創辦人資訊（About 頁面用）
- 廖肇弘博士 Dr. John Liao
- AI TalenTech Labs 創辦人
- AI 人才科技研訓院 院長
- 智園科技 首席 AI 科學家
- TAIGTO（Taiwan AI Government Talent Office）執行長
- 前工業技術研究院（ITRI）資深研究員
- 專長：AI 策略、企業轉型顧問、政府 AI 人才發展、系統思考

## 合作夥伴（已知）
- 行政院人事行政總處
- 環境部
- 勞動部
- 工業技術研究院
- 智園科技
- 亞洲水泥
- CIO Taiwan

## 外部連結
- 課程平台: https://aitti.online
- Substack: https://substack.com/@johnliontw
- YouTube: https://www.youtube.com/@johnliontw
- GitHub: https://github.com/aied-lab
- eToro: @johnliontw

## DNS 設定（Google Workspace → GitHub Pages）
1. Google Workspace DNS 加 4 筆 A 記錄：185.199.108.153 / .109 / .110 / .111
2. 加 1 筆 CNAME：www → aied-lab.github.io
3. GitHub repo Settings → Pages → Custom domain 填 attlabs.org → Enforce HTTPS

## 待辦
- [ ] 建立 GitHub repo: aied-lab.github.io
- [ ] 美化設計（加視覺亮點、動態效果、圖片）
- [ ] 放入創辦人形象照
- [ ] 替換假文為正式文案
- [ ] 決定表單後端方案（Google Form / Formspree / 其他）
- [ ] 設定 DNS 綁定 attlabs.org
- [ ] 各產品子頁面（/products/interviewer 等）
