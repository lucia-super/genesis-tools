# genesis-tools
辅助工具，构建以vue vue-router vuex为基础的项目骨架，通过配置自动生成页面目录

### npm i genesis-tools

配置文件genesis.json, 需要新建此目录并配置如下：
{
    "name": "genesis",
    "sourceFolder": "src",
    "storeFolder": "store",
    "viewFolder": "screen",
    "routerFolder": "router",
    "hardCopyBase": false,
    "modules": [{
        "name": "school",
        "update": true
    }, {
        "name": "students",
        "update": false
    }]
}

注意modules是你需要创建的模块，具体用法参见项目genesis
