import { COLUMNS } from '../data/initialData'
import Column from './Column'

export default function Board({
  tasks,
  draggedId,
  dragOverCol,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragEnd,
}) {
  return (
    <main className="board">
      {COLUMNS.map(col => {
        const colTasks = tasks.filter(t => t.status === col.id)
        return (
          <Column
            key={col.id}
            column={col}
            tasks={colTasks}
            isDragOver={dragOverCol === col.id}
            draggedId={draggedId}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
          />
        )
      })}
    </main>
  )
}
