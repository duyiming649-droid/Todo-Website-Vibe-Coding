# 待办事项应用 (Todo App)

一款轻量级待办事项管理应用，使用 React + TypeScript + Vite 构建，适合作为大一计算机学生的全栈学习项目。

---

## 项目特点

- **功能完整**：添加、编辑、删除、筛选、搜索、统计一应俱全
- **技术现代**：React 18、TypeScript、Vite、Zustand、Tailwind CSS
- **数据持久**：使用 LocalStorage 存储，刷新页面不丢失
- **学习友好**：按模块循序渐进，每个文件职责清晰

---

## 功能清单

| 功能 | 说明 |
|------|------|
| 添加待办 | 设置标题、描述、分类、优先级、截止日期 |
| 编辑待办 | 修改已有待办事项 |
| 删除待办 | 删除指定待办事项 |
| 完成切换 | 标记任务为完成/未完成 |
| 筛选 | 按分类、优先级、状态（全部/未完成/已完成）筛选 |
| 搜索 | 在标题和描述中快速搜索 |
| 统计 | 显示完成率、待办数量 |
| 持久化 | 数据保存在 LocalStorage，刷新不丢失 |

---

## 技术栈

| 技术 | 用途 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Vite | 构建与开发服务器 |
| Zustand | 状态管理（比 Redux 简单） |
| Tailwind CSS | 样式 |
| date-fns | 日期处理 |
| LocalStorage | 本地数据存储 |

---

## 项目结构

| 路径 | 说明 |
|------|------|
| `PRD.md` | 产品需求文档 |
| `AGENTS.md` | AI 开发指南 |
| `FIGMA_PROMPT.md` | Figma UI 设计 Prompt |
| `todo app design/` | Figma Make 导出的 UI 设计代码包，可预览 Figma 设计效果 |

---

## 项目文档

| 文档 | 说明 |
|------|------|
| [PRD.md](./PRD.md) | 产品需求文档，定义功能、数据模型、开发顺序 |
| [AGENTS.md](./AGENTS.md) | AI 开发指南，供 AI 助手按规范开发 |

---

## 数据模型（核心字段）

每条待办事项包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识 |
| title | string | 标题 |
| description | string | 描述 |
| category | string | 分类 |
| priority | 'low' \| 'medium' \| 'high' | 优先级：低、中、高 |
| dueDate | string \| null | 截止日期 |
| completed | boolean | 是否完成 |
| createdAt | string | 创建时间 |

---

## 开发顺序建议

1. **数据存储层**：封装 LocalStorage 读写
2. **状态管理**：用 Zustand 创建 store
3. **添加功能**：实现添加待办表单
4. **列表展示**：展示待办列表及完成切换
5. **筛选功能**：实现分类、优先级、状态筛选
6. **编辑与删除**：实现编辑弹窗与删除
7. **搜索功能**：实现关键词搜索
8. **统计功能**：完成率、待办数量展示

每完成一个模块就测试一下，确保正常后再进入下一步。

---

## 快速开始

### 主项目（按 PRD 开发）

```bash
npm install
npm run dev
npm run build
```

### 预览 Figma 设计效果

`todo app design/` 为 Figma Make 导出的设计代码包，原始设计见 [Figma 文件](https://www.figma.com/design/9kc224NCgk9etQxgUjNtzt/Todo-app-design-request)。

```bash
cd "todo app design"
npm i
npm run dev
```

---

## 学习提示（给大一同学）

- **每一步在做什么**：每个模块都有明确职责，例如 `storage.ts` 只负责读写 LocalStorage
- **每个文件的角色**：`PRD.md` 是需求，`AGENTS.md` 是开发规范，`stores/` 是状态，`components/` 是界面
- **为什么这样拆分**：先搞定数据与状态，再叠加界面和交互，问题更容易定位
- **调试技巧**：在浏览器开发者工具的 Application → Local Storage 中查看保存的数据
