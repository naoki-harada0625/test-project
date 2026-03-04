import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Board from './components/Board'
import TaskModal from './components/TaskModal'
import { INITIAL_TASKS } from './data/initialData'

const STORAGE_KEY = 'kanban-tasks-v1'

let _idCounter = Date.now()
const generateId = () => `task-${(++_idCounter).toString(36)}`

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : INITIAL_TASKS
    } catch {
      return INITIAL_TASKS
    }
  })

  const [modal, setModal] = useState({
    open: false,
    mode: 'create',
    task: null,
    defaultStatus: 'new',
  })

  const [draggedId, setDraggedId] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const openCreate = useCallback((status = 'new') => {
    setModal({ open: true, mode: 'create', task: null, defaultStatus: status })
  }, [])

  const openEdit = useCallback((task) => {
    setModal({ open: true, mode: 'edit', task, defaultStatus: task.status })
  }, [])

  const closeModal = useCallback(() => {
    setModal(m => ({ ...m, open: false }))
  }, [])

  const handleSave = useCallback((data) => {
    if (modal.mode === 'create') {
      setTasks(prev => [...prev, { ...data, id: generateId() }])
    } else {
      setTasks(prev => prev.map(t => t.id === data.id ? data : t))
    }
    closeModal()
  }, [modal.mode, closeModal])

  const handleDelete = useCallback((id) => {
    if (window.confirm('このタスクを削除しますか？')) {
      setTasks(prev => prev.filter(t => t.id !== id))
    }
  }, [])

  const handleReset = useCallback(() => {
    if (window.confirm('初期データにリセットしますか？現在のデータは失われます。')) {
      setTasks(INITIAL_TASKS)
    }
  }, [])

  const handleDragStart = useCallback((id) => setDraggedId(id), [])

  const handleDragEnter = useCallback((colId) => setDragOverCol(colId), [])

  const handleDragLeave = useCallback((colId) => {
    setDragOverCol(prev => prev === colId ? null : prev)
  }, [])

  const handleDrop = useCallback((colId) => {
    if (draggedId) {
      setTasks(prev => prev.map(t => t.id === draggedId ? { ...t, status: colId } : t))
    }
    setDraggedId(null)
    setDragOverCol(null)
  }, [draggedId])

  const handleDragEnd = useCallback(() => {
    setDraggedId(null)
    setDragOverCol(null)
  }, [])

  const totalCount      = tasks.length
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length
  const doneCount       = tasks.filter(t => t.status === 'done').length

  return (
    <div className="app">
      <Header
        totalCount={totalCount}
        inProgressCount={inProgressCount}
        doneCount={doneCount}
        onReset={handleReset}
        onAddTask={() => openCreate('new')}
      />
      <Board
        tasks={tasks}
        draggedId={draggedId}
        dragOverCol={dragOverCol}
        onAddTask={openCreate}
        onEditTask={openEdit}
        onDeleteTask={handleDelete}
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      />
      {modal.open && (
        <TaskModal
          mode={modal.mode}
          task={modal.task}
          defaultStatus={modal.defaultStatus}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default App
