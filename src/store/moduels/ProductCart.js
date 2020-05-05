const state = {
    addToCarts: [],
};
const mutations = {
    addToCartProduct(state, cartProduct) {
        state.addToCarts.push(Object.assign({}, cartProduct));
    }
};
const actions = {
    addToCart({ commit }, cartItems) {
        commit('addToCartProduct', cartItems)
    },
};

const getters = {
    allCarts: state => state.addToCarts
}

export default {
    state,
    mutations,
    actions,
    getters,
}