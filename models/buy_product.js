class BuyProduct {
    constructor(data) {
        this.cart_id = data.cart_id;
        this.product_id = data.product_id;
        this.quantity = data.quantity;
        this.created_at = data.created_at;
    }
}

module.exports = BuyProduct;