
var _ = require('lodash');

function writeScreenBase(screenName, fs, config, project_dirname, genesis_dirname, SOURCE_DIR) {
    const data = fs.readFileSync(genesis_dirname + "/template/" + screenName, 'utf8')
    if (data) {
        config.modules.forEach(element => {
            const targetFolder = project_dirname + "/" + SOURCE_DIR + "/" + config.viewFolder + "/" + element.name;
            const targetFile = targetFolder + "/" + screenName;

            const preHandledData = data.replace("@placeholder", element.name);

            const isExist = fs.existsSync(targetFolder);
            const isFileExist = fs.existsSync(targetFile);
            if (!isExist) {
                fs.mkdirSync(targetFolder);
            }
            if (!isFileExist || (isFileExist && element.update)) {
                fs.writeFileSync(targetFile, preHandledData);
            }
        });
    } else {
        //失败就抛出异常，具体代码操作按实际需求来写
        console.error('读取Screen异常')
    }
}

function writeScreen(fs, config, project_dirname, genesis_dirname, SOURCE_DIR) {
    writeScreenBase("list.vue", fs, config, project_dirname, genesis_dirname, SOURCE_DIR)
    writeScreenBase("detail.vue", fs, config, project_dirname, genesis_dirname, SOURCE_DIR)
    writeScreenBase("edit.vue", fs, config, project_dirname, genesis_dirname, SOURCE_DIR)
}

function writeScreenConfig(fs, config, project_dirname, SOURCE_DIR) {
    const readline = require('readline');
    const screenConfig = project_dirname + "/" + SOURCE_DIR + "/" + config.routerFolder + "/index.js"
    const readStream = fs.createReadStream(screenConfig);
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
        terminal: true
    });

    const importedComponents = [];
    let storeContent = "";
    rl.on('line', (line) => {
        if (line.indexOf("import") > -1) {
            importedComponents.push({ key: line.split(" ")[1], value: line, path: line.split(" ")[1].toLowerCase() })
        }
    }).on('close', () => {
        config.modules.forEach(({ name }) => {
            if (_.filter(importedComponents, { key: name }).length === 0) {
                const detailKey = name + "Detail"
                const detailPath = name + "/detail"
                const editKey = name + "Edit"
                const editPath = name + "/edit"
                importedComponents.push({ key: name, value: 'import ' + name + ' from "@/' + config.viewFolder + '/' + name + '/list.vue";', path: name });
                importedComponents.push({ key: detailKey, value: 'import ' + detailKey + ' from "@/' + config.viewFolder + '/' + name + '/detail.vue";', path: detailPath });
                importedComponents.push({ key: editKey, value: 'import ' + editKey + ' from "@/' + config.viewFolder + '/' + name + '/edit.vue";', path: editPath });
            }
        });

        let importContent = "";
        let exportContent = "";
        _.forEach(importedComponents, (item) => {
            importContent += item.value + "\n";
            exportContent += `{ path: '/${item.path}', component: ${item.key} },\n`;
        })
        const exportData = `export default [ \n${exportContent}]`;
        storeContent = importContent + exportData;
        fs.writeFileSync(screenConfig, storeContent)
        readStream.destroy();
    });
}

module.exports = {
    writeScreen,
    writeScreenConfig
}
// 根据配置文件创建store模块