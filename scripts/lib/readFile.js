var _ = require("lodash");
var fs = require('fs');

function readFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    const importedComponents = [];
    const exportComponents = [];
    const exportIsArray = false;
    if (content.indexOf("export") > -1) {
        const contentArray = content.split("export");
        const importString = contentArray[0];
        if (importString.indexOf("import") > -1) {
            importArray = importString.split("import");
            _.forEach(importArray, (itemValue) => {
                if (itemValue) {
                    itemArray = itemValue.split("from")
                    importedComponents.push({ key: itemArray[0].trim(), value: itemArray[1].trim() });
                }
            })
        }
        const exportString = contentArray[1].replace("default", "").trim();
        const handledString = exportString.substr(1, exportString.length - 2).trim();
        if (handledString.indexOf("}") > -1) {
            exportIsArray = true
            exportArray = handledString.split("},");
            _.forEach(exportArray, (itemValue) => {
                exportComponents.push(itemValue.indexOf("{") > -1 ? itemValue + "}" : itemValue.trim());
            })
        }
    }
    return { importedComponents, exportComponents, exportIsArray };
}

function updateFile(filePath, content) {
    let writeContent = ""
    _.forEach(content.importedComponents, (itemValue) => {
        if (itemValue) {
            writeContent = `import ${itemValue.key} from "${itemValue.value}";\n`
        }
    })
    let exportString = ""
    _.forEach(content.exportArray, (itemValue) => {
        if (itemValue) {
            exportString += `${itemValue},`;
        }
    })
    writeContent = writeContent + `export default ${content.exportIsArray ? "[" : "{"} ${exportString} ${content.exportIsArray ? "]" : "}"}`;
    fs.writeFileSync(filePath, writeContent);
}

module.exports = {
    readFile,
    updateFile
};
// 根据配置文件创建store模块
