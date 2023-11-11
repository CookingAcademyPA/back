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
                if (error.code === '23505') {
                    return res.status(400).json({error: 'Error: meal already bought.'});
                }
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
                if (error.code === '23505') {
                    return res.status(400).json({error: 'Error: product already bought.'});
                }
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
                if (error.code === '23505') {
                    return res.status(400).json({error: 'Error: service already bought.'});
                }
                return res.status(500).json({error: 'Error: cannot add service.'});
            }

            res.status(201).json(newService);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }


}

module.exports = BuyController;