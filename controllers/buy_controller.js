const supabase = require('../config/supabase_config');
const BuyMealBody = require("../models/body/buy_meal_body");
const BuyProductBody = require("../models/body/buy_product_body");
const BuyServiceBody = require("../models/body/buy_service_body");
const BuyMeal = require("../models/buy_meal");
const BuyProduct = require("../models/buy_product");
const BuyService = require("../models/buy_service");

class BuyController {
    async getAllBuyMeal(req, res) {
        try {
            const {data, error} = await supabase.from('buy_meal').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve buy_meal.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getAllBuyProduct(req, res) {
        try {
            const {data, error} = await supabase.from('buy_product').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve buy_product.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getAllBuyService(req, res) {
        try {
            const {data, error} = await supabase.from('buy_service').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve buy_service.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async buyMeal(req, res) {
        try {
            const newMeal = new BuyMealBody(req.body);

            const {data, error} = await supabase
                .from('buy_meal')
                .insert([newMeal]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot add meal.'});
            }

            res.status(201).json(newMeal);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async buyProduct(req, res) {
        try {
            const newProduct = new BuyProductBody(req.body);

            const {data, error} = await supabase
                .from('buy_product')
                .insert([newProduct]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot add product.'});
            }

            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async buyService(req, res) {
        try {
            const newService = new BuyServiceBody(req.body);

            const {data, error} = await supabase
                .from('buy_service')
                .insert([newService]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot add service.'});
            }

            res.status(201).json(newService);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateBuyMeal(req, res) {
        try {
            const {id} = req.params;
            if (Object.keys(req.body).includes("quantity")) {
                const quantity = req.body.quantity;
                const {data, error} = await supabase
                    .from('buy_meal')
                    .update({'quantity': quantity})
                    .eq('id', id);
                if (error) {
                    return res.status(500).json({ error: 'Error: cannot update quantity.' });
                }
                return res.status(201).json({message: `Buy_meal ${id} successfully updated to quantity=${quantity}.`});
            } else {
                return res.status(400).json({error: 'Bad request: quantity is required.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateBuyProduct(req, res) {
        try {
            const {id} = req.params;
            if (Object.keys(req.body).includes("quantity")) {
                const quantity = req.body.quantity;
                const {data, error} = await supabase
                    .from('buy_product')
                    .update({'quantity': quantity})
                    .eq('id', id);
                if (error) {
                    return res.status(500).json({ error: 'Error: cannot update quantity.' });
                }
                return res.status(201).json({message: `Buy_product ${id} successfully updated to quantity=${quantity}.`});
            } else {
                return res.status(400).json({error: 'Bad request: quantity is required.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateBuyService(req, res) {
        try {
            const {id} = req.params;
            if (Object.keys(req.body).includes("quantity")) {
                const quantity = req.body.quantity;
                const {data, error} = await supabase
                    .from('buy_service')
                    .update({'quantity': quantity})
                    .eq('id', id);
                if (error) {
                    return res.status(500).json({ error: 'Error: cannot update quantity.' });
                }
                return res.status(201).json({message: `Buy_service ${id} successfully updated to quantity=${quantity}.`});
            } else {
                return res.status(400).json({error: 'Bad request: quantity is required.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteBuyMeal(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('buy_meal').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the buy_meal.'});
            }

            res.json({message: `Buy_meal ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteBuyProduct(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('buy_product').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the buy_product.'});
            }

            res.json({message: `Buy_product ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteBuyService(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('buy_service').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the buy_service.'});
            }

            res.json({message: `Buy_service ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = BuyController;