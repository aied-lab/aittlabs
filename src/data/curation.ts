// 學習策展（Curation）資料檔
// 每期策展對應一個 HTML 檔（放在 public/curation/ 下），在這裡新增一筆 metadata 即可上架。
//
// 新增流程：
// 1. 把當期 HTML 檔放到 public/curation/<file>.html
// 2. 在 issues 陣列最前面新增一筆，slug 用網址友善字串（kebab-case）
// 3. file 填寫 HTML 檔名（含 .html）
//
// 注意：本系統「不會」依 date 自動產生「X月號」之類的期號標籤；
// 如果你想要任何期數/系列標示，請自己填 label 欄位（自由文字）。

export type CurationIssue = {
  slug: string;          // 對應網址 /curation/<slug>/
  file: string;          // public/curation/ 下的 HTML 檔名
  title: string;         // 策展主題
  subtitle?: string;     // 副標（可選）
  summary: string;       // 卡片摘要
  date: string;          // YYYY-MM-DD（僅用於排序與顯示發佈日，不會自動轉成期號）
  label?: string;        // 自訂期數／系列標示（自由文字，例如 "Vol. 01"、"AI Agent 系列 #1"），留空則不顯示
  topics: string[];      // 主題標籤
  episodeCount?: number; // 收錄影片數量
  duration?: string;     // 累計時長
  cover?: string;        // 封面圖（可選，留空則用漸層底圖）
  gated?: boolean;       // 是否需要密碼
};

export const curationIssues: CurationIssue[] = [
  {
    slug: '2026-05-ai-agent-workplace',
    file: 'aitt_2026_05_ai_agent_workplace.html',
    title: 'AI Agent 帶來的職場革命與創新',
    subtitle: 'Andrew Ng × 李宏毅 × Mollick × Nadella × Aravind',
    summary:
      '從 Andrew Ng 的 Agentic Workflow 框架、李宏毅的 Agent 原理、Mollick 的組織衝擊、Nadella 的實作決策，到 Aravind 對未來職能的預判 — 五位 AI 思想領袖經典演講策展，幫你建立完整的 AI Agent 全景認知。',
    date: '2026-05-01',
    topics: ['AI Agent', 'Agentic Workflow', '組織轉型', '未來職能'],
    episodeCount: 5,
    duration: '約 220 分鐘',
    gated: true,
  },
];

export function getIssueBySlug(slug: string): CurationIssue | undefined {
  return curationIssues.find((i) => i.slug === slug);
}

export function getSortedIssues(): CurationIssue[] {
  return [...curationIssues].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
