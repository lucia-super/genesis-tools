import { mapState, mapActions } from 'vuex'
import Base from "./Base";

export default {
    name: 'BaseDetail',
    extends: Base,
    computed: {
        ...mapState({
            detail(state) {
                let currentState = this.getCurrentState(state, this.moduleType)
                return currentState ? currentState.current : {}
            }
        })
    },

    created() {
        this.initialize()
    },

    methods: {
        ...mapActions({
            fetchDetail: function (dispatch, id) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/fetchDetail`, id)
                }
            }
        }),
        /**
         * 初始化列表
         */
        initialize() {
            this.fetchDetail()
        },
        onBack() {
            this.$router.back()
        }
    }
}
