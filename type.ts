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