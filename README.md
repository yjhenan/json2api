# JSON2API

> API 生成脚本，只需手动从 API 文档扒取 `api.json`，通过此脚本可以生成需要的 `api.js`格式，并以模块分文件。

## 用法
```
ts-node index.ts ./api.json
```
## 依赖
> typescript ts-node

## 注意
1. node版本 >= 10.x
2. 目前只支持`小幺鸡`
3. 可能会有一些重名方法，需要手动更改
4. 模块是以中文命名

## 预览
![截图](/img/深度截图_code_20180717194308.png)
