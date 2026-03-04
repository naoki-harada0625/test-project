export default function Header({ totalCount, inProgressCount, doneCount, onReset, onAddTask }) {
  return (
    <header className="header">
      <div className="header-title">
        <span>📋</span>
        <span>タスクボード</span>
      </div>

      <div className="header-stats">
        <span className="stat-badge total">
          📁 全件 <strong>{totalCount}</strong>
        </span>
        <span className="stat-badge in-progress">
          🔧 処理中 <strong>{inProgressCount}</strong>
        </span>
        <span className="stat-badge done">
          ✅ 完了 <strong>{doneCount}</strong>
        </span>
      </div>

      <div className="header-actions">
        <button className="btn-reset" onClick={onReset} title="初期データにリセット">
          🔄 リセット
        </button>
        <button className="btn-add-task" onClick={onAddTask}>
          ＋ タスク追加
        </button>
      </div>
    </header>
  )
}
