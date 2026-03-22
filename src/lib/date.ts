/**
 * 日期处理工具（基于 date-fns）
 */

import { format, parseISO, isValid, isPast, isToday } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 格式化截止日期用于展示
 * @param dateStr ISO 日期字符串或 YYYY-MM-DD 格式
 * @returns 格式化后的字符串，如 "3月25日"
 */
export function formatDeadline(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    if (!isValid(date)) return dateStr;
    return format(date, 'M月d日', { locale: zhCN });
  } catch {
    return dateStr;
  }
}

/**
 * 是否已过期（截止日期在今天之前且未完成）
 */
export function isOverdue(dateStr: string): boolean {
  try {
    const date = parseISO(dateStr);
    return isValid(date) && isPast(date) && !isToday(date);
  } catch {
    return false;
  }
}

/**
 * 是否为今天
 */
export function isDueToday(dateStr: string): boolean {
  try {
    const date = parseISO(dateStr);
    return isValid(date) && isToday(date);
  } catch {
    return false;
  }
}
