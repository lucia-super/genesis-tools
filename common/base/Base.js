import { cloneDeep, forEach } from 'lodash'

export default {
    name: 'Base',
    methods: {
        getCurrentState: (state, moduleType) => {
            const modules = moduleType.split('/')
            let currentState = cloneDeep(state[modules[0]])
            if (modules && modules.length > 1) { // 当在某个模块的非一级节点上时，需要根据模块名称一层层找到当前的state节点
                forEach(modules, (item, index) => {
                    if (index === 0) return
                    currentState = currentState[item]
                })
            }
            return currentState;
        }
    }
}