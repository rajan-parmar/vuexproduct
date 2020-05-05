const state = {
    addToCarts: [],
};
const mutations = {
    addToCartProduct(state, cartProduct) {
        state.addToCarts.push(Object.assign({}, cartProduct));
    },
    deleteCart(state, productId) {
        state.addToCarts = state.addToCarts.filter(addToCarts => addToCarts.id !== productId);
    },
    cartQuantityIncrease(state, cartQuantityValue) {
        state.addToCarts.qty = cartQuantityValue;
    }
};
const actions = {
    addToCart({ commit }, cartItems) {
        commit('addToCartProduct', cartItems)
    },
    removeProduct({ commit }, productId) {
        commit('deleteCart', productId)
    },
    cartQuantityPlus({ commit }, cartQuantityValue) {
        commit('cartQuantityIncrease', cartQuantityValue)
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