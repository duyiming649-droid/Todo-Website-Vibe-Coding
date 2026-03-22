import { useState, useEffect } from 'react';
import { formatDeadline, isOverdue } from '../../lib/date';
import type { Todo } from '../App';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
}

export function TodoItem({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: TodoItemProps) {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || '');

  // 编辑时同步最新 todo 数据到表单
  useEffect(() => {
    if (isEditing) {
      setEditTitle(todo.title);
      setEditDescription(todo.description || '');
      setEditCategory(todo.category);
      setEditPriority(todo.priority);
      setEditDeadline(todo.deadline || '');
    }
  }, [todo, isEditing]);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      category: editCategory,
      priority: editPriority,
      deadline: editDeadline || undefined,
    });
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    setEditDeadline(todo.deadline || '');
    onCancelEdit();
  };

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case '高':
        return 'bg-red-50 text-red-700 border-red-200';
      case '中':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case '低':
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl p-6 border border-blue-300 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">标题</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">描述</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">分类</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as Todo['category'])}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="工作">工作</option>
                <option value="学习">学习</option>
                <option value="生活">生活</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">优先级</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Todo['priority'])}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="低">低</option>
                <option value="中">中</option>
                <option value="高">高</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">截止日期</label>
              <input
                type="date"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!editTitle.trim()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-all ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-4">
        {/* 勾选框 */}
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="mt-1 flex-shrink-0"
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? 'bg-blue-600 border-blue-600'
              : 'border-slate-300 hover:border-blue-400'
          }`}>
            {todo.completed && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </button>

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold text-slate-900 mb-1 ${
            todo.completed ? 'line-through' : ''
          }`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className="text-slate-600 text-sm mb-3">{todo.description}</p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            {/* 分类标签 */}
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {todo.category}
            </span>

            {/* 优先级标签 */}
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${getPriorityColor(todo.priority)}`}>
              优先级：{todo.priority}
            </span>

            {/* 截止日期（使用 date-fns 格式化，过期显示红色） */}
            {todo.deadline && (
              <span
                className={`inline-flex items-center gap-1 text-xs ${
                  !todo.completed && isOverdue(todo.deadline)
                    ? 'text-red-600 font-medium'
                    : 'text-slate-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDeadline(todo.deadline)}</span>
              </span>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onStartEdit}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="编辑"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => {
              if (window.confirm('确定要删除该待办事项吗？')) {
                onDelete(todo.id);
              }
            }}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="删除"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
