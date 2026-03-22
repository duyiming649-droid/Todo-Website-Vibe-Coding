import React, { useState, useMemo, useEffect } from 'react';
import { filterTodos } from '../lib/filter';
import { loadTodos, saveTodos } from '../lib/storage';
import { StatsPanel } from './components/StatsPanel';
import { AddTodoForm } from './components/AddTodoForm';
import { SearchAndFilter } from './components/SearchAndFilter';
import { TodoItem } from './components/TodoItem';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  category: '工作' | '学习' | '生活';
  priority: '低' | '中' | '高';
  deadline?: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  {
    id: '1',
    title: '完成 React 项目',
    category: '学习',
    priority: '高',
    deadline: '2025-03-25',
    completed: true,
  },
  {
    id: '2',
    title: '复习 TypeScript',
    description: '重点看泛型',
    category: '学习',
    priority: '中',
    deadline: '2025-03-28',
    completed: false,
  },
  {
    id: '3',
    title: '买 groceries',
    category: '生活',
    priority: '低',
    completed: false,
  },
  {
    id: '4',
    title: '准备周会 PPT',
    description: '整理本周工作进展',
    category: '工作',
    priority: '高',
    deadline: '2025-03-24',
    completed: false,
  },
  {
    id: '5',
    title: '健身',
    category: '生活',
    priority: '中',
    deadline: '2025-03-23',
    completed: false,
  },
  {
    id: '6',
    title: '阅读《深入理解计算机系统》',
    description: '第三章内容',
    category: '学习',
    priority: '中',
    completed: true,
  },
  {
    id: '7',
    title: '优化数据库查询',
    category: '工作',
    priority: '高',
    deadline: '2025-03-26',
    completed: false,
  },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = loadTodos();
    return stored.length > 0 ? (stored as Todo[]) : initialTodos;
  });

  // 数据变化时同步到 LocalStorage
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('全部');
  const [priorityFilter, setPriorityFilter] = useState<string>('全部');
  const [statusFilter, setStatusFilter] = useState<'全部' | '未完成' | '已完成'>('全部');
  const [editingId, setEditingId] = useState<string | null>(null);

  // 计算统计数据
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completionRate, pending };
  }, [todos]);

  // 多条件筛选 + 模糊搜索（关键词可在标题或描述中匹配，支持空格分隔多词）
  const filteredTodos = useMemo(() => {
    return filterTodos(todos, {
      searchQuery,
      categoryFilter,
      priorityFilter,
      statusFilter,
    });
  }, [todos, searchQuery, categoryFilter, priorityFilter, statusFilter]);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const todo: Todo = {
      ...newTodo,
      id: crypto.randomUUID(),
    };
    setTodos(prev => [...prev, todo]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, ...updates } : todo))
    );
    setEditingId(null);
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        {/* 顶部标题和统计 */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-6">我的待办</h1>
          <StatsPanel completionRate={stats.completionRate} pendingCount={stats.pending} />
        </div>

        {/* 添加表单 */}
        <div className="mb-8">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-6">
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* 待办列表 */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              {searchQuery || categoryFilter !== '全部' || priorityFilter !== '全部' || statusFilter !== '全部'
                ? '没有找到匹配的待办事项'
                : '还没有待办事项，添加一个开始吧！'}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                isEditing={editingId === todo.id}
                onStartEdit={() => setEditingId(todo.id)}
                onCancelEdit={() => setEditingId(null)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
