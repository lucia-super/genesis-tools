var _ = require('lodash');
var fs = require('fs');
const path = require("path");

//读取配置文件，变量config的类型是Object类型
var config = require('../genesis');

//工程目录
const project_dirname = path.dirname(__dirname)
//当前目录
const genesis_dirname = __dirname

// 根据配置文件创建store模块
const store = require("./scripts/store");
store.writeStore(fs, config, project_dirname, genesis_dirname)
// 根据配置文件创建对应的screen
const screen = require("./scripts/screen");
screen.writeScreen(fs, config, project_dirname, genesis_dirname)
store.writeStoreConfig(fs, config, project_dirname);
screen.writeScreenConfig(fs, config, project_dirname)

const common = genesis_dirname + "/common";

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
                const srcTargetFolder = project_dirname + "/src" + targetFolder;
                if (!fs.existsSync(srcTargetFolder)) {
                    fs.mkdirSync(srcTargetFolder)
                }
                copyFolder(director)
            } else {
                const targetFolder = path.replace(common, "")
                fs.copyFileSync(director, project_dirname + "/src" + targetFolder + "/" + fileName)
            }
        })
    })
}
