/**
 * LocalStorage 工具函数
 * 封装待办数据的读写，处理序列化与异常
 */

/** 可存储的待办项（最小结构，兼容多种 Todo 定义） */
export interface StorableTodo {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
  deadline?: string;
  completed: boolean;
}

const STORAGE_KEY = 'todos-app-data';

/**
 * 从 LocalStorage 加载待办列表
 * @returns 待办数组，解析失败或不存在时返回空数组
 */
export function loadTodos(): StorableTodo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    // 简单校验：确保每项有 id、title、completed
    return parsed.filter(
      (item): item is StorableTodo =>
        item != null &&
        typeof item === 'object' &&
        typeof (item as StorableTodo).id === 'string' &&
        typeof (item as StorableTodo).title === 'string' &&
        typeof (item as StorableTodo).completed === 'boolean'
    );
  } catch {
    return [];
  }
}

/** 保存所需的最小字段 */
type TodoLike = { id: string; title: string; completed: boolean };

/**
 * 将待办列表保存到 LocalStorage
 * @param todos 待办数组（需包含 id、title、completed）
 */
export function saveTodos<T extends TodoLike>(todos: T[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.warn('保存待办数据失败，可能是存储空间已满：', e);
  }
}
