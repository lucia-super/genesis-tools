var _ = require('lodash');
var fs = require('fs');
const path = require("path");
//工程目录
let PROJECT_DIR = path.dirname(__dirname)
PROJECT_DIR = path.dirname(PROJECT_DIR)
//当前目录
const GENESIS_DIR = __dirname
//目标代码目录
const SOURCE_DIR = config.sourceFolder ?? "src"

//读取配置文件，变量config的类型是Object类型
var config = require(PROJECT_DIR + '/genesis.json');

// 根据配置文件创建store模块
const store = require("./scripts/store");
store.writeStore(fs, config, PROJECT_DIR, GENESIS_DIR, SOURCE_DIR)
// 根据配置文件创建对应的screen
const screen = require("./scripts/screen");
screen.writeScreen(fs, config, PROJECT_DIR, GENESIS_DIR, SOURCE_DIR)
store.writeStoreConfig(fs, config, PROJECT_DIR, SOURCE_DIR);
screen.writeScreenConfig(fs, config, PROJECT_DIR, SOURCE_DIR)

const common = GENESIS_DIR + "/common";

copyFolder(common)
function copyFolder(path) {
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
                if (!fs.existsSync(targetFile)) {
                    fs.copyFileSync(director, targetFile)
                }
            }
        })
    })
}
