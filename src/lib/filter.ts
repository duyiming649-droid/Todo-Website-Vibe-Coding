/**
 * 筛选与搜索工具
 * - 多条件筛选：同时按分类、优先级、状态组合筛选（AND 逻辑）
 * - 模糊搜索：支持多关键词，每个关键词在标题或描述中匹配
 */

/** 待办项接口（与 App 中 Todo 兼容） */
interface TodoLike {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: string;
  completed: boolean;
}

/** 筛选条件 */
export interface FilterParams {
  searchQuery: string;
  categoryFilter: string;
  priorityFilter: string;
  statusFilter: '全部' | '未完成' | '已完成';
}

/**
 * 模糊搜索：将关键词按空格拆分，每个关键词需在标题或描述中出现
 * @param todo 待办项
 * @param query 搜索关键词，支持多个词用空格分隔
 */
function matchesFuzzySearch(todo: TodoLike, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const keywords = trimmed
    .split(/\s+/)
    .map(k => k.trim().toLowerCase())
    .filter(Boolean);

  if (keywords.length === 0) return true;

  const title = (todo.title ?? '').toLowerCase();
  const description = (todo.description ?? '').toLowerCase();
  const searchable = `${title} ${description}`;

  return keywords.every(keyword => searchable.includes(keyword));
}

/**
 * 多条件筛选待办列表
 * 条件之间为 AND 关系：搜索 && 分类 && 优先级 && 状态
 */
export function filterTodos<T extends TodoLike>(
  todos: T[],
  params: FilterParams
): T[] {
  const { searchQuery, categoryFilter, priorityFilter, statusFilter } = params;

  return todos.filter(todo => {
    const matchesSearch = matchesFuzzySearch(todo, searchQuery);
    const matchesCategory = categoryFilter === '全部' || todo.category === categoryFilter;
    const matchesPriority = priorityFilter === '全部' || todo.priority === priorityFilter;
    const matchesStatus =
      statusFilter === '全部' ||
      (statusFilter === '已完成' && todo.completed) ||
      (statusFilter === '未完成' && !todo.completed);

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });
}
