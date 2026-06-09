# Typical Page Reuse Doctor Report

- target root: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro
- mode: host-integration
- project type: greenfield
- detected framework: react-vite-router
- recommended strategy: bring-shell
- recommended mode: host-integration
- host adapter snippet: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/HOST_ADAPTER_SNIPPET.md
- overall status: pass
- current-page delivery ready: yes
- manifest: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/.local-context/hiui-design/rules/common.page-types.json
- checks passed: 73
- checks failed: 0

## Checks
- [PASS] package.json exists
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/package.json
- [PASS] target project host profile is detected before choosing an integration strategy
  greenfield / react-vite-router / vite-react / react-router
- [PASS] the chosen install mode matches the detected target project type
  host-integration matches the detected target project profile. Target project looks like a greenfield React/Vite app. It is safe to bring the current project host shell, smoke gallery, and route examples together.
- [PASS] a framework-specific host adapter guide is available when needed
  No framework-specific adapter guide is required for the detected host profile
- [PASS] business pages do not use gradient backgrounds, borders, or highlight fills outside explicitly allowed illustration assets
  No disallowed gradient usage found in business page source.
- [PASS] business page styles avoid high-risk grid stretch patterns that commonly create large blank card gaps
  No high-risk multi-column grid or fill-row layout patterns found in page styles.
- [PASS] business page metric primary values only use the approved overview or embedded tokens, and the chosen token matches the metric surface
  No metric primary value token mismatch found in managed business page styles.
- [PASS] business pages do not keep embedded KPI groups on overview-sized tokens and fixed equal three-column grids at the same time
  No embedded KPI surface was found combining overview-sized metric values with a fixed equal three-column split.
- [PASS] business pages with bar or column charts keep plot content away from the card inner edges through chart-level safe-area config
  No bar/column chart plot-edge collisions detected in managed business page source.
- [PASS] custom ProDetailPage workspaces keep the first visible content away from the white-body top and side edges
  No ProDetailPage custom sections were found touching the white-body edges without an explicit inset owner.
- [PASS] detail-shell pages freeze vertical Descriptions label invariants in source instead of relying on hidden defaults
  All detected ProDetailPage/ProDetailDrawer detail pages explicitly freeze left label placement and avoid hidden fixed-width detail defaults.
- [PASS] business pages using ProDetailPage also keep the required ProDetailPageProvider or equivalent detail context chain
  All ProDetailPage business pages keep an explicit provider/context chain in source.
- [PASS] business pages using ProEditPage with Form/edit actions also keep the required ProEditPageProvider or equivalent edit context chain
  All ProEditPage business pages keep an explicit provider/context chain in source.
- [PASS] once the project provides shared interval-chart helpers, business pages must reuse them instead of scattering local plot-padding fixes
  All managed business pages with bar/column charts reuse the shared interval-chart helper baseline.
- [PASS] @hiui-design/typical-page-shells is declared
  Declared version/range: file:.local-context/hiui-design/vendor/hiui-design-typical-page-shells-0.1.1.tgz
- [PASS] typical-page managed dependencies match the verified snapshot instead of floating on loose experimental ranges
  package.json managed deps match the current snapshot
- [PASS] legacy @hi-ui/hiui/es root imports are inventoried before compatibility generation continues
  No current source file imports @hi-ui/hiui/es*
- [PASS] installed root runtime still matches the compatibility contract for legacy host projects
  No installed root-runtime drift or legacy ABI break was detected in node_modules.
- [PASS] @hiui-design/typical-page-shells appears to be installed
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/node_modules/@hiui-design/typical-page-shells/package.json
- [PASS] vendored typical-page-shells tarball keeps the HiUI5 QueryFilter contained/no-label defaults
  .local-context/hiui-design/vendor/hiui-design-typical-page-shells-0.1.1.tgz
