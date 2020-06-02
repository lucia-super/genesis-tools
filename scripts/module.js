var _ = require('lodash');
var fs = require('fs');

const Constants = {
    storeFolder: "store",
    viewFolder: "view",
    routerFolder: "router"
}

function checkAndCreateFolder(folderPath) {
    const isExist = fs.existsSync(folderPath);
    if (!isExist) {
        fs.mkdirSync(folderPath);
    }
}

function writeStore(current_dirname, element_folder, element) {
    const templateStore = fs.readFileSync(current_dirname + "/template/store.js", 'utf8')
    if (templateStore) {
        const store_folder = element_folder + "/" + Constants.storeFolder;
        checkAndCreateFolder(store_folder);
        const targetFile = store_folder + "/index.js";

        const { apis } = element;
        let preHandledData = templateStore
        _.forOwn(apis, (value, key) => {
            preHandledData = preHandledData.replace(new RegExp("@MODULE_PLACEHOLDER_" + key.toLocaleUpperCase(), "gm"), value);
        })

        const isFileExist = fs.existsSync(targetFile);
        if (!isFileExist || (isFileExist && element.update)) {
            fs.writeFileSync(targetFile, preHandledData);
        }

    } else {
        throw (new Error("读取store template异常, 请联系作者"))
    }
}

function writeScreenBase(current_dirname, element_folder, element, screenName) {
    const templateView = fs.readFileSync(current_dirname + "/template/" + screenName, 'utf8')
    if (templateView) {
        const view_folder = element_folder + "/" + Constants.viewFolder;
        checkAndCreateFolder(view_folder);
        const targetFile = view_folder + "/" + screenName;

        const preHandledData = templateView.replace("@MODULE_PLACEHOLDER", element.name);

        const isFileExist = fs.existsSync(targetFile);
        if (!isFileExist || (isFileExist && element.update)) {
            fs.writeFileSync(targetFile, preHandledData);
        }
    } else {
        //失败就抛出异常，具体代码操作按实际需求来写
        console.error('读取Screen异常')
    }
}

function writeScreenConfig(config, element_folder, element) {
    const router_folder = element_folder + "/" + Constants.routerFolder;
    checkAndCreateFolder(router_folder);
    const targetFile = router_folder + "/index.js";
    const isFileExist = fs.existsSync(targetFile);

    const preHandledData = `import ${element.name} from "@/${config.moduleFolder}/${element.name}/${Constants.viewFolder}/list.vue";
                            import ${element.name}Detail from "@/${config.moduleFolder}/${element.name}/${Constants.viewFolder}/detail.vue";
                            import ${element.name}Edit from "@/${config.moduleFolder}/${element.name}/${Constants.viewFolder}/edit.vue";
                            export default [
                                { path: '/${element.name}', name: '${element.name}',  component: ${element.name} },
                                { path: '/${element.name}/detail', name: '${element.name}Detail', component: ${element.name}Detail },
                                { path: '/${element.name}/Edit', name: '${element.name}Edit', component: ${element.name}Edit }
                            ]`
    if (!isFileExist || (isFileExist && element.update)) {
        fs.writeFileSync(targetFile, preHandledData);
    }
}

function writeConfig(config, modules, module_folder) {
    const targetStoreFile = module_folder + "/store.js";
    const targetRouterFile = module_folder + "/router.js";
    const isStoreFileExist = fs.existsSync(targetStoreFile);
    const isRouterFileExist = fs.existsSync(targetRouterFile);

    let preStoreData = "";
    let preRouterData = "";
    _.forEach(modules, (name) => {
        preStoreData += `import ${name} from "@/${config.moduleFolder}/${name}/${Constants.storeFolder}/index.js";`
        preRouterData += `import ${name} from "@/${config.moduleFolder}/${name}/${Constants.routerFolder}/index.js";`
    })
    preStoreData += `export default {${modules.toString()}}`
    preRouterData += `export default [...${_.join(modules, ",...")}]`

    if (!isStoreFileExist || (isStoreFileExist && config.update)) {
        fs.writeFileSync(targetStoreFile, preStoreData);
    }

    if (!isRouterFileExist || (isRouterFileExist && config.update)) {
        fs.writeFileSync(targetRouterFile, preRouterData);
    }
}

function writeModule(config, project_dirname, current_dirname, SOURCE_DIR) {
    if (config.modules) {
        const src_folder = project_dirname + "/" + SOURCE_DIR
        const module_folder_config = config.moduleFolder || "modules";
        const module_folder = src_folder + "/" + module_folder_config;
        checkAndCreateFolder(module_folder);

        const modules = []
        config.modules.forEach(element => {
            const element_folder = module_folder + "/" + element.name;
            checkAndCreateFolder(element_folder);

            writeStore(current_dirname, element_folder, element)

            writeScreenBase(current_dirname, element_folder, element, "list.vue")
            writeScreenBase(current_dirname, element_folder, element, "detail.vue")
            writeScreenBase(current_dirname, element_folder, element, "edit.vue")

            writeScreenConfig(config, element_folder, element)
            modules.push(element.name)
        });

        writeConfig(config, modules, module_folder);

        //写入引用目录
        var readFile = require('./lib/readFile');
        const rootStoreFile = src_folder + "/" + config.store || "store.js";
        const storeContent = readFile.readFile(rootStoreFile)
        const storeExist = _.find(storeContent.importedComponents, { key: "store" })
        if (!storeExist) {
            storeContent.importedComponents.push({ key: "store", value: "@/modules/store.js" })
            storeContent.exportComponents.push("...store")
            readFile.updateFile(rootStoreFile, storeContent)
        }

        const rootRouterFile = src_folder + "/" + config.router || "router.js";
        const routerContent = readFile.readFile(rootRouterFile)
        const routerExist = _.find(routerContent.importedComponents, { key: "router" })
        if (!routerExist) {
            routerContent.importedComponents.push({ key: "router", value: "@/modules/router.js" })
            routerContent.exportComponents.push("...router")
            readFile.updateFile(rootRouterFile, routerContent)
        }
    } else {
        //失败就抛出异常，具体代码操作按实际需求来写
        throw (new Error("读取配置文件genesis.json格式异常, 请检查genesis配置。"))
    }
}

module.exports = {
    writeModule
}