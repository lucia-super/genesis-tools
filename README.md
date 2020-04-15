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

TODO：

1. 传递参数放入url request中
2. axios的全局拦截，异常处理，及配置默认的错误页面
3. bug修复：
   目前文件删除，文件夹遗留的话，会无法新生成模版文件
   router和view中如果不是index.js，或者不存在的情况下，这里也会有问题，需要增强配置的灵活性
4. 建立global的store数据模型，及预加载还是懒加载模式
   
