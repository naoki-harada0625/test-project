import { PRIORITY_CONFIG, getTagStyle } from '../data/initialData'

function isOverdue(dueDate) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date(new Date().toDateString())
}

function formatDate(dueDate) {
  if (!dueDate) return null
  const d = new Date(dueDate)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function TaskCard({
  task,
  isDragging,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
}) {
  const priority  = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium
  const overdue   = isOverdue(task.dueDate)
  const dateLabel = formatDate(task.dueDate)

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', task.id)
    onDragStart(task.id)
  }

  return (
    <div
      className={`task-card${isDragging ? ' dragging' : ''}`}
      draggable
      style={{ borderLeftColor: priority.color }}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="task-card-header">
        <span className="task-title">{task.title}</span>
        <div className="task-actions">
          <button
            className="task-action-btn"
            onClick={(e) => { e.stopPropagation(); onEdit() }}
            title="編集"
          >
            ✏️
          </button>
          <button
            className="task-action-btn"
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            title="削除"
          >
            🗑️
          </button>
        </div>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map(tag => {
            const style = getTagStyle(tag)
            return (
              <span
                key={tag}
                className="tag-chip"
                style={{ background: style.bg, color: style.text }}
              >
                {tag}
              </span>
            )
          })}
        </div>
      )}

      <div className="task-meta">
        <span className="task-priority">
          {priority.icon} {priority.label}
        </span>

        {task.assignee && (
          <span className="task-assignee" title={task.assignee}>
            👤 {task.assignee}
          </span>
        )}

        {dateLabel && (
          <span className={`task-due${overdue ? ' overdue' : ''}`}>
            📅 {dateLabel}
            {overdue && ' ⚠'}
          </span>
        )}
      </div>
    </div>
  )
}
