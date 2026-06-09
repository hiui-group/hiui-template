# Typical Page Reuse Bootstrap Summary

## Result
- project type: greenfield
- detected framework: react-vite
- runtime: vite-react
- routing: unknown
- recommended strategy: bring-shell
- recommended mode: host-integration
- mode: host-integration
- asset sync: completed
- package.json: updated
- i18n baseline: auto-synced
- project image pack: auto-synced
- style import: patched
- app entry router: patched
- starter root styles: patched
- route integration: mounted-in-app
- app frame integration: patched (starter app)
- vite schema-types alias: patched
- dependency install: installed
- added dependencies: @hiui-design/typical-page-shells, @hi-ui/classname, @hi-ui/ellipsis-tooltip, @hi-ui/empty-state, @hi-ui/hiui, @hi-ui/loading, @hi-ui/query-filter, @hi-ui/schema-core, @hi-ui/schema-fields, @hi-ui/schema-form, @hi-ui/schema-group, @hi-ui/schema-table, @hi-ui/textarea, @hi-ui/use-ref-state, @hi-ui/use-subscription, ahooks, @ant-design/charts, @hi-ui/avatar, @hi-ui/descriptions, @hi-ui/icons, @hi-ui/layout, @hi-ui/menu, @hi-ui/popover, @hi-ui/tree, react-router-dom, sass-embedded
- normalized dependencies: react (^19.2.6 -> ^18.3.1), react-dom (^19.2.6 -> ^18.3.1)
- added scripts: typical-page:apply, typical-page:apply:reference-assets, typical-page:apply:reference-assets:force, typical-page:apply:no-install, typical-page:apply:host-assets, typical-page:apply:host-assets:force, typical-page:apply:legacy, typical-page:doctor, typical-page:doctor:self-check, typical-page:maintainer:self-check, typical-page:doctor:gate, typical-page:contract-gate, typical-page:archetype-gate, typical-page:source-gate, typical-page:source-gate:self-check, typical-page:candidate-gate, typical-page:ci:gate, typical-page:preflight, typical-page:preview-ready, typical-page:runtime-smoke, typical-page:start-page, typical-page:write-contract, typical-page:finalize-page, typical-page:init-archetypes, typical-page:select-archetype, typical-page:i18n:init, typical-page:images:init, typical-page:designer-setup, typical-page:designer-setup:reference-assets, typical-page:designer-setup:reference-assets:force, typical-page:designer-setup:host-assets, typical-page:designer-setup:host-assets:force, typical-page:designer-setup:legacy
- generated translation entry: src/translation/messages.ts
- supported locales: zh-CN, zh-TW, en-US, id-ID, th-TH, de-DE, ar-SA
- image registry: src/typical-page-reuse/assets/project-product-images.ts
- image asset dir: src/typical-page-reuse/assets/product-catalog
- synced default image files: 16
- installed root runtime guard: pass
- host adapter snippet: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/HOST_ADAPTER_SNIPPET.md
- local reference pages: src/typical-page-reuse/pages/*
- manifest: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/.agents/skills/hiui-design/rules/common.page-types.json
- app entry file: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/main.tsx
- app entry file: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/main.tsx
- root style file: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/index.css
- route file: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx
- app file: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/App.tsx
- vite config: /Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/vite.config.ts
- install command: npm install

## Next steps
- Host profile: Target project looks like a greenfield React/Vite app. It is safe to bring the current project host shell, smoke gallery, and route examples together.
- Re-run the default reference-only installation later with `pnpm typical-page:apply`, `npm run typical-page:apply`, or the equivalent package-manager script command. It will auto-resolve to `rules-only` or `legacy-host-compatible` based on the host runtime.
- For non-technical designers, prefer `pnpm typical-page:designer-setup` or `npm run typical-page:designer-setup`; that entry now auto-runs doctor and stops on hard failures.
- The target project already received the default locale resources, formatter bridge, and RTL baseline during bootstrap. Re-run `pnpm typical-page:i18n:init` or `npm run typical-page:i18n:init` only when you want to resync locale files or refresh the wrapper template.
- The target project already received the default product image pack and registry baseline during bootstrap. Re-run `pnpm typical-page:images:init` or `npm run typical-page:images:init` only when you want to restore the baseline pack or seed a fresh project.
- If you used this advanced bootstrap/apply entry directly instead of `typical-page:designer-setup`, run `pnpm typical-page:doctor` or `npm run typical-page:doctor` before generating business pages.
- Review `/Users/zhouyun/Desktop/代码/HiUI/hiui5-pro/src/typical-page-reuse/SMOKE_REPORT.md` and open the listed smoke pages before generating business pages.
- If the synced smoke/gallery assets drift behind the source-of-truth examples, refresh them with `pnpm typical-page:apply:host-assets:force` or `npm run typical-page:apply:host-assets:force`.
- Copy the closest page from `src/typical-page-reuse/pages/` and replace business fields only.
- Verify the result against `src/typical-page-reuse/CHECKLIST.md` before merging.

