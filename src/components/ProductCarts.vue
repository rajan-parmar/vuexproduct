<template>
    <div class="col-lg-5 cart-section">
        <h3 class="font-weight-bold">Cart Details:</h3>

        <p v-if="!allCarts.length" class="text-secondary">No cart item found.</p>

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

        <p>SubTotal: {{ subTotal | currency }}</p>
        <p v-show="discountValue">Discount: {{ discount | currency }}</p>
        <p v-show="shippingValue">Shipping Charge: {{ shipping | currency }}</p>
        <p v-show="netTotalValue">Net Total: {{ netTotal | currency }}</p>
        <p>Tax: {{ tax | currency }}</p>
        <p>Total: {{ total | currency }}</p>
        <p>Round off: {{ roundOff | currency }}</p>
        <p>Payable: {{ payable | currency}}</p>
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
        computed: {
            ...mapGetters(["allCarts"]),
            subTotal() {
                let subTotal = 0;
                const vm = this;

                this.$store.state.module2.addToCarts.forEach(item => {
                    subTotal += item.price * item.qty;
                });

                vm.finalSubTotal = subTotal;

                return subTotal;
            },
            discount() {
                const vm = this;

                if (this.finalDiscountType === "$") {
                    if (this.finalDiscountValue > this.finalSubTotal) {
                        this.$toasted.error('Something went wrong', {
                            position: 'top-right',
                            duration: 900
                        });

                        return;
                    }

                    vm.discountValue = true;

                    this.$toasted.success('Discount applied successfully', {
                        position: 'top-right',
                        duration: 900
                    });

                    return vm.finalDiscountValue;
                } else if (this.finalDiscountType === "%") {
                    vm.discountValue = true;
                    vm.finalDiscountValue =
                    (this.finalSubTotal * vm.finalDiscountValue) / 100;

                    this.$toasted.success('Discount applied successfully', {
                        position: 'top-right',
                        duration: 900
                    });

                    return vm.finalDiscountValue;
                }
            },
            shipping() {
                let shipping = 0;
                var vm = this;

                if (this.finalSubTotal > 0 && this.finalSubTotal <= 100) {
                    vm.shippingValue = true;
                    shipping = (this.finalSubTotal * 4) / 100;
                    vm.finalShipping = shipping;

                    return shipping;
                } else {
                    vm.finalShipping = 0;
                    vm.shippingValue = false;
                    return shipping;
                }
            },
            netTotal() {
                let netTotal = 0;
                var vm = this;

                if (this.finalDiscountValue > this.finalSubTotal) {
                    return;
                }

                if (this.shippingValue === true) {
                    vm.netTotalValue = true;

                    if (this.finalDiscountValue != "") {
                        netTotal = this.finalSubTotal + this.finalShipping - this.finalDiscountValue;
                    } else {
                        netTotal = this.finalSubTotal + this.finalShipping;
                    }

                    vm.finalNetTotal = netTotal;

                    return netTotal;
                } else {
                    vm.finalNetTotal = 0;
                    vm.netTotalValue = false;

                    return netTotal;
                }
            },
            tax() {
                let subTotal = 0;
                let tax = 0;
                var vm = this;

                if (this.finalDiscountValue > this.finalSubTotal) {
                    return;
                }

                this.$store.state.module2.addToCarts.forEach(item => {
                    subTotal += item.price * item.qty;
                });

                if (subTotal <= 100) {
                    tax = (this.finalNetTotal * 4) / 100;
                    vm.finalTax = tax;
                } else {
                    tax = (subTotal * 4) / 100;
                    vm.finalTax = tax;
                }

                return tax;
            },
            total() {
                let total = 0;
                var vm = this;

                if (this.finalDiscountValue > this.finalSubTotal) {
                    return;
                }

                if (this.finalSubTotal <= 100) {
                    total = this.finalNetTotal + this.finalTax;
                } else {
                    total = this.finalSubTotal + this.finalTax;
                }

                vm.finalTotal = total;

                return total;
            },
            roundOff() {
                let total = this.finalTotal;
                var vm = this;

                if (this.finalDiscountValue > this.finalSubTotal) {
                    return;
                }

                let roundOffTotal = Math.round(total);

                let roundOff = roundOffTotal.toFixed(2) - total.toFixed(2);

                vm.finalRoundOff = roundOffTotal;

                return roundOff;
            },
            payable() {
                if (this.finalDiscountValue > this.finalSubTotal) {
                    return;
                }

                let payable = this.finalRoundOff;

                return payable;
            }
        },
        methods: {
            applyDiscount() {
                let discountType = document.getElementById("discount-type").value;
                let discountValue = document.getElementById("discount-value").value;

                if (this.$store.state.module2.addToCarts.length === 0) {
                    this.$toasted.error('Empty Cart', {
                        position: 'top-right',
                        duration: 900
                    });

                    return;
                }

                if (discountValue == "") {
                    this.$toasted.error('Please enter discount value', {
                        position: 'top-right',
                        duration: 900
                    });

                    return;
                }

                this.finalDiscountType = discountType;
                this.finalDiscountValue = discountValue;
            },
            removeCartItem(index) {
                this.$store.state.module2.addToCarts.splice(index, 1);
                this.$toasted.success('Item removed from the cart successfully', {
                    position: 'top-right',
                    duration: 900
                });
            },
            plusCartQuantity(addToCart) {
                let itemInCartForPlus = this.$store.state.module2.addToCarts.filter(
                    item => item.id === addToCart.id
                );
                itemInCartForPlus[0].qty += 1;

                this.$toasted.success('Cart item updated successfully', {
                    position: 'top-right',
                    duration: 900
                });

            },
            minusCartQuantity(addToCart) {
                let itemInCartForMinus = this.$store.state.module2.addToCarts.filter(
                    item => item.id === addToCart.id
                );
                itemInCartForMinus[0].qty -= 1;

                if (itemInCartForMinus[0].qty === 0) {
                    this.$store.state.module2.addToCarts.splice(0 - 1, 1);
                }

                this.$toasted.success('Cart item updated successfully', {
                    position: 'top-right',
                    duration: 900
                });
            }
        }
    };
</script>
<style>
    .cart-section {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-radius: 1%;
    }
</style>
