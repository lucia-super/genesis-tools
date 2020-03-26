import { mapState, mapActions } from 'vuex'
import { cloneDeep, forEach } from 'lodash'

export default {
    name: 'BaseList',
    beforeRouteEnter(to, from, next) {
        // TODO 通用扩展
        next(() => {
        })
    },
    computed: {
        ...mapState({
            list(state) {
                const modules = this.moduleType.split('/')
                let currentListState = cloneDeep(state[modules[0]])
                if (modules && modules.length > 1) { // 当在某个模块的非一级节点上时，需要根据模块名称一层层找到当前的state节点
                    forEach(modules, (item, index) => {
                        if (index === 0) return
                        currentListState = currentListState[item]
                    })
                }
                return currentListState ? currentListState.list : {}
            },
            domainArea: state => state.global.domainArea
        }),
        pagination() { return this.list.pagination },
        loading() { return this.list.loading || false },
        listData() { return this.list.data || [] }
    },

    created() {
        this.initialize()
    },

    methods: {
        ...mapActions({
            fetchList: function (dispatch, page = 1) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/fetchList`, {
                        payload: {
                            pagination: { page, size: this.pageSize },
                            conditions: this.conditions
                        }
                    })
                }
            },
            setCurrent: function (dispatch, itemData) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/setCurrent`, itemData)
                }
            }
        }),
        /**
         * 初始化列表
         */
        initialize() { },
    }
}
