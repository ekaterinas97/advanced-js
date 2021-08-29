"use strict";
const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
class ProductList {
    constructor(container = '.products__inner') {
        this.container = container;
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products = data;
                this.render(); //вывод товаров на страницу
                this.sumProducts();
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            });
    }
    sumProducts() {
        let totalSum = 0;
        for (let i = 0; i < this.products.length; i++) {
            totalSum += this.products[i].price;
        }
        document.querySelector('.totalSum').insertAdjacentHTML("afterbegin", totalSum);
    }
}
class ProductItem {
    constructor(product, image = "images/product-1.jpg") {
        this.product_id = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.image = image;
    }
    render() {
        return `<div class="products__item">
                <a href="product.html" class="products__link">  
                    <img src="${this.image}" alt="" class="products__img">
                    <div class="products__info">
                        <h3 class="products__heading">${this.product_name}</h3>
                        <div class="products__descr"></div>
                        <div class="products__price">${this.price}$</div>
                    </div>
                </a>
                <div class="add-to-cart">
                    <a href="#" class="add-btn">Add to Cart</a>
                </div>
            </div>`
    }

}
class Basket {
    constructor(container = ".cart__inner") {
        this.container = container;
        this.products = [];
        this._clickBasket();
        this._getBasketItem()
            .then(data => {
                this.products = data.contents;
                this.render();
            });
    }

    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const productObj = new BasketItem();
            block.insertAdjacentHTML("beforeend", productObj.render(product));

        }
    }


    _clickBasket() {
        document.querySelector('.cart-btn').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}
class BasketItem {
    render(product, img = "images/cart-1.jpg") {
        return `<div class="cart__item" data-id="${product['id_product']}">
        <a href="#" class="cart__link">
            <div class="cart__img">
                <img src="${img}" alt="Женская футболка">
            </div>
            <div class="cart__item-info">
                <p class="cart__item-title">${product.product_name}</p>
                <div class="cart__item-details">
                    <div class="cart__item-count">${product.quantity}</div>
                    <span>x</span>
                    <div class="cart__item-price">$${product.price}</div>
                </div>
            </div>
            <button class="cart__item-delete">
                <i class="fas fa-times-circle"></i>
                <span class="visually-hidden">Удалить товар</span>
            </button>
        </a>
    </div>`
    }
}

const list = new ProductList();
const basket = new Basket();
list.sumProducts();