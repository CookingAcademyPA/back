class Cart {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.created_at = data.created_at;
        this.state = data.state;
    }
}

module.exports = Cart;