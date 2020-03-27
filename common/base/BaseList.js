import { mapState, mapActions } from 'vuex'
import { cloneDeep, forEach } from 'lodash'

export default {
    name: 'BaseList',
    /**
     * 这里判断当前列表是否需要刷新，如果需要，则自动更新列表
     * @param {Object} to 当前路径
     * @param {Object} from 来自哪里
     * @param {Function} next 继续执行的方法
     */
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.needReload && vm.reloadData) {
                vm.reloadData()
            }
        })
    },
    computed: {
        ...mapState({
            list(state) {
                const modules = this.moduleType.split('/')
                let currentState = cloneDeep(state[modules[0]])
                if (modules && modules.length > 1) { // 当在某个模块的非一级节点上时，需要根据模块名称一层层找到当前的state节点
                    forEach(modules, (item, index) => {
                        if (index === 0) return
                        currentState = currentState[item]
                    })
                }
                return currentState ? currentState.list : {}
            }
        }),
        pagination() { return this.list.pagination },
        loading() { return this.list.loading || false },
        listData() { return this.list.data || [] },
        needReload() { return this.list.needReload } // 是否需要更新列表
    },

    created() {
        this.initialize()
    },

    methods: {
        ...mapActions({
            /**
            * 获取列表数据：
            * 分页信息由请求带入
            * 条件数据是当前页面面数据中的data中的对象，如果没有定义，这里就是空的
            * @param {Dispatch} dispatch dispatch
            */
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
            /**
             * 更新列表数据，目前三个模块的更新方法统一命名为reloadData，所以在这里配置
             * @param {Dispatch} dispatch dispatch
             */
            reloadData: function (dispatch) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/reloadData`)
                }
            }
        }),
        /**
         * 初始化列表
         */
        initialize() {
            this.fetchList();
        },
        /**
         * 页码发生变化
         * @param {Number} newPage 变化后的页码
         */
        onPageChange(newPage) {
            this.fetchList(newPage)
        },
        /**
         * 默认的去详情页面
         */
        gotoDetail() {
            this.$router.push(this.moduleType + "Detail");
        },
        /**
        * 加载更多功能，这里跟其他列表不一样，针对load more功能定制方法
        */
        onLoadMore() {
            const { currentPage } = this.pagination
            this.onPageChange(currentPage + 1)
        }
    }
}
