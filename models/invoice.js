class Invoice {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.cart_id = data.cart_id;
        this.created_at = data.created_at;
    }
}

module.exports = Invoice;