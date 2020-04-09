
var _ = require('lodash');

function writeStore(fs, config, project_dirname, genesis_dirname, SOURCE_DIR) {
    const data = fs.readFileSync(genesis_dirname + "/template/store.js")
    if (data) {
        config.modules.forEach(element => {
            const folder = project_dirname + "/" + SOURCE_DIR + "/" + config.storeFolder + "/" + element.name;
            const isExist = fs.existsSync(folder);
            const { apis } = element;
            let preHandledData = ""
            _.forOwn(apis, (value, key) => {
                preHandledData = data.replace("$placeholder_" + key, value);
            })
            if (!isExist) {
                fs.mkdirSync(folder);
                fs.writeFileSync(folder + "/index.js", preHandledData);
            } else if (isExist && element.update) {
                fs.writeFileSync(folder + "/index.js", preHandledData);
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