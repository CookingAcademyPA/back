class BuyProductBody {
    constructor(data) {
        this.cart_id = data.cart_id;
        this.product_id = data.product_id;
        this.quantity = data.quantity;
    }
}

module.exports = BuyProductBody;