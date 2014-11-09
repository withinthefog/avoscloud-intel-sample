去掉了所有依赖, 只安装了intel这一个package

在本地环境测试没有问题, 部署到avoscloud上会出现异常:
```js
deployByCommand err: Error: 加载代码出错: TypeError: Object function dbug(name) {
  return dbugger(name);
} has no method 'split'
```

基本上确定是第三方包兼容性的问题