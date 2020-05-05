const state = {
    products: [],
};
const mutations = {
    addToNewProduct(state, product) {
        state.products.push(product);
    },
    deleteProduct(state, productId) {
        state.products = state.products.filter(product => product.id !== productId);
    }
};
const actions = {
    addToNew({ commit }, items) {
        commit('addToNewProduct', items)
    },
    removeProduct({ commit }, productId) {
        commit('deleteProduct', productId)
    }
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