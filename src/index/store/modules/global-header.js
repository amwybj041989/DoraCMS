import api from '~api'

const state = () => ({
    lists: []
})

const actions = {
    async ['getHeaderNavList']({ commit, state }, config) {
        // if (state.list.data.length > 0 && config.path === state.lists.path && config.page === 1) {
        //     return
        // }
        const { data } = await api.get('contentCategory/getList', { ...config, cache: true })
        if (data.docs && data.state === 'success') {
            commit('receiveCategoryList', {
                ...config,
                ...data
            })
        }
    }
}

const mutations = {
    ['receiveCategoryList'](state, { docs, hasNext, hasPrev, page, path }) {
        state.lists = {
            data: docs, hasNext, hasPrev, page, path
        }
    }
}

const getters = {
    ['getHeaderNavList'](state) {
        return state.lists
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
