class BuyMeal {
    constructor(data) {
        this.cart_id = data.cart_id;
        this.meal_id = data.meal_id;
        this.quantity = data.quantity;
        this.created_at = data.created_at;
    }
}

module.exports = BuyMeal;