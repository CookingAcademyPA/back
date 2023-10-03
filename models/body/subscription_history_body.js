class SubscriptionHistoryBody {
    constructor(data) {
        this.user_id = data.user_id;
        this.subscription_id = data.subscription_id;
        this.subscription_date = data.subscription_date;
        this.status = data.status;
    }
}

module.exports = SubscriptionHistoryBody;