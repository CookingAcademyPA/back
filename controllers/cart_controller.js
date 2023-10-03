const supabase = require('../config/supabase_config');
const CartBody = require("../models/body/cart_body");
const Cart = require("../models/cart");

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
}

module.exports = CartController;