- [PASS] installed typical-page-shells runtime keeps the HiUI5 QueryFilter contained/no-label defaults
  node_modules/@hiui-design/typical-page-shells/dist/pro-list-page/bridge/query-filter.js
- [PASS] app entry file can be detected
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/main.tsx
- [PASS] target project runtime is compatible with the standard hiui-design shell set or has been downgraded to compatibility generation only
  No legacy host-compatible runtime downgrade was detected
- [PASS] typical-page shell styles are imported once in the app entry
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/main.tsx
- [PASS] project source does not import typical-page shells through node_modules, .pnpm, or dist private paths
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src uses only package import paths
- [PASS] project source does not keep an outdated QueryFilter bridge that overrides HiUI5 defaults
  No copied bridge was found that forces QueryFilter field appearance or reintroduces the legacy defaults helper
- [PASS] public package QueryFilter is not forced back to showLabel={true} in list-page usage
  No list-page source forces public QueryFilter back to the old external-label layout
- [PASS] once project source uses typical-page shells, package.json also declares @hiui-design/typical-page-shells
  Shell package declared and used by: src/main.tsx; src/typical-page-reuse/components/layout/typical-page-host.tsx; src/typical-page-reuse/pages/basic-table.tsx; src/typical-page-reuse/pages/data-visualization.mock.ts; src/typical-page-reuse/pages/data-visualization.tsx; src/typical-page-reuse/pages/drawer-detail.tsx
- [PASS] once project source uses typical-page shells, styles.css is already imported in the app entry
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/main.tsx
- [PASS] host provider and page shells do not mix local host-adapter paths with package imports
  No mixed local-host-adapter and package shell import pattern was detected
- [PASS] TablePageFrame pages with title actions keep the typical-page header extra class rhythm
  No TablePageFrame page was found with an unclassified header action group
- [PASS] non-typical split pages keep explicit layout facts and governed split-shell reuse instead of hand-built split lookalikes
  No source-marked non-typical pages or implicit context-main-split candidates were found under src.
- [PASS] manifest marks required archetype smoke baselines for data-visualization, table-stat, full-page-edit, full-page-detail
  table-stat, data-visualization, full-page-edit, full-page-detail
- [PASS] required archetype smoke baselines have machine-readable screenshot specs
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/.local-context/hiui-design/docs/validation/archetype-smoke-baselines.json covers data-visualization, table-stat, full-page-edit, full-page-detail
- [PASS] synced typical-page core files exist
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse
- [PASS] all registered example pages exist in the target project
  10 example pages present
- [PASS] manifest provides primary smoke cases for table, chart, feedback, drawer, and full-page baseline checks
  table:数据统计表, chart:数据可视化, drawer:抽屉表单, feedback:异常反馈页, full-page:全页编辑
- [PASS] a route config file or app entry can be detected
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx
- [PASS] typical-page routes are mounted into the target project
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx
- [PASS] the top-level 示例 menu group keeps its own icon when mounting typical-page routes
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx
- [PASS] greenfield host-integration keeps a single app-level host owner instead of an outdated standalone preview shell
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx mounts TypicalPageAppFrame as the top-level host shell
- [PASS] TypicalPageAppFrame uses the same host-level 示例 route group as the page routing tree
  TypicalPageAppFrame routes uses a host-level 示例 gallery route, so synced typical-page categories remain second-level menu groups.
- [PASS] top-level business menu groups rendered by TypicalPageAppFrame keep explicit first-level icons
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx
- [PASS] typical-page route gallery does not wrap pages with a second example host when the target project already has a real host shell
  No existing host shell entry was detected, so standalone example wrapping remains optional
- [PASS] business routes/pages do not rebuild a second host shell when TypicalPageAppFrame already owns header/footer slots
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx is the single host shell owner and no business source outside /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse imports ExampleAppShell or rebuilds LayoutContentProvider + TypicalPageHostBridge.
- [PASS] host bridge assets exist
  Layout bridge, portal bridge, and app shell example are present
