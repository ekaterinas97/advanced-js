"use strict";
class ProductList {
    constructor(container = '.products__inner') {
        this.container = container;
        this.products = [];
        this._fetchProducts();
        this.render(); //вывод товаров на страницу
    }
    _fetchProducts() {
        this.products = [{
                id: 1,
                title: "Product 1",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi",
                image: 'images/product-1.jpg',
                price: 200
            },
            {
                id: 2,
                title: "Product 2",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi",
                image: 'images/product-2.jpg',
                price: 300
            },
            {
                id: 3,
                title: "Product 3",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi",
                image: 'images/product-3.jpg',
                price: 350
            },
            {
                id: 4,
                title: "Product 4",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi",
                image: 'images/product-4.jpg',
                price: 350
            },
            {
                id: 5,
                title: "Product 5",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi",
                image: 'images/product-5.jpg',
                price: 450
            },
            {
                id: 6,
                title: "Product 6",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi",
                image: 'images/product-6.jpg',
                price: 550
            },
        ]
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("afterbegin", item.render());
        }
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
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
    }
    render() {
        return `<div class="products__item">
                <a href="product.html" class="products__link">  
                    <img src="${this.image}" alt="" class="products__img">
                    <div class="products__info">
                        <h3 class="products__heading">${this.title}</h3>
                        <div class="products__descr">${this.description}</div>
                        <div class="products__price">${this.price}$</div>
                    </div>
                </a>
                <div class="add-to-cart">
                    <a href="#" class="add-btn">Add to Cart</a>
                </div>
            </div>`
    }

}

const list = new ProductList();
list.sumProducts();