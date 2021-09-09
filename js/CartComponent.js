Vue.component('cart', {
    props: ['cartItems', 'img', 'visible'],
    template: `<div class="cart__inner" v-show="visible">
                    <p v-if="!cartItems.length">Cart is empty!</p>
                    <cart-item v-for="item of cartItems" :img="img" :cart-item="item"></cart-item>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart__item">
                    <a href="#" class="cart__link">
                        <div class="cart__img">
                            <img :src="img" alt="">
                        </div>
                        <div class="cart__item-info">
                            <p class="cart__item-title">{{ cartItem.product_name }}</p>
                            <div class="cart__item-details">
                                <div class="cart__item-count">{{ cartItem.quantity }}</div>
                                <span>x</span>
                                <div class="cart__item-price">{{ cartItem.price }}</div>
                            </div>
                            <div class="cart__total-price">{{ cartItem.quantity * cartItem.price }}</div>
                        </div>
                        <button class="cart__item-delete" @click="$root.removeProduct(cartItem)">
                            <span class="visually-hidden">Удалить товар</span>
                        </button>
                    </a>
                </div>`
});