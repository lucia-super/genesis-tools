var _ = require('lodash');
var fs = require('fs');
const path = require("path");
//工程目录
let PROJECT_DIR = path.dirname("./")
// let PROJECT_DIR = path.dirname(__dirname)
// PROJECT_DIR = path.dirname(PROJECT_DIR)
//当前目录
const GENESIS_DIR = __dirname
//读取配置文件，变量config的类型是Object类型
// TODO
var config = require('./genesis.json');
//目标代码目录
const SOURCE_DIR = config.sourceFolder || "src"

// 根据配置文件模块
const handleModule = require("./scripts/module");
handleModule.writeModule(config, PROJECT_DIR, GENESIS_DIR, SOURCE_DIR)

// copy base
// hardCopyBase: 是否需要强制替换
const { hardCopyBase } = config;
const common = GENESIS_DIR + "/common";

copyFolder(common, hardCopyBase)

function copyFolder(path, hardCopyBase) {
    fs.readdir(path, function (err, files) {
        if (err) {
            return false;
        }
        files.forEach(function (fileName) {
            var director = path + '/' + fileName;
            const stat = fs.statSync(director)
            if (stat.isDirectory()) {
                const targetFolder = director.replace(common, "")
                const srcTargetFolder = PROJECT_DIR + "/" + SOURCE_DIR + targetFolder;
                if (!fs.existsSync(srcTargetFolder)) {
                    fs.mkdirSync(srcTargetFolder)
                }
                copyFolder(director)
            } else {
                const targetFolder = path.replace(common, "")
                const targetFile = PROJECT_DIR + "/" + SOURCE_DIR + targetFolder + "/" + fileName;
                const isTargetExist = fs.existsSync(targetFile);
                if (!isTargetExist) {
                    fs.copyFileSync(director, targetFile)
                }
                if (isTargetExist && hardCopyBase) {
                    fs.copyFileSync(director, targetFile)
                }
            }
        })
    })
}
