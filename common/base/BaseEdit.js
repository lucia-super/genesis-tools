import { mapState, mapActions } from 'vuex'
import BaseDetail from "./BaseDetail";

export default {
    name: 'BaseEdit',
    extends: BaseDetail,
    created() {
        this.initialize()
    },

    methods: {
        ...mapActions({
            createEntry: function (dispatch, payload) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/createEntry`, payload)
                }
            },
            updateEntry: function (dispatch, payload) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/updateEntry`, payload)
                }
            },
            deleteEntry: function (dispatch, id) {
                if (this.moduleType) {
                    dispatch(`${this.moduleType}/deleteEntry`, id)
                }
            }
        }),
        /**
         * 初始化列表
         */
        onBack() {
            this.$router.back()
        }
    }
}
