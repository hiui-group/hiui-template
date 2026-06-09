# Host Adapter

- detected project type: greenfield
- detected framework: react-vite-router
- recommended mode: host-integration

## Summary

This target looks like a greenfield project. It can bring the current project shell and baseline smoke gallery together, but later generated pages should still default to business pages unless you explicitly mount them as examples.

## Recommended steps

1. Use `host-integration` when you need the current project shell and smoke pages together.
2. Treat newly generated pages as business pages by default; only add them to official examples or smoke/gallery routes when the task explicitly asks for that.
3. Keep host provider and page shells on the same package import path family.
4. Smoke-test one table page, one drawer page, and one full-page edit page before large-scale generation.
