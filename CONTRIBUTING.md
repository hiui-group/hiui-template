# 贡献指南

很高兴您有兴趣为 HiUI 做出贡献。

在提交您的贡献之前，请务必花点时间阅读以下指南：

## 分支管理

### 稳定分支

> 正式版本分支。其中 master-pro 为基于 V4 的最新稳定发布版本，master 为基于 v3 的最新稳定发布版本。

- master-pro
- master

## Bug & feature

> 我们使用 [Github issues](https://github.com/hiui-group/hiui-template/issues) 来追踪 bug 和 feature。

## Pull Request

> HiUI 团队会认真对待每一个 PR，我们会 CR 您的代码，然后再决定合并。期间也有可能会同您进行一些代码上的探讨和优化。

要提交一个 PR，请遵循以下步骤：

1. Fork 并克隆 HiUI 仓库

```bash
git clone https://github.com/<github-username>/hiui-template.git
cd hiui-template
```

2. 新建开发分支

```bash
git checkout -b <BRANCH_NAME>
```

> 分支名建议是 hotfix/#<IssueId> 或者 feature/#<IssueId>

## 开发流程

> 安装环境前确保本地有 `npm` 依赖的 NodeJS 环境，并且 Node 版本建议是 14.x。

- 安装依赖

```sh
npm install
```

- 开始开发

```sh
npm start
```

- 本地打包

```sh
npm run build
```

最终打包后的静态资源会输出到 `./dist` 目录之下。


- 发布 Github Pages

> 也就是将打包生成的 `./dist` 下的静态资源发布到 github-pages: https://hiui-group.github.io/hiui-template/

```sh
npm run deploy
```

执行完成后，可以在 [https://github.com/hiui-group/hiui-template/tree/gh-pages](https://github.com/hiui-group/hiui-template/tree/gh-pages) 下确认 Github Pages 静态资源是否更新。具体机制可以参考 gh-pages。
