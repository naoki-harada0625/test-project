import { useState, useEffect, useRef } from 'react'
import { COLUMNS, PRIORITY_CONFIG, getTagStyle } from '../data/initialData'

const EMPTY_TASK = {
  title:    '',
  status:   'new',
  priority: 'medium',
  dueDate:  '',
  assignee: '',
  tags:     [],
}

export default function TaskModal({ mode, task, defaultStatus, onSave, onClose }) {
  const [form, setForm]       = useState(EMPTY_TASK)
  const [tagInput, setTagInput] = useState('')
  const tagInputRef = useRef(null)

  useEffect(() => {
    if (mode === 'edit' && task) {
      setForm({ ...task })
    } else {
      setForm({ ...EMPTY_TASK, status: defaultStatus })
    }
    setTagInput('')
  }, [mode, task, defaultStatus])

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = tagInput.trim()
      if (val && !form.tags.includes(val)) {
        set('tags', [...form.tags, val])
      }
      setTagInput('')
    }
    if (e.key === 'Backspace' && tagInput === '' && form.tags.length > 0) {
      set('tags', form.tags.slice(0, -1))
    }
  }

  const removeTag = (tag) => {
    set('tags', form.tags.filter(t => t !== tag))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave({ ...form, title: form.title.trim() })
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true">
        <h2 className="modal-title">
          {mode === 'create' ? '📝 新規タスク作成' : '✏️ タスクを編集'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* タイトル */}
          <div className="form-group">
            <label className="form-label" htmlFor="modal-title">タイトル <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              id="modal-title"
              className="form-input"
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="タスクのタイトルを入力"
              autoFocus
              required
            />
          </div>

          {/* ステータス */}
          <div className="form-group">
            <label className="form-label" htmlFor="modal-status">ステータス</label>
            <select
              id="modal-status"
              className="form-select"
              value={form.status}
              onChange={e => set('status', e.target.value)}
            >
              {COLUMNS.map(col => (
                <option key={col.id} value={col.id}>
                  {col.icon} {col.title}
                </option>
              ))}
            </select>
          </div>

          {/* 優先度 */}
          <div className="form-group">
            <label className="form-label" htmlFor="modal-priority">優先度</label>
            <select
              id="modal-priority"
              className="form-select"
              value={form.priority}
              onChange={e => set('priority', e.target.value)}
            >
              {Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => (
                <option key={key} value={key}>
                  {cfg.icon} {cfg.label}
                </option>
              ))}
            </select>
          </div>

          {/* 期限日 */}
          <div className="form-group">
            <label className="form-label" htmlFor="modal-due">期限日</label>
            <input
              id="modal-due"
              className="form-input"
              type="date"
              value={form.dueDate}
              onChange={e => set('dueDate', e.target.value)}
            />
          </div>

          {/* 担当者 */}
          <div className="form-group">
            <label className="form-label" htmlFor="modal-assignee">担当者</label>
            <input
              id="modal-assignee"
              className="form-input"
              type="text"
              value={form.assignee}
              onChange={e => set('assignee', e.target.value)}
              placeholder="担当者名"
            />
          </div>

          {/* タグ */}
          <div className="form-group">
            <label className="form-label">タグ</label>
            <div
              className="tag-input-area"
              onClick={() => tagInputRef.current?.focus()}
            >
              {form.tags.map(tag => {
                const style = getTagStyle(tag)
                return (
                  <span
                    key={tag}
                    className="tag-chip-removable"
                    style={{ background: style.bg, color: style.text }}
                    onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
                    title="クリックで削除"
                  >
                    {tag}
                    <i className="tag-remove-icon">×</i>
                  </span>
                )
              })}
              <input
                ref={tagInputRef}
                className="tag-text-input"
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={form.tags.length === 0 ? 'タグを入力...' : ''}
              />
            </div>
            <p className="tag-hint">Enter で追加・タグをクリックで削除</p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              キャンセル
            </button>
            <button type="submit" className="btn-save">
              {mode === 'create' ? '作成する' : '保存する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
