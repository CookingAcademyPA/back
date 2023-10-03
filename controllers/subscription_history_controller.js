const supabase = require('../config/supabase_config');
const SubscriptionHistoryBody = require("../models/body/subscription_history_body");
const SubscriptionHistory = require("../models/subscription_history");

class SubscriptionHistoryController {
    async getAllSubscriptionsHistory(req, res) {
        try {
            const {data, error} = await supabase.from('subscription_history').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve subscriptions history.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getSubscriptionHistoryById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('subscription_history')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the subscription history.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Subscription history not found.'});
            }

            const subscription = new SubscriptionHistory(data[0])

            res.json(subscription);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getSubscriptionHistoryBySubscriptionId(req, res) {
        try {
            const {subscription_id} = req.params;

            const {data, error} = await supabase
                .from('subscription_history')
                .select('*')
                .eq('subscription_id', subscription_id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the subscription history.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Subscription history not found.'});
            }

            const subscription = new SubscriptionHistory(data[0])

            res.json(subscription);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getSubscriptionHistoryByUserId(req, res) {
        try {
            const {user_id} = req.params;

            const {data, error} = await supabase
                .from('subscription_history')
                .select('*')
                .eq('user_id', user_id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the subscription history.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Subscription history not found.'});
            }

            const subscription = new SubscriptionHistory(data[0])

            res.json(subscription);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async saveSubscriptionHistory(req, res) {
        try {
            const newSubscription = new SubscriptionHistoryBody(req.body);

            const {data, error} = await supabase
                .from('subscription_history')
                .insert([newSubscription]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot save subscription.'});
            }

            res.status(201).json(newSubscription);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateSubscriptionHistory(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('subscription_history')
                .update([req.body])
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot update subscription history.'});
            }

            res.status(200).json({message: `Subscription history ${id} updated.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteSubscriptionHistory(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('subscription_history').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the subscription history.'});
            }

            res.json({message: `Subscription history ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = SubscriptionHistoryController;