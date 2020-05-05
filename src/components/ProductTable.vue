<template>
    <div class="col-lg-4">
        <h3 class="font-weight-bold">Product Details :</h3>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Name Image</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="!this.$store.state.module1.products.length">
                    <td colspan="5" class="text-center">No Records</td>
                </tr>

                <tr v-for="(product, index) in allProducts" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>
                        <input v-model="product.name"
                            v-if="product.isEdit"
                            class="form-control"
                            @keyup.enter=" product.isEdit = false; updateProduct(product.id, product);"
                        />
                        <label v-else @click="product.isEdit = true">{{ product.name }}</label>
                    </td>

                    <td>
                        <input v-model="product.price"
                            v-if="product.isEdit"
                            class="form-control"
                            @keyup.enter=" product.isEdit = false; updateProduct(product.id, product);"
                        />
                        <label v-else @click="product.isEdit = true">{{ product.price | currency }}</label>
                    </td>

                    <td>
                        <input v-model="product.url"
                            v-if="product.isEdit"
                            class="form-control"
                            @keyup.enter=" product.isEdit = false; updateProduct(product.id, product); "
                        />
                        <img v-else @click="product.isEdit = true" :src="product.url" width="50px" height="50px"/>
                    </td>

                    <td>
                        <button class="btn btn-danger mr-2" title="Delete Todo" @click="removeProduct(product.id)">
                            <i class="fas fa-trash-alt text-light"></i>
                        </button>

                        <button class="btn btn-primary" title="Add To Cart" @click="addToCart(product, index)">
                            <i class="fas fa-shopping-cart text-light"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "products",
        filters: {
            currency:function(value) {
                return '$' + parseFloat(value).toFixed(2);
            }
        },
        computed: mapGetters(["allProducts"]),
        methods: {
            addToCart(product) {
                let itemInCart = this.$store.state.module2.addToCarts.filter(item => item.id === product.id);

                let isItemInCart = itemInCart.length > 0;

                if (isItemInCart === false) {
                    this.$store.dispatch('addToCart', product);

                    this.$toasted.success('Item Added to the cart successfully', {
                        position: 'top-right',
                        duration: 900
                    });
                }
            },
            updateProduct(productId, product) {
                let productInCart = this.$store.state.module2.addToCarts.filter(item => item.id === productId);

                if (this.$store.state.module2.addToCarts.length > 0) {
                    productInCart[0].name = product.name;
                    productInCart[0].price = product.price;
                    productInCart[0].url = product.url;
                }
                this.$toasted.success('Product Updated Successfully', {
                    position: 'top-right',
                    duration: 900
                });
            },
            removeProduct(productId) {
                this.$store.dispatch('removeProduct', productId);
            }
        }
    };
</script>
