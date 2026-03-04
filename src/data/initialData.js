export const COLUMNS = [
  { id: 'new',         title: '新規案件',       icon: '📥', color: '#6366f1' },
  { id: 'hold',        title: '保留',           icon: '⏸️', color: '#f59e0b' },
  { id: 'pending',     title: '開始前・作業中断', icon: '⏳', color: '#8b5cf6' },
  { id: 'in-progress', title: '処理中',          icon: '🔧', color: '#10b981' },
  { id: 'done',        title: '完了済',          icon: '✅', color: '#06b6d4' },
]

export const TAG_COLORS = {
  'TS開発':   { bg: '#fee2e2', text: '#dc2626' },
  '商品改善': { bg: '#fef3c7', text: '#d97706' },
  '開発':     { bg: '#dbeafe', text: '#2563eb' },
  '基盤構築': { bg: '#d1fae5', text: '#059669' },
  'TS調査':   { bg: '#ede9fe', text: '#7c3aed' },
}

export const getTagStyle = (tag) => TAG_COLORS[tag] || { bg: '#f3f4f6', text: '#6b7280' }

export const PRIORITY_CONFIG = {
  high:   { label: '高', icon: '🔴', color: '#ef4444' },
  medium: { label: '中', icon: '🟡', color: '#f59e0b' },
  low:    { label: '低', icon: '🟢', color: '#22c55e' },
}

export const INITIAL_TASKS = [
  // 新規案件
  {
    id: 'init-01',
    title: '追加発注一覧 不具合修正',
    status: 'new',
    priority: 'high',
    dueDate: '',
    assignee: '',
    tags: ['TS開発'],
  },
  {
    id: 'init-02',
    title: 'コールセンター再構築',
    status: 'new',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    tags: ['基盤構築'],
  },
  {
    id: 'init-03',
    title: '組合員照会改修 コース集品表示追加',
    status: 'new',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    tags: ['開発'],
  },
  // 保留
  {
    id: 'init-04',
    title: '【商品詳細設定】リスト取込機能追加',
    status: 'hold',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    tags: ['商品改善', '開発'],
  },
  {
    id: 'init-05',
    title: '【データ連携】FAX→WEB化',
    status: 'hold',
    priority: 'low',
    dueDate: '2026-05-01',
    assignee: '',
    tags: ['商品改善', '開発'],
  },
  // 開始前・作業中断
  {
    id: 'init-06',
    title: '【商品統計】企画連絡',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    tags: ['商品改善'],
  },
  {
    id: 'init-07',
    title: '【データ連携】トレスエクセル出力',
    status: 'pending',
    priority: 'low',
    dueDate: '',
    assignee: '',
    tags: ['商品改善', '開発'],
  },
  // 処理中
  {
    id: 'init-08',
    title: 'ぷらす便管理 供給平均 計算値調査',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-02-27',
    assignee: '',
    tags: ['TS調査', '開発'],
  },
  {
    id: 'init-09',
    title: 'ルーター購入',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-03-31',
    assignee: '',
    tags: ['基盤構築'],
  },
  // 完了済
  {
    id: 'init-10',
    title: '事業計画取込',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-02-27',
    assignee: '',
    tags: ['TS開発', '開発'],
  },
  {
    id: 'init-11',
    title: '個別手数料訂正 単価をマイナス不可',
    status: 'done',
    priority: 'high',
    dueDate: '2026-02-27',
    assignee: '',
    tags: ['TS開発'],
  },
]
