# genesis-tools

辅助工具，构建以 vue vue-router vuex 为基础的项目骨架，通过配置自动生成页面目录

### npm i genesis-tools

配置文件 genesis.json, 需要新建此目录并配置如下：

```
{
    "name": "genesis", // 工程名字：optional
    "sourceFolder": "src", // 代码目录： required
    "storeFolder": "store", // redux的store的引入目录： required
    "viewFolder": "screen", // screen页面写入的根目录： required
    "routerFolder": "router", // router配置的目录： required
    "hardCopyBase": false, // 是否需要硬拷贝所有base文件：optional
    "modules": [{ // 业务模块：required
        "name": "school",  // 业务名称：required
        "update": false, // 是否强制更新为初始化内容：optional
        "apis": { // apis配置：required
            "list": "school/list", // 列表API：required
            "detail": "school/detail", // 详情API：required
            "edit": "school/detail", // 创建和编辑API：required
            "delete": "school" // 删除功能的API：required
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

1. 传递参数放入 url request 中
2. axios 的全局拦截，异常处理，及配置默认的错误页面
3. bug 修复：
   目前文件删除，文件夹遗留的话，会无法新生成模版文件
   router 和 view 中如果不是 index.js，或者不存在的情况下，这里也会有问题，需要增强配置的灵活性
4. 建立 global 的 store 数据模型，及预加载还是懒加载模式
