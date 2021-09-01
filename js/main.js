"use strict";
const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.url = url;
        this.list = list;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    handleData(data) {
        this.goods = data;
        this.render();
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            //console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product); //мы сделали объект товара либо CartItem, либо ProductItem
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    _init() {
        return false
    }
}

class Item {
    constructor(el, img = "https://via.placeholder.com/360x200") {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return `<div class="products__item" data-id="${this.id_product}">
        <a href="#" class="products__link">  
            <img src="${this.img}" alt="" class="products__img">
            <div class="products__info">
                <h3 class="products__heading">${this.product_name}</h3>
                <div class="products__descr"></div>
                <div class="products__price">${this.price}$</div>
            </div>
            </a>
            
        <div class="add-to-cart">
            <button href="#" class="add-btn" data-id="${this.id_product}"
            data-name="${this.product_name}"
            data-price="${this.price}">Add to Cart</button>
    </div>
    </div>`
    }
}

class ProductList extends List {
    constructor(cart, container = '.products__inner', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('add-btn')) {
                console.log(e.target);
                this.cart.addProduct(e.target);
            }
        });
    }
}

class ProductItem extends Item {}


class Basket extends List {
    constructor(container = ".cart__inner", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateBasket(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        }
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert("Error!");
                }
            });
    }
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateBasket(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart__item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            });
    }

    _updateBasket(product) {
        let block = document.querySelector(`.cart__item[data-id="${product.id_product}"]`);
        block.querySelector('.cart__item-count').textContent = `${product.quantity}`;
        block.querySelector('.cart__item-price').textContent = `${product.price}$`;
        block.querySelector('.cart__item-allprice').textContent = `$${product.quantity*product.price}`;
    }

    _init() {
        document.querySelector('.cart-btn').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('cart__item-delete')) {
                this.removeProduct(e.target);
            }
        });
    }

}
class BasketItem extends Item {
    constructor(el, img = 'https://via.placeholder.com/60x100') {
        super(el, img);
        this.quantity = el.quantity;
    }
    render() {
        return `<div class="cart__item" data-id="${this.id_product}">
            <div class="cart__img">
                <img src="${this.img}" alt="Женская футболка">
            </div>
            <div class="cart__item-info">
                <p class="cart__item-title">${this.product_name}</p>
                <div class="cart__item-details">
                    <div class="cart__item-count">${this.quantity}</div>
                    <span>x</span>
                    <div class="cart__item-price">${this.price}$</div>
                </div>
                <div class="cart__item-allprice">$${this.quantity*this.price}</div>
            </div>
            <button class="cart__item-delete" data-id="${this.id_product}">
                <span class="visually-hidden">Удалить товар</span>
            </button>
    </div>`
    }

}

const list2 = {
    ProductList: ProductItem,
    Basket: BasketItem
}

let basket = new Basket();
let products = new ProductList(basket);