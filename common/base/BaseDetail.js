import { mapState, mapActions } from 'vuex'
import { cloneDeep, forEach } from 'lodash'

export default {
    name: 'BaseList',
    beforeRouteEnter(to, from, next) {
        // TODO 通用扩展
        next()
    },
    computed: {
        ...mapState({
            detail(state) {
                const modules = this.moduleType.split('/')
                let currentListState = cloneDeep(state[modules[0]])
                if (modules && modules.length > 1) { // 当在某个模块的非一级节点上时，需要根据模块名称一层层找到当前的state节点
                    forEach(modules, (item, index) => {
                        if (index === 0) return
                        currentListState = currentListState[item]
                    })
                }
                return currentListState ? currentListState.list : {}
            }
        })
    },

    created() {
        this.initialize()
    },

    methods: {
        ...mapActions({
            fetchDetail: function (dispatch, page = 1) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/fetchDetail`, {
                        payload: {
                            pagination: { page, size: this.pageSize },
                            conditions: this.conditions
                        }
                    })
                }
            }
        }),
        /**
         * 初始化列表
         */
        initialize() { },
        gotoDetail() {
            this.$router.push(this.moduleType + "Detail");
        }
    }
}
