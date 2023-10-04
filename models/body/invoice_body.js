class InvoiceBody {
    constructor(data) {
        this.user_id = data.user_id;
        this.cart_id = data.cart_id;
    }
}

module.exports = InvoiceBody;