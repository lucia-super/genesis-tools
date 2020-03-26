import { mapState, mapActions } from 'vuex'
import { cloneDeep, forEach } from 'lodash'

export default {
    name: 'BaseList',
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
        listData() { return this.list.data || [] },
        needReload(state) { return state[this.moduleType].needReload || false } // 是否需要更新列表
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
        onChangePage(newPage) {
            this.fetchList(newPage)
        },
        /**
        * 加载更多功能，这里跟其他列表不一样，针对loadmore功能定制方法
        */
        onLoadMore() {
            const { currentPage } = this.pagination
            this.onChangePage(currentPage + 1)
        },
        gotoDetail() {
            this.$router.push(this.moduleType + "Detail");
        }
    }
}
