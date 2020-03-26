
var _ = require('lodash');

function writeScreen(fs, config, project_dirname, genesis_dirname) {
    const data = fs.readFileSync(genesis_dirname + "/template/list.vue", 'utf8')
    if (data) {
        config.modules.forEach(element => {
            const folder = project_dirname + "/src/" + config.viewFolder + "/" + element.name;
            const preHandledData = data.replace("$placeholder", element.name);
            const isExist = fs.existsSync(folder);
            if (!isExist) {
                fs.mkdirSync(folder);
                fs.writeFileSync(folder + "/list.vue", preHandledData);
            } else if (isExist && element.update) {
                fs.writeFileSync(folder + "/list.vue", preHandledData);
            }
        });
    } else {
        //失败就抛出异常，具体代码操作按实际需求来写
        console.error('读取Screen异常')
    }
}


function writeScreenConfig(fs, config, project_dirname) {
    const readline = require('readline');
    const screenConfig = project_dirname + "/src/" + config.routerFolder + "/index.js"
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
            importedComponents.push({ key: line.split(" ")[1], value: line })
        }
    }).on('close', () => {
        config.modules.forEach(element => {
            if (_.filter(importedComponents, { key: element.name }).length === 0) {
                importedComponents.push({ key: element.name, value: 'import ' + element.name + ' from "@/' + config.viewFolder + '/' + element.name + '/list.vue";' })
                // importedComponents.push({ key: element.name, value: 'import ' + element.name + ' from "@/' + element.viewFolder + '/' + element.name + '/detail.vue";' })
            }
        });

        let importContent = "";
        let exportContent = "";
        _.forEach(importedComponents, (item) => {
            importContent += item.value + "\n";
            exportContent += `{ path: '/${item.key}', component: ${item.key} },\n`;
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