"use strict";

const products = [{
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
];
const renderProductItem = (product) => {
    return `<div class="products__item">
                <a href="product.html" class="products__link">  
                    <img src="${product.image}" alt="" class="products__img">
                    <div class="products__info">
                        <h3 class="products__heading">${product.title}</h3>
                        <div class="products__descr">${product.description}</div>
                        <div class="products__price">${product.price}$</div>
                    </div>
                </a>
                <div class="add-to-cart">
                    <a href="#" class="add-btn">Add to Cart</a>
                </div>
            </div>`;
};

const renderProductsList = (list) => {
    let productsList = list.map(product => renderProductItem(product));
    document.querySelector('.products__inner').innerHTML = productsList.join(" ");
}

renderProductsList(products);