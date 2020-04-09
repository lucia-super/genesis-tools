# genesis-tools

辅助工具，构建以 vue vue-router vuex 为基础的项目骨架，通过配置自动生成页面目录

### npm i genesis-tools

配置文件 genesis.json, 需要新建此目录并配置如下：

```
{
    "name": "genesis",
    "sourceFolder": "src",
    "storeFolder": "store",
    "viewFolder": "screen",
    "routerFolder": "router",
    "hardCopyBase": false,
    "modules": [{
        "name": "school",
        "update": false,
        "apis": {
            "list": "school/list",
            "detail": "school/detail",
            "edit": "school/detail",
            "delete": "school"
        }
    }, {
        "name": "students",
        "update": false,
        "apis": {
            "list": "students/list",
            "get": "students/detail",
            "edit": "students/detail",
            "delete": "students"
        }
    }]
}
```

注意 modules 是你需要创建的模块，具体用法参见项目 genesis
