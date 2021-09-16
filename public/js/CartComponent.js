const cartItem = {
    props: ['cartItem', 'img'],
    template: `<div class="cart__item">
                    <div class="cart__img-wrapper">
                        <img :src="img" alt="">
                    </div>                    
                    <div class="cart__info">
                        <h3 class="cart__title">{{ cartItem.product_name }}</h3>
                        <p class="cart__details">
                            <span class="cart__quantity">{{ cartItem.quantity }}</span>
                            <span class="cart_x">x</span>
                            <span>{{ cartItem.price }}$</span>
                        </p>
                        <p class="cart__item-amount">{{ cartItem.quantity * cartItem.price }}$</p>
                    </div>
                    <button class="cart__del" @click="$emit('remove-product', cartItem)"><i class="fas fa-times-circle"></i></button>
                </div>`
};

const cart = {
    components: { 'cart-item': cartItem },
    data() {
        return {
            showCart: false,
            cartItems: [],
            countCartIcon: 0,
        }
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    });
            } else {
                let prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    })

            }
        },
        removeProduct(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ item.id_product }`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                            this.countCartIcon--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${ item.id_product }`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
        totalCart() {
            let totalSum = 0;
            for (let item of this.cartItems) {
                totalSum += item.quantity * item.price;
            }
            return totalSum;
        }
    },

    template: `<div class="header-icons__item cart-block">
                <button class="cart" @click="showCart=!showCart">
                    <p class="cart-count"></p>
                </button>
                <div class="cart__inner" v-show="showCart">
                    <cart-item v-for="item of cartItems" :img="item.img" :cart-item="item" @remove-product="removeProduct"></cart-item>
                    <div class="cart__total-block"><span>Total</span> <span class="cart__total-price">{{ totalCart() }}$</span></div>
                    <a class="cart__go-btn" href="cart.html">Go to Cart</a>
                </div>
            </div>`

}