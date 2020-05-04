<template>
  <div id="app">
    <div>
        <div class="top-bar text-left">
            <h2 class="ml-5 mt-3">VueJs Cart Manager</h2>
        </div>

        <div class="row mr-3 mt-5 ml-3">
            <ProductForm @inputProduct="inputProducts" :products="products"/>
            <ProductTable @cartProduct="updateCarts" :addToCarts="addToCarts" :products="products" @remove-product="removeProductUpdate" />
            <ProductCarts :addToCarts="addToCarts" />
        </div>
    </div>
  </div>
</template>
<script>
    // @ is an alias to /src
    import ProductForm from "@/components/ProductForm.vue";
    import ProductTable from "@/components/ProductTable.vue";
    import ProductCarts from "@/components/ProductCarts.vue";
    export default {
        name: "Products",
        components: {
            ProductForm,ProductTable,ProductCarts
        },
        data() {
            return {
                products: [],
                addToCarts: []
            }
        },
        methods: {
            inputProducts(productAddedData) {
                this.products = productAddedData;
            },
            updateCarts(cartQuantityValue, index) {
                this.addToCarts[index].qty = cartQuantityValue;
            },
            removeProductUpdate(productId) {
                this.products = this.products.filter(product => product.id !== productId);
                this.addToCarts = this.addToCarts.filter(cart => cart.id !== productId);
                this.$toasted.success('Product removed successfully', {
                    position: 'top-right',
                    duration: 900
                });
            },
        }
    };
</script>
<style>
    .top-bar {
        height: 60px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-radius: 1%;
    }
</style>
