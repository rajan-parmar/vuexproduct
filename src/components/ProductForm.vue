<template>
    <div class="col-lg-3 form-section">
        <h3 class="font-weight-bold">Product Form :</h3>

        <form @submit.prevent="addNewProduct">
            <div class="form-group">
                <label class="font-weight-bold">Name:</label>
                <input type="text" class="form-control" placeholder="Insert Name" v-model="name"/>
            </div>

            <div class="form-group">
                <label class="font-weight-bold">Price:</label>
                <input type="number" class="form-control" placeholder="Insert Price" v-model="price"/>
            </div>

            <div class="form-group">
                <label class="font-weight-bold">Image Url:</label>
                <input type="text" class="form-control" placeholder="Insert Image Url" v-model="url"/>
            </div>

            <div class="text-center">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        props: {
            products: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                name: "",
                price: "",
                url: "",
            };
        },
        methods: {
            addNewProduct() {
                let uniqueId = 0;
                if (this.name == "" || this.price == "" || this.url == "") {
                    this.$toasted.error('Please fill blank field', {
                        position: 'top-right',
                        duration: 900
                    });
                } else {
                    uniqueId = this.products.length + 1;

                    this.products.push({
                        id: uniqueId,
                        name: this.name,
                        price: this.price,
                        url: this.url,
                        isEdit: false,
                        qty: 1
                    });

                    this.$emit("inputProduct", this.products);

                    this.$toasted.success('Product Inserted Successfully', {
                        position: 'top-right',
                        duration: 900
                    });

                    this.name = "";
                    this.price = "";
                    this.url = "";
                }
            },
        }
    };
</script>
<style>
    .form-section {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-radius: 1%;
    }
</style>
