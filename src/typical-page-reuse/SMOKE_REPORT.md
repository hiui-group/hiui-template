# Typical Page Reuse Smoke Report

- target root: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro
- doctor status before smoke: pass

## Purpose

- This report lists the minimum typical-page examples that should be opened before generating business pages.
- The goal is not to verify every route. The goal is to verify that the target project can still render the core shells close to the Figma typical-page baseline.

## Recommended smoke sequence

1. Run `pnpm typical-page:doctor` or `npm run typical-page:doctor` first.
2. Start the target project dev server.
3. Open the primary smoke pages below through the route gallery that mounts `src/typical-page-reuse/routes/config.tsx`.
4. If multiple smoke pages fail at the same time, stop business-page generation and fix host integration or style loading first.

- Screenshot baseline spec: `/Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/.local-context/hiui-design/docs/validation/archetype-smoke-baselines.json`

## Primary smoke pages

| Group | Page | Relative route suggestion | Example file |
| --- | --- | --- | --- |
| table | 数据统计表 | `table/common/table-stat` | `src/typical-page-reuse/pages/table-stat.tsx` |
| chart | 数据可视化 | `chart/common/data-visualization` | `src/typical-page-reuse/pages/data-visualization.tsx` |
| drawer | 抽屉表单 | `form/typical/drawer` | `src/typical-page-reuse/pages/drawer-form.tsx` |
| feedback | 异常反馈页 | `feedback/empty-state` | `src/typical-page-reuse/pages/empty-state.tsx` |
| full-page | 全页编辑 | `form/typical/edit` | `src/typical-page-reuse/pages/full-page-edit.tsx` |

## Required archetype baselines

| Page | Page type | Relative route suggestion | Example file | Suggested viewport | Screenshot key |
| --- | --- | --- | --- | --- | --- |
| 数据统计表 | `table-stat` | `table/common/table-stat` | `examples/host-integration/src/pages/table-stat.tsx` | `1440x1024` | `table-stat-core` |
| 数据可视化 | `data-visualization` | `chart/common/data-visualization` | `examples/host-integration/src/pages/data-visualization.tsx` | `1440x1200` | `data-visualization-core` |
| 全页编辑 | `full-page-edit` | `form/typical/edit` | `examples/host-integration/src/pages/full-page-edit.tsx` | `1440x1024` | `full-page-edit-core` |
| 全页详情 | `full-page-detail` | `detail/typical/page` | `examples/host-integration/src/pages/full-page-detail.tsx` | `1440x1024` | `full-page-detail-core` |

## Visual pass criteria

### 数据统计表
- 页头、白底主区、筛选区、表格、分页节奏连续
- 数据统计表时指标卡仍是白卡描边，不是裸文本
- 表格高度可以收口，不出现整页双滚动

### 数据可视化
- 页头、指标卡、多图表区和明细表仍在同一白底工作区
- 图表主题、颜色和坐标轴没有回退成库默认样式
- 图表区与明细表之间没有双滚动和额外主白卡层

### 抽屉表单
- 抽屉标题、body、footer 节奏正常
- footer 顶线和阴影没有回退成默认样式
- 抽屉内容没有多余卡片和异常行距

### 异常反馈页
- 页头、白底反馈面板和居中反馈内容关系正常
- 反馈图示资源正常加载，不回退成破图或纯文本占位
- 主次操作仍收口在反馈面板内，不误用表格或表单壳

### 全页编辑
- PageHeader 正确挂到宿主 header 区，不在内容区重复渲染
- 主白底、滚动区、底栏关系正常
- 不要退化成宿主灰底上的单张白卡页面

## Required archetype baseline criteria

### 数据统计表
- 指标卡必须是真实白卡区，不退化成 tabs、摘要文本或普通标题计数。
- 筛选区必须保持 QueryFilter 语义，不能退回手写 Input/Select/DatePicker flex 行。
- 分页必须留在同一个白底主体内部，不能掉到宿主灰底外。
- example file: `examples/host-integration/src/pages/table-stat.tsx`
- relative route suggestion: `table/common/table-stat`
- suggested viewport: `1440x1024`
- screenshot key: `table-stat-core`

### 数据可视化
- 页头、指标卡、多图表区和明细表仍在同一白底工作区
- 图表主题、颜色和坐标轴没有回退成库默认样式
- 图表区与明细表之间没有双滚动和额外主白卡层
- example file: `examples/host-integration/src/pages/data-visualization.tsx`
- relative route suggestion: `chart/common/data-visualization`
- suggested viewport: `1440x1200`
- screenshot key: `data-visualization-core`

### 全页编辑
- 页头、单一白底工作区、表单滚动区、底部操作区必须是同一个全页编辑壳层。
- 不要退化成宿主灰底上的单张白卡 + 自由 footer。
- 字段栅格、返回链路和 footer 吸底关系要先在这个基线页上锁定，再生成业务编辑页。
- example file: `examples/host-integration/src/pages/full-page-edit.tsx`
- relative route suggestion: `form/typical/edit`
- suggested viewport: `1440x1024`
- screenshot key: `full-page-edit-core`

### 全页详情
- 页头必须保持 60px 垂直居中，标题维持 18px / 600，不能漂到内容区里或出现额外 header 间距。
- 详情字段必须保持 Descriptions 的 vertical + 3 columns；detail-shell 需显式冻结 `labelPlacement: 'left'`，SchemaDescriptionsBridge 还要清空隐藏 `labelWidth`，不要再靠默认值碰巧成立。
- 分组详情必须仍在单一白底主体内，不拆成多层白卡或独立摘要卡。
- example file: `examples/host-integration/src/pages/full-page-detail.tsx`
- relative route suggestion: `detail/typical/page`
- suggested viewport: `1440x1024`
- screenshot key: `full-page-detail-core`

## Stop rules

- If the table smoke page fails, first suspect style resources or the host height chain.
- If the drawer smoke page fails, first suspect default Drawer styles overriding the packaged shell styles.
- If the full-page smoke page fails, first suspect host header/footer portals or page-shell mounting order.
- If any required archetype baseline page is visually off, do not continue generating the same page type in business pages.
- If two or more primary smoke pages fail together, do not continue generating business pages.
