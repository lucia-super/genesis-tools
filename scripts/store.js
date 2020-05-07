
var _ = require('lodash');

function writeStore(fs, config, project_dirname, genesis_dirname, SOURCE_DIR) {
    const data = fs.readFileSync(genesis_dirname + "/template/store.js", 'utf8')
    if (data) {
        config.modules.forEach(element => {
            const folder = project_dirname + "/" + SOURCE_DIR + "/" + config.storeFolder + "/" + element.name;
            const targetFile = folder + "/index.js";

            const { apis } = element;
            let preHandledData = data
            _.forOwn(apis, (value, key) => {
                preHandledData = preHandledData.replace(new RegExp("@MODULE_PLACEHOLDER_" + key, "gm"), value);
            })

            const isExist = fs.existsSync(folder);
            const isFileExist = fs.existsSync(targetFile);
            if (!isExist) {
                fs.mkdirSync(folder);
            }
            if (!isFileExist || (isFileExist && element.update)) {
                fs.writeFileSync(targetFile, preHandledData);
            }
        });
    } else {
        //失败就抛出异常，具体代码操作按实际需求来写
        console.error('读取store异常')
    }
}

function writeStoreConfig(fs, config, project_dirname, SOURCE_DIR) {
    const readline = require('readline');
    const storeConfig = project_dirname + "/" + SOURCE_DIR + "/" + config.storeFolder + "/index.js"
    const readStream = fs.createReadStream(storeConfig);
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });

    const importedComponents = [];
    let storeContent = ""
    rl.on('line', (line) => {
        if (line.indexOf("import") > -1) {
            importedComponents.push({ key: line.split(" ")[1], value: line })
        }
    }).on('close', function () {
        config.modules.forEach(element => {
            if (_.filter(importedComponents, { key: element.name }).length === 0) {
                importedComponents.push({ key: element.name, value: 'import ' + element.name + ' from "./' + element.name + '/index.js";' })
            }
        });

        let importContent = "";
        let exportContent = "";
        _.forEach(importedComponents, (item) => {
            importContent += item.value + "\n";
            exportContent += item.key + ",\n";
        })
        const exportData = `export default { \n${exportContent}}`;
        storeContent = importContent + exportData;
        fs.writeFileSync(storeConfig, storeContent);
        readStream.destroy();
    });
}

module.exports = {
    writeStore,
    writeStoreConfig
}
// 根据配置文件创建store模块