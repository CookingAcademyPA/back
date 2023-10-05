const supabase = require('../config/supabase_config');
const CartBody = require("../models/body/cart_body");
const Cart = require("../models/cart");
const BuyMealBody = require("../models/body/buy_meal_body");
const BuyProductBody = require("../models/body/buy_product_body");
const BuyServiceBody = require("../models/body/buy_service_body");

class CartController {
    async getAllCarts(req, res) {
        try {
            const {data, error} = await supabase.from('cart').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve carts.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getCartById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('cart')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the cart.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Cart not found.'});
            }

            const cart = new Cart(data[0])

            res.json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async createCart(req, res) {
        try {
            const newCart = new CartBody({user_id: req.userId, state: 'PENDING'});

            const {data, error} = await supabase
                .from('cart')
                .insert([newCart]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot create cart.'});
            }

            res.status(201).json(newCart);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateCartState(req, res) {
        try {
            const {id} = req.params;
            if (Object.keys(req.body).includes("state")) {
                const newState = req.body.state;
                const { data: existingData, error: existingError } = await supabase
                    .from('cart')
                    .select('state')
                    .eq('id', id)
                    .single();

                if (existingError) {
                    return res.status(500).json({error: 'Error: cannot update the cart.'});
                }

                const currentState = existingData.state;
                if (newState !== currentState) {
                    const {data, error} = await supabase
                        .from('cart')
                        .update({'state': newState})
                        .eq('id', id);
                    if (error) {
                        if (error.code === '23514') {
                            return res.status(400).json({error: 'Error: state must be PENDING, VALIDATED, PAID or CANCELLED.'});
                        }
                        return res.status(500).json({ error: 'Error: cannot update state.' });
                    }
                    return res.status(201).json({message: `Cart ${id} successfully updated to ${newState}.`});
                }
                return res.status(400).json({error: 'Bad request: state is the same.'});
            } else {
                return res.status(400).json({error: 'Bad request: state is required.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteCart(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('cart').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the cart.'});
            }

            res.json({message: `Cart ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getBuyMealByCartId(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('buy_meal')
                .select('*')
                .eq('cart_id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the buy_meal.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getBuyProductByCartId(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('buy_product')
                .select('*')
                .eq('cart_id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the buy_product.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getBuyServiceByCartId(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('buy_service')
                .select('*')
                .eq('cart_id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the buy_service.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async addBuyMealToCart(req, res) {
        try {
            const { cart_id } = req.params.cart_id;
            const newMeal = new BuyMealBody({ 'cart_id': cart_id, 'meal_id': req.body.meal_id, 'quantity': req.body.quantity });

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

    async addBuyProductToCart(req, res) {
        try {
            const { cart_id } = req.params.cart_id;
            const newProduct = new BuyProductBody({ 'cart_id': cart_id, 'product_id': req.body.product_id, 'quantity': req.body.quantity });

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

    async addBuyServiceToCart(req, res) {
        try {
            const { cart_id } = req.params.cart_id;
            const newService = new BuyServiceBody({ 'cart_id': cart_id, 'service_id': req.body.service_id, 'quantity': req.body.quantity });

            const {data, error} = await supabase
                .from('buy_meal')
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
}

module.exports = CartController;