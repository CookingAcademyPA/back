class SubscriptionHistory {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.subscription_id = data.subscription_id;
        this.subscription_date = data.subscription_date;
        this.status = data.status;
        this.created_at = data.created_at;
    }
}

module.exports = SubscriptionHistory;