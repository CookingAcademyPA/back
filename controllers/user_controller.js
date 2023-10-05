const supabase = require('../config/supabase_config');
const User = require("../models/user");
const UserBody = require("../models/body/user_body");
const bcrypt = require("bcrypt");
const Cart = require("../models/cart");
const BuyMealBody = require("../models/body/buy_meal_body");

class UserController {
    async getAllUsers(req, res) {
        try {
            const {data, error} = await supabase.from('user').select('*').eq('is_admin', false);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve users.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getUserById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('user')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the user.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'User not found.'});
            }

            const user = new User(data[0])

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateUserInfo(req, res) {
        try {
            const reqBodyKeys = Object.keys(req.body);
            if (!reqBodyKeys.includes("password") && !reqBodyKeys.includes("is_admin")) {
                const {id} = req.params;
                const {data, error} = await supabase
                    .from('user')
                    .update(req.body)
                    .eq('id', id);

                if (error) {
                    console.log(error);
                    return res.status(500).json({error: 'Error: cannot update user.'});
                }
                return res.status(200).json({message: 'User updated.'});
            } else {
                return res.status(500).json({error: 'Error: cannot update user password and admin fields with this request.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateUserPassword(req, res) {
        try {
            const reqBodyKeys = Object.keys(req.body);
            if (reqBodyKeys.includes("password") && reqBodyKeys.length === 1) {
                const {id} = req.params;
                const password = req.body.password;
                const hashedPassword = await bcrypt.hash(password, 10);
                const {data, error} = await supabase
                    .from('user')
                    .update({password: hashedPassword})
                    .eq('id', id);

                if (error) {
                    return res.status(500).json({error: 'Error: cannot update user.'});
                }

                return res.status(200).json({message: 'User password updated.'});
            } else {
                return res.status(500).json({error: 'Error: can only update password with this request.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteUser(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('user').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the user.'});
            }

            res.json({message: `User ${id} successfully deleted.`});

        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getUserCarts(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('cart')
                .select('*')
                .eq('user_id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the carts.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Carts not found.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getUserCurrentCart(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('cart')
                .select('*')
                .eq('user_id', id)
                .eq('state', 'PENDING');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the cart.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Cart not found.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = UserController;