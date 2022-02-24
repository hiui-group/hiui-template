module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能（feature）
        'fix', // 修补 bug
        'refactor', // 更新某功能，代码重构（不是 feat, 不是 fix）
        'style', // 格式化（不影响代码运行, 注意不是修改 css）
        'docs', // 文档（documentation）
        'chore', // 非源代码修改, 如修改项目构建系统(例如 gulp，webpack，rollup，Travis，Jenkins，GitLab CI，Circle 等的配置等)及依赖包升级的提交
        'test', // 测试用例修改
        'revert', // 回滚
        'perf' // 性能优化
      ]
    ],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never']
  }
}
