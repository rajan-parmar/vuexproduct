<template>
    <div class="col-lg-5 cart-section">
        <h3 class="font-weight-bold">Cart Details:</h3>

        <p v-if="!this.$store.state.module2.addToCarts.length" class="text-secondary">No cart item found.</p>

        <span v-for="(addToCart, index) in allCarts" class="shadow-lg" :key="addToCart.id">
            <div class="row mb-3">
                <div class="col-lg-3">
                    <img :src="addToCart.url" width="50px" height="50px" />
                </div>

                <div class="col-lg-4">
                    <span>{{ addToCart.name }}</span><br />
                    <span>{{ addToCart.price | currency }}</span>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-lg-4">
                    <input v-model="addToCart.qty" class="form-control" type="text" readonly />
                </div>

                <div class="col-lg-3">
                    <button class="btn btn-secondary mr-1" title="Plus Quantity" @click="plusCartQuantity(addToCart)">
                        +
                    </button>
                    <button class="btn btn-secondary mr-1" title="Minus Quantity" @click="minusCartQuantity(addToCart)">
                        -
                    </button>
                    <button class="btn btn-danger" title="Remove Cart" @click="removeCartItem(index)">
                        X
                    </button>
                </div>
            </div>
        </span>

        <hr class="bg-warning" />

        <form @submit.prevent="applyDiscount">
            <div class="row">
                <div class="col-lg-3">
                    <select class="form-control" id="discount-type">
                        <option value="%" selected>%</option>
                        <option value="$">$</option>
                    </select>
                </div>

                <div class="col-lg-6">
                    <input type="text" class="form-control" id="discount-value" placeholder="Discount"/>
                </div>

                <div class="col-lg-3">
                    <button class="btn btn-info">Apply</button>
                </div>
            </div>
        </form>

        <hr class="bg-warning" />

        <!-- <p>SubTotal: {{ subTotal }}</p>
        <p v-show="discountValue">Discount: {{ discount }}</p>
        <p v-show="shippingValue">Shipping Charge: {{ shipping }}</p>
        <p v-show="netTotalValue">Net Total: {{ netTotal }}</p>
        <p>Tax: {{ tax }}</p>
        <p>Total: {{ total }}</p>
        <p>Round off: {{ roundOff }}</p>
        <p>Payable: {{ payable }}</p> -->
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "carts",
        data() {
            return {
                finalSubTotal: "",
                finalTax: "",
                finalTotal: "",
                finalRoundOff: "",
                shippingValue: false,
                finalShipping: "",
                netTotalValue: false,
                finalNetTotal: "",
                finalDiscountType: "",
                finalDiscountValue: "",
                discountValue: false
            };
        },
        filters: {
            currency:function(value) {
                return '$' + parseFloat(value).toFixed(2);
            }
        },
        computed: mapGetters(["allCarts"]),
    };
</script>
<style>
    .cart-section {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-radius: 1%;
    }
</style>
