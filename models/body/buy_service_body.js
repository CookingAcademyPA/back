class BuyServiceBody {
    constructor(data) {
        this.cart_id = data.cart_id;
        this.service_id = data.service_id;
        this.quantity = data.quantity;
    }
}

module.exports = BuyServiceBody;