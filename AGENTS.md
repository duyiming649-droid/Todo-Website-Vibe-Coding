# AGENTS.md - AI 开发指南

本文档面向 AI 助手，用于在开发过程中保持行为一致、遵循项目约定，并高效完成开发任务。开发时请优先参考本文档。

---

## 一、项目定位

- **项目类型**：待办事项管理应用（Todo App）
- **技术栈**：React + TypeScript + Vite + Zustand + Tailwind CSS + date-fns
- **存储**：LocalStorage（无后端）
- **目标**：功能完整、结构清晰、适合作为学习案例

---

## 二、数据模型（必须严格遵守）

### 2.1 Todo 接口

```typescript
interface Todo {
  id: string;              // 唯一标识，使用 crypto.randomUUID()
  title: string;           // 标题
  description: string;     // 描述，可为空字符串
  category: string;        // 分类
  priority: 'low' | 'medium' | 'high';  // 低、中、高
  dueDate: string | null;  // ISO 8601 日期字符串，可为 null
  completed: boolean;      // 是否完成
  createdAt: string;       // 创建时间，ISO 8601
}
```

### 2.2 筛选与搜索状态

```typescript
interface FilterState {
  category: string | null;      // null = 全部
  priority: 'low' | 'medium' | 'high' | null;
  status: 'all' | 'active' | 'completed';
  searchQuery: string;
}
```

---

## 三、目录结构约定

建议采用以下结构，便于理解和维护：

```
src/
├── components/       # UI 组件
│   ├── TodoForm.tsx      # 添加/编辑表单
│   ├── TodoList.tsx      # 待办列表
│   ├── TodoItem.tsx      # 单个待办项
│   ├── FilterBar.tsx     # 筛选栏
│   ├── SearchBar.tsx     # 搜索框
│   └── StatsPanel.tsx    # 统计面板
├── stores/           # Zustand stores
│   └── todoStore.ts
├── lib/              # 工具与存储
│   ├── storage.ts        # LocalStorage 封装
│   └── types.ts          # 类型定义
├── hooks/            # 自定义 Hooks（如有）
├── App.tsx
└── main.tsx
```

---

## 四、开发顺序（请按此顺序实现）

1. **数据存储层** `lib/storage.ts`  
   - 定义 LocalStorage key（如 `todos-app-data`）
   - `loadTodos(): Todo[]`
   - `saveTodos(todos: Todo[]): void`
   - 处理 JSON 解析错误，返回空数组

2. **类型定义** `lib/types.ts`  
   - 导出 `Todo`、`Priority`、`FilterState` 等类型

3. **状态管理** `stores/todoStore.ts`  
   - 使用 Zustand
   - State: `todos`, `filters`
   - Actions: `addTodo`, `updateTodo`, `deleteTodo`, `toggleComplete`, `setFilters`, `setSearchQuery`
   - 在 `addTodo`、`updateTodo`、`deleteTodo` 后调用 `saveTodos` 持久化

4. **添加功能**  
   - `TodoForm` 组件：标题、描述、分类、优先级、截止日期
   - 表单校验：标题必填
   - 提交后清空表单并关闭（若为弹窗）

5. **列表展示**  
   - `TodoList` 展示 todos，支持完成/未完成切换
   - `TodoItem` 展示单条，含编辑、删除按钮

6. **筛选**  
   - `FilterBar`：分类下拉、优先级下拉、状态（全部/未完成/已完成）
   - 筛选逻辑在 store 或组件内计算 `filteredTodos`

7. **搜索**  
   - 在 `searchQuery` 非空时，对 `title`、`description` 进行模糊匹配

8. **编辑与删除**  
   - 编辑：复用 `TodoForm`，传入初始值
   - 删除：确认后再调用 `deleteTodo`

9. **统计**  
   - 完成率：`completedCount / totalCount * 100`
   - 待办数量：`totalCount - completedCount`

---

## 五、编码规范

### 5.1 命名

- 组件：PascalCase（`TodoForm`, `TodoItem`）
- 函数/变量：camelCase（`addTodo`, `filteredTodos`）
- 常量：UPPER_SNAKE_CASE（`STORAGE_KEY`）
- 类型/接口：PascalCase（`Todo`, `FilterState`）

### 5.2 组件

- 使用函数组件 + Hooks
- Props 使用 TypeScript 接口定义
- 优先组合小组件，避免单文件过长

### 5.3 日期

- 统一使用 `date-fns`：`format`, `parseISO`, `isPast`, `isToday` 等
- 存储与传输使用 ISO 8601 字符串

### 5.4 样式

- 使用 Tailwind CSS 工具类
- 保持一致的间距（如 `p-4`, `gap-4`）、圆角（`rounded-lg`）、颜色体系

---

## 六、UI/UX 约定

### 6.1 设计原则

- **简洁**：界面清爽，避免多余装饰
- **易用**：表单有清晰 label，操作有反馈（如 toast 或状态变化）
- **一致性**：按钮、输入框、卡片风格统一

### 6.2 避免「AI 味」设计

- 不堆砌渐变、阴影、动画
- 不滥用 emoji 或通用图标
- 配色有主色和辅助色，不要彩虹色
- 字体选择有辨识度，可考虑如 Geist、JetBrains Mono 等

### 6.3 响应式

- 移动端：单列布局，触控友好
- 桌面端：适当增加最大宽度，避免过宽

---

## 七、测试检查清单

开发每个模块后，建议验证：

- [ ] 添加待办：标题必填，其他可选
- [ ] 编辑：修改后列表和 LocalStorage 同步更新
- [ ] 删除：删除后数据正确持久化
- [ ] 完成/未完成：切换后状态正确
- [ ] 筛选：分类、优先级、状态筛选结果正确
- [ ] 搜索：关键词匹配 title、description
- [ ] 统计：完成率、待办数量计算正确
- [ ] 刷新页面：数据不丢失

---

## 八、常见问题

**Q: 分类如何管理？**  
A: 可从 todos 中提取 `categories`，或维护一个固定的分类列表，初期可写死如 `['工作', '学习', '生活']`。

**Q: 日期选择器用什么？**  
A: 使用原生 `<input type="date">` 或 `react-day-picker`，优先简单实现。

**Q: 需要路由吗？**  
A: 单页应用无需路由，所有功能在一个页面内完成即可。

**Q: 如何处理 LocalStorage  quota 超限？**  
A: 可用 try-catch 包裹 `localStorage.setItem`，失败时提示用户并降级为内存存储。

---

## 九、参考文档

- 产品需求详见 `PRD.md`
- Zustand: https://github.com/pmndrs/zustand
- date-fns: https://date-fns.org/
- Tailwind CSS: https://tailwindcss.com/
