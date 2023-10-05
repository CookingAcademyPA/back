class BuyMealBody {
    constructor(data) {
        this.cart_id = data.cart_id;
        this.meal_id = data.meal_id;
        this.quantity = data.quantity;
    }
}

module.exports = BuyMealBody;