Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products__inner">
                <product v-for="item of products" :img="img" :product="item"></product>
            </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="products__item">
                    <img :src="img" alt="">
                    <div class="products__info">
                        <h2 class="products__heading">{{ product.product_name }}</h2>
                        <span class="products__price">{{ product.price }}$</span>
                        <button @click="$root.addProduct(product)">Купить</button>
                    </div>
                </div>`
});