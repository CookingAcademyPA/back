class Subscription {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.monthly_price = data.monthly_price;
        this.yearly_price = data.yearly_price;
        this.created_at = data.created_at;
    }
}

module.exports = Subscription;