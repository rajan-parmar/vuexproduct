const state = {
    products: [],
};
const mutations = {
    addToNew(state, product) {
        state.products.push(product);
    }
};
const actions = {
    addToNew({ commit }, items) {
        commit('addToNew', items)
    },
};

const getters = {
    allProducts: state => state.products
}

export default {
    state,
    mutations,
    actions,
    getters,
}