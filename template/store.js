import { generateBaseListState, baseListMutations, reloadCurrentList } from '../../reusable'
import { request } from '../base/request'

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
            request("$placeholder_list", "GET", payload).then((data) => {
                const mockData = {
                    result: [
                        { key: "template1", value: "1" },
                        { key: "template2", value: "2" },
                        { key: "template3", value: "4" }],
                    pagination: {
                        size: 10,
                        page: payload.pagination.page,
                        amount: 3,
                        totalPages: 1
                    }
                }
                const { result: data, pagination } = mockData
                commit('SAVE_LIST_DATA', { data, pagination, conditions: payload.conditions })
            }).catch((error) => {
                //TODO
            })
            commit('CHANGE_LIST_LOADING', false)
        },
        fetchDetail({ commit }, payload) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("$placeholder_get", "GET", payload).then((data) => {
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
                //TODO
            })
            commit('CHANGE_CURRENT_LOADING', false)
        },
        createEntry({ commit }, payload) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("$placeholder_edit", "POST", payload).then((data) => {
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
                //TODO
            })
            commit('CHANGE_CURRENT_LOADING', false)
        },
        updateEntry({ commit }) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("$placeholder_edit", "PUT", payload).then((data) => {
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
                //TODO
            })

            commit('CHANGE_CURRENT_LOADING', false)
        },
        deleteEntry({ commit }) {
            commit('CHANGE_CURRENT_LOADING', true)
            // TODO api request
            request("$placeholder_delete", "DELETE", payload).then((data) => {
                const mockData = {
                    name: "templagte 1 detail"
                }
                commit('SAVE_CURRENT_DETAIL', mockData)
            }).catch((error) => {
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