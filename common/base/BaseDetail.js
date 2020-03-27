import { mapState, mapActions } from 'vuex'
import { cloneDeep, forEach } from 'lodash'

export default {
    name: 'BaseDetail',
    computed: {
        ...mapState({
            detail(state) {
                const modules = this.moduleType.split('/')
                let currentState = cloneDeep(state[modules[0]])
                if (modules && modules.length > 1) { // 当在某个模块的非一级节点上时，需要根据模块名称一层层找到当前的state节点
                    forEach(modules, (item, index) => {
                        if (index === 0) return
                        currentState = currentState[item]
                    })
                }
                return currentState ? currentState.current : {}
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
        initialize() {
            this.fetchDetail();
        },
        onBack() {
            this.$router.back()
        }
    }
}
