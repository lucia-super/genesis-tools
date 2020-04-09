import { generateBaseListState, baseListMutations, reloadCurrentList } from '@/reusable'
import request from '@/base/request'

export default {
    namespaced: true,
    state: generateBaseListState(),

    mutations: {
        ...baseListMutations
    },

    actions: {
        fetchList({ commit }, { payload } = {}) {
            commit('CHANGE_LIST_LOADING', true)
            // TODO api request
            request("@placeholder_list", "GET", payload).then((response) => {
                const { result: data, pagination } = response.data
                commit('SAVE_LIST_DATA', { data, pagination, conditions: payload.conditions })
            }).catch((error) => {
                console.warn(error)
                //TODO
            })
            commit('CHANGE_LIST_LOADING', false)
        },
        fetchDetail({ commit }, payload) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("@placeholder_get", "GET", payload).then((response) => {
                console.log(response)
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
                console.warn(error)
                //TODO
            })
            commit('CHANGE_CURRENT_LOADING', false)
        },
        createEntry({ commit }, payload) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("@placeholder_edit", "POST", payload).then((response) => {
                console.log(response)
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
                console.warn(error)
                //TODO
            })
            commit('CHANGE_CURRENT_LOADING', false)
        },
        updateEntry({ commit }, payload) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("@placeholder_edit", "PUT", payload).then((response) => {
                console.log(response)
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
                console.warn(error)
                //TODO
            })

            commit('CHANGE_CURRENT_LOADING', false)
        },
        deleteEntry({ commit }, payload) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("@placeholder_delete", "DELETE", payload).then((response) => {
                console.log(response)
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
                console.warn(error)
                //TODO
            })

            commit('CHANGE_CURRENT_LOADING', false)
        },
        /**
         * 重新加载当前教练的列表数据
         * @param {Object} global environment
         */
        reloadData(global) {
            reloadCurrentList(global, 'fetchList', 'MARKED_RELOAD')
        }
    }
}