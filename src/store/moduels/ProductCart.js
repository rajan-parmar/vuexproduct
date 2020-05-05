const state = {
    addToCarts: [],
};
const mutations = {
    addToCartProduct(state, cartProduct) {
        state.addToCarts.push(Object.assign({}, cartProduct));
    },
    deleteCart(state, productId) {
        state.addToCarts = state.addToCarts.filter(addToCarts => addToCarts.id !== productId);
    }
};
const actions = {
    addToCart({ commit }, cartItems) {
        commit('addToCartProduct', cartItems)
    },
    removeProduct({ commit }, productId) {
        commit('deleteCart', productId)
    }
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