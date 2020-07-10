# genesis-tools

辅助工具，构建以 vue vue-router vuex 为基础的项目骨架，通过配置自动生成页面目录

### npm i genesis-tools

配置文件 genesis.json, 需要新建此目录并配置如下：

```
{
    "name": "genesis", // 工程名字：optional
    "sourceFolder": "src", // 代码目录： required
    "moduleFolder": "modules", // 模块存储位置： 默认为src/modules required
    "store": "store.js", // store配置的目录： 工程名字：optional 默认为 src/store.js
    "router": "router.js", // router配置的目录 optional 默认为 src/router.js
    "hardCopyBase": false, // 是否需要硬拷贝所有base文件：optional
    "update": true, // 是否需要更新配置文件
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

1. 传递参数放入 url request 中 -- get list detail done
2. axios 的全局拦截，异常处理，及配置默认的错误页面
3. 建立 global 的 store 数据模型，及预加载还是懒加载模式
