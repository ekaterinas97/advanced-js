"use strict";

const app = new Vue({
    el: '.app',
    data: {
        searchValue: '',
    },
    components: { products, cart, 'filter-products': filterProducts },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });

        },
        delJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(result => result.json())
                .catch(error => {
                    console.log(error);
                });

        }
    }
    //     addProduct(item) {
    //         this.getJson(`${API}/addToBasket.json`)
    //             .then(data => {
    //                 if (data.result === 1) {
    //                     let find = this.cartItems.find(el => el.id_product === item.id_product);
    //                     if (find) {
    //                         find.quantity++;
    //                     } else {
    //                         const prod = Object.assign({ quantity: 1 }, item);
    //                         this.cartItems.push(prod);
    //                     }
    //                 }
    //             });
    //     },
    //     removeProduct(item) {
    //         this.getJson(`${API}/addToBasket.json`)
    //             .then(data => {
    //                 if (data.result === 1) {
    //                     if (item.quantity > 1) {
    //                         item.quantity--;
    //                     } else {
    //                         this.cartItems.splice(this.cartItems.indexOf(item), 1);
    //                     }
    //                 }
    //             })

    //     },
    //     filterProducts() {
    //         let regexp = new RegExp(this.searchValue, 'i');
    //         this.filtered = this.products.filter(el => regexp.test(el.product_name));

    //     }
    // },
    // mounted() {
    //     this.getJson(`${API + this.cartUrl}`)
    //         .then(data => {
    //             for (let item of data.contents) {
    //                 this.cartItems.push(item);
    //             }
    //         });
    //     this.getJson(`${API + this.catalogUrl}`)
    //         .then(data => {
    //             for (let item of data) {
    //                 this.products.push(item);
    //                 this.filtered.push(item);
    //             }
    //         });
    // }
});