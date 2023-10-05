class BuyService {
    constructor(data) {
        this.cart_id = data.cart_id;
        this.service_id = data.service_id;
        this.quantity = data.quantity;
        this.created_at = data.created_at;
    }
}

module.exports = BuyService;