- [PASS] host-integration exports the shared dashboard frame helpers used by data-visualization start-page generation
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/components/managed-page/data-visualization-primitives.tsx, /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/components/managed-page/fixed-dashboard-page-frame.tsx
- [PASS] shared fixed-dashboard shell keeps the page root flush instead of reintroducing outer inset above the white-body workspace
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/components/managed-page/fixed-dashboard-page-frame.tsx keeps dashboardPageRoot padding at zero; outer gutter must stay on the true host/content-slot owner instead of a second page-root wrapper.
- [PASS] all non-relative imports used by synced typical-page files are declared in package.json
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse imports are covered by package.json declarations
- [PASS] raw SchemaForm pages that use CheckSelect also mount TypicalPageFieldMapProvider
  No raw SchemaForm + CheckSelect page is missing the typical-page field-map provider
- [PASS] synced typical-page assets and copied helper components do not contain legacy visual class names, variables, or demo copy
  No legacy visual residue such as `hi-v4-*`, `--hi-v4-*`, or old demo wording was found in the reusable page assets
- [PASS] app-frame keeps real host header/footer slots plus route-title fallback for typical-page portals
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/app-frame.tsx
- [PASS] app-frame header slot keeps PageHeader vertically centered inside the shared 60px host header area
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/app-frame.tsx
- [PASS] route gallery app frame keeps the content outlet in a flex/hidden container so typical pages can stretch to the bottom
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/app-frame.tsx
- [PASS] app-frame keeps the required viewport gutter contract for host content
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/app-frame.tsx
- [PASS] starter root styles lock browser-level scrolling to the host app shell instead of letting the whole document scroll
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/index.css
- [PASS] the synced app shell example still shows the required host bridge and height chain contract
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/app-shell.tsx
- [PASS] the synced app shell example keeps the default 16px viewport gutter around standalone content
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/app-shell.tsx
- [PASS] host header slot keeps PageHeader stretched to full width so header actions can stay right-aligned
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/app-shell.tsx, /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/components/layout/page-header-portal.tsx
- [PASS] full-page edit example keeps the required shell chain so the action area can stay bottom-docked
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/pages/full-page-edit.tsx
- [PASS] full-page edit example keeps the required ProEditPageProvider context chain around the edit shell
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/pages/full-page-edit.tsx
- [PASS] full-page edit example does not add extra root padding on formScrollBody
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/pages/full-page-edit.tsx
- [PASS] Vite compatibility shim for @hi-ui/schema-types exists
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/shims/schema-types-empty.js
- [PASS] Vite config aliases @hi-ui/schema-types to the synced empty shim
  /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/vite.config.ts
- [PASS] package.json exposes typical-page:designer-setup
  Registered script matches the packaged setup entry
- [PASS] package.json exposes typical-page:doctor
  Registered script matches the packaged doctor entry
- [PASS] package.json exposes typical-page:doctor:self-check for mixed-mode rules-only regression coverage
  Registered script matches the packaged doctor regression self-check entry
- [PASS] package.json exposes typical-page:maintainer:self-check for bundled maintainer regression coverage
  Registered script matches the packaged maintainer regression bundle entry
- [PASS] package.json exposes typical-page:write-contract as a maintenance-only contract writer
  Registered script matches the packaged maintenance writer entry
- [PASS] package.json exposes typical-page:finalize-page as the managed-page delivery gate
  Registered script matches the packaged delivery gate entry
- [PASS] package.json exposes typical-page:start-page for managed page scaffolding
  Registered script matches the packaged start-page entry
- [PASS] package.json exposes typical-page:preflight for implementation blocking checks
  Registered script matches the packaged preflight entry
- [PASS] package.json exposes typical-page:runtime-smoke for browser-level managed-page validation
  Registered script matches the packaged runtime-smoke entry

## Decision
- This project is ready to generate pages following the Figma typical-page rules.
