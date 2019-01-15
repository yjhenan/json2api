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


## Windows 用户使用指南

1. 首先,装`ts-node`,和`typescript`

 ```
 npm install -g ts-node
 npm install -g typescript
 ```

2. 在`package.json`修改为这样:

```json
{
  "name": "json2api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "xxx": "rm -rf dist && rm api.json && curl http://xyj.dankal.cn/api/project/ofCPgAq8H.json?token=fef77296965e4d52ac347fcb70566919 -o api.json &&cross-env ts-node index.ts ./api.json",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^10.5.2"
  }
}
```

3. 通过使用使用`cross-env`, 来使windows兼容下面的命令,所以来装下`cross-env`

```
npm install --save-dev cross-env
```
