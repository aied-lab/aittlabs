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
  cover?: string;        // 自訂封面圖網址（最高優先；填了就用這張）
  videoIds?: string[];   // YouTube 影片 ID 陣列：1 支→單張縮圖；2 支以上→ 2×2 拼貼（最多取前 4 支）
  gated?: boolean;       // 是否需要密碼
};

export const curationIssues: CurationIssue[] = [
  {
    slug: '2026-05-agentic-ai',
    file: 'aitt_2026_05_agentic_ai.html',
    title: 'Agentic AI 發展趨勢與應用案例',
    subtitle: '李宏毅 × Andrew Ng × McKinsey × a16z',
    summary:
      '從李宏毅拆解 Agent 三大支柱(Memory、Tool Use、Planning),到 Andrew Ng 的 Agentic Workflow 框架、McKinsey 的企業導入觀點、3 個打造可靠企業級 Agent 的關鍵要素,以及 a16z 對 2026 的趨勢預判 — 一次掌握 Agentic AI 從原理、框架、企業實作到未來展望的完整路徑。',
    date: '2026-05-05',
    topics: ['Agentic AI', 'AI Agent', '企業導入', '趨勢預判'],
    episodeCount: 5,
    videoIds: [
      'M2Yg1kwPpts', // 李宏毅 — 一堂課搞懂 AI Agent 的原理
      'sal78ACtGTc', // Andrew Ng — What's next for AI agentic workflows
      'DsRNp3cmJm0', // McKinsey — Agentic AI Explained
      'kTnfJszFxCg', // 3 ingredients for building reliable enterprise agents
      'ULszsXDyjMY', // a16z — How AI Agents Will Transform in 2026
    ],
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
