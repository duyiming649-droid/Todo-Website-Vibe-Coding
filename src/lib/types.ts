/**
 * Todo 数据模型
 * 遵循 PRD / AGENTS 规范
 */

/** 优先级：low=低, medium=中, high=高 */
export type Priority = 'low' | 'medium' | 'high';

/** 待办事项 */
export interface Todo {
  /** 唯一标识 */
  id: string;
  /** 标题，必填 */
  title: string;
  /** 描述，选填 */
  description?: string;
  /** 分类，如 "工作"、"学习"、"生活" */
  category: string;
  /** 优先级 */
  priority: Priority;
  /** 截止日期，ISO 8601 格式，可选 */
  dueDate: string | null;
  /** 是否已完成 */
  completed: boolean;
  /** 创建时间，ISO 8601 格式 */
  createdAt: string;
}

/** 筛选与搜索状态 */
export interface FilterState {
  /** null 表示全部 */
  category: string | null;
  /** null 表示全部 */
  priority: Priority | null;
  /** 全部 / 未完成 / 已完成 */
  status: 'all' | 'active' | 'completed';
  /** 搜索关键词 */
  searchQuery: string;
}

/** 优先级显示映射 */
export const PRIORITY_LABELS: Record<Priority, string> = {
  low: '低',
  medium: '中',
  high: '高',
};
