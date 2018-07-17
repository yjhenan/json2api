//#region 备注
/**
 * 名称：小幺鸡2api
 * 时间：2018年07月12日14:53:15
 * 作者：赵艳杰
 */
//#endregion
import * as fs from 'fs';
import { promises as pFs } from 'fs';
import * as pathLib from 'path';



const dir = process.argv[2];
console.log(process.argv);


if (!dir) {
    new Error("没有json文件！");
}
let rootDir = pathLib.dirname(dir) + '/dist';

function ProjectInfo(params: IProject) {
    return `
# ${params.name}\n
## ${params.details}`
}

function json2api(params: IChild) {
    let header = ''; // 前缀
    let type = 'data';
    let url = params.url.replace(/\$/g, '/');
    // 使用 URL 去掉开头
    let methodName = url.split('/').splice(2).map(item => {
        // 首字母大写
        return item.substring(0, 1).toUpperCase() + item.substring(1);
    }).join('');
    // 额外处理全链接
    if (url.search('http') != -1) {
        let str = url.split('/');
        methodName = str[str.length - 1].substring(0, 1).toUpperCase() + str[str.length - 1].substring(1);
    }
    // 去除 Uuid
    if (methodName.search('{') != -1) {
        methodName = methodName.replace(/\{[\s\S]{0,}\}/g, '')
        // console.log(methodName, 33333333);
    }

    // 处理 URL 内的 Uuid
    url = url.replace(/\{[\s\S]{0,}\}/g, (match) => {
        match = match.split('{')[1].split('}')[0].split("/")[1];
        return `\${data.${match}}`;
    })
    switch (params.requestMethod) {
        case 'GET':
            header = 'get'
            type = 'params';
            break;
        case 'POST':
            header = 'add'
            break;
        case 'PUT':
            header = 'set'
            break;
        case 'DELETE':
            header = 'del'
            break;

        default:
            break;
    }

    // console.log(methodName, 11111111);

    return `
// ${params.name}
const ${header}${methodName} = data => {
  return HttpRequest({
    url: \`${url}\`,
    method: "${params.requestMethod}",
    ${type}:data
  });
};
    `;

}

(async function main() {
    try {
        let file = await pFs.readFile(dir).catch(err => {
            console.log(err);
        }) as Buffer;
        // 拿到json数据
        let jsonData: Ixyj = JSON.parse(file.toString());

        // 如果目录不存在，新建之
        if (!fs.existsSync(rootDir)) {
            // await pFs.rmdir(rootDir);
            // 然后再新建
            await pFs.mkdir(rootDir);
        }
        await pFs.writeFile(rootDir + '/说明.md', ProjectInfo(jsonData.data.project));
        // 创建二级目录
        for (const item of jsonData.data.modules) {
            let modulesPath = pathLib.join(rootDir, item.name);
            if (!fs.existsSync(modulesPath)) {
                await pFs.mkdir(modulesPath)
            }
            // 创建文件
            for (const folders of item.folders) {
                let folderPath = pathLib.join(modulesPath, folders.name + '.js');
                await pFs.writeFile(folderPath, `//${folders.name}\nimport HttpRequest from "../jslib/dk-axios";\n`)
                for (const itemMethod of folders.children) {
                    await pFs.appendFile(folderPath, json2api(itemMethod));
                }
            }
        }
    } catch (error) {
        console.log(error);
    }

})()

interface Ixyj {
    code: number;
    data: IData;
}

interface IData {
    project: IProject;
    modules: IModule[];
}

interface IModule {
    createTime: string;
    folders: IFolder[];
    id: string;
    lastUpdateTime: string;
    name: string;
    projectId: string;
    requestArgs?: string;
    requestHeaders?: string;
}

interface IFolder {
    children: IChild[];
    createTime: string;
    id: string;
    moduleId: string;
    name: string;
    projectId: string;
    sort: number;
}

interface IChild {
    contentType: string;
    createTime: string;
    dataType: string;
    example?: string;
    folderId: string;
    id: string;
    lastUpdateTime: string;
    moduleId: string;
    name: string;
    projectId: string;
    protocol: string;
    requestArgs: string;
    requestHeaders: string;
    requestMethod: string;
    responseArgs: string;
    sort: number;
    status: string;
    url: string;
    description?: string;
}

interface IProject {
    createTime: string;
    description: string;
    details: string;
    editable: string;
    environments: string;
    id: string;
    name: string;
    permission: string;
    status: string;
    userId: string;
}