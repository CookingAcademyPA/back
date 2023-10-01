class SubscriptionBody {
    constructor(data) {
        this.name = data.name;
        this.monthly_price = data.monthly_price;
        this.yearly_price = data.yearly_price;
    }
}

module.exports = SubscriptionBody;