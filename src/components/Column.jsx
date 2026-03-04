import TaskCard from './TaskCard'

export default function Column({
  column,
  tasks,
  isDragOver,
  draggedId,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragEnd,
}) {
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    onDragEnter(column.id)
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      onDragLeave(column.id)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    onDrop(column.id)
  }

  return (
    <div
      className={`column${isDragOver ? ' drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <span className="col-icon">{column.icon}</span>
        <span
          className="col-dot"
          style={{ background: column.color }}
        />
        <span className="col-title">{column.title}</span>
        <span
          className="col-count"
          style={{ background: column.color }}
        >
          {tasks.length}
        </span>
      </div>

      <div className="column-cards">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            isDragging={draggedId === task.id}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>

      <button
        className="col-add-btn"
        onClick={() => onAddTask(column.id)}
      >
        ＋ タスク追加
      </button>
    </div>
  )
}
