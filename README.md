# dms-client

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## 开发

```sh
# install dependencies
$ yarn

# serve in dev mode, with hot reload at localhost:4200
$ yarn dev

# build for production
$ yarn build
```

open http://dms.local:8081

## 规范

### 分支命名

[项目类型]_[创建人]

1.项目类型：表示该分支做所得事情的类型

- feature 功能
- hotfix 小改动或修复 bug

2.项目名称：根据实际项目命名，其中 hotfix 类型可以使用当前日期作为名称。

3.创建人：创建项目分支的人标识。

举个例子：假定此处创建分支的人叫张三

* feature_zs
* hotfix_20171027_zs 17年10月27号打补丁

### js规范

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

项目使用[standardjs](https://standardjs.com/readme-zhcn.html)规范，**提交文件时候会自动检测js文件，如果有问题则需要修复后才可以提交**😂

### 对外API命名

组件**对外暴露API**使用驼峰命名

### Commit message

项目使用Angular的git commit规范，每次提交，Commit message 都包括三个部分：Header，Body 和 Footer

```html
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
Header是必需的，Body和Footer可以省略

message type关键字

```sh
'build',      //构建
'chore',      //构建过程或辅助工具的变动
'docs',       //文档（documentation）
'feat',       //新功能（feature）
'fix',        //修补bug
'perf',
'refactor',   //重构（即不是新增功能，也不是修改bug的代码变动）
'revert',     //回滚
'style',      //格式（不影响代码运行的变动）
'test',       //增加测试
```

具体关于Angular的git commit规范可以参考

* [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)

* [Git commint规范](http://wiki.n.miui.com/pages/viewpage.action?pageId=62384814)
