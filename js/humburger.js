"use strict";

class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Hamburger {
    constructor(size, stuffing, toppings) {
        this.size = new Param(this._select(size));
        this.stuffing = new Param(this._select(stuffing));
        this.topings = this._getTopings(toppings);
    }
    _select(name) {
        return document.querySelector(`input[name=${name}]:checked`);
    }
    _selectAll(name) {
        return document.querySelectorAll(`input[name=${name}]:checked`);
    }
    _getTopings(name) {
        let result = [];
        this._selectAll(name).forEach(el => {
            let obj = new Param(el);
            result.push(obj);
        });
        return result;
    }
    _sumPrice() {
        let result = this.size.price + this.stuffing.price;
        this.topings.forEach(el => {
            result += el.price;
        });
        return result;
    }
    _sumCalories() {
        let result = this.size.calories + this.stuffing.calories;
        this.topings.forEach(el => result += el.calories);
        return result;
    }
    showSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }

}