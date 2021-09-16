const product = {
    props: ['product', 'img'],
    template: `<div class="products__item">
                <a href="product.html" class="products__link">
                    <div class="products__img">
                        <img :src="img" alt="">
                    </div>
                    <div class="products__info">
                        <div class="products__heading">{{ product.product_name }}</div>
                        <div class="products__descr">{{ product.description }}</div>
                        <div class="products__price">{{ product.price }}$</div>
                    </div>
                </a>
                <div class="add-to-cart">
                    <button class="add-btn" @click.prevent="$emit('add-product', product)">Add to Cart</button>
                </div>
            </div>`
}


const products = {
    components: { product },
    data() {
        return {
            filtered: [],
            products: []
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            })

    },
    methods: {
        filterProd(val) {
            let regexp = new RegExp(val, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));

        }
    },
    template: `<div class="products">
                    <product v-for="item of filtered" :img="item.img" :product="item" @add-product="$parent.$refs.cart.addProduct"></product>
                </div>`
}