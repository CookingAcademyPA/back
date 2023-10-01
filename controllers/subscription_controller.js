const supabase = require('../config/supabase_config');
const User = require("../models/user");
const SubscriptionBody = require("../models/subscription_body");
const Subscription = require("../models/subscription");

class SubscriptionController {
    async getAllSubscriptions(req, res) {
        try {
            const { data, error } = await supabase.from('subscription').select('*');

            if (error) {
                return res.status(500).json({ error: 'Error: cannot retrieve subscriptions.' });
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async getSubscriptionById(req, res) {
        try {
            const { id } = req.params;

            const { data, error } = await supabase
                .from('subscription')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({ error: 'Error: cannot retrieve the subscription.' });
            }

            if (data.length === 0) {
                return res.status(404).json({ error: 'Subscription not found.' });
            }

            const subscription = new Subscription(data[0])

            res.json(subscription);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async createSubscription(req, res) {
        try {
            const newSubscription = new SubscriptionBody(req.body);

            const { data, error } = await supabase
                .from('subscription')
                .insert([newSubscription]);

            if (error) {
                return res.status(500).json({ error: 'Error: cannot create subscription.' });
            }

            res.status(201).json(data[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async updateSubscription(req, res) {
        try {
            const { id } = req.params;

            const { data, error } = await supabase
                .from('subscription')
                .update([req.body])
                .eq('id', id);

            if (error) {
                return res.status(500).json({ error: 'Error: cannot update subscription.' });
            }

            res.status(200).json({message: 'Subscription updated.'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async deleteSubscription(req, res) {
        try {
            if (req.isAdmin === true) {
                const {id} = req.params;

                const {error} = await supabase.from('subscription').delete().eq('id', id);

                if (error) {
                    return res.status(500).json({error: 'Error: cannot delete the subscription.'});
                }

                res.json({message: `Subscription ${id} successfully deleted.`});
            } else {
                res.status(403).json({error: 'You are not authorized to perform this action.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }
}

module.exports = SubscriptionController;