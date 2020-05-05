import Vue from "vue";
import Vuex from "vuex";
import module1 from "./moduels/ProductForm.js";
import module2 from "./moduels/ProductCart.js";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        module1,
        module2,
    }
});