const bcrypt = require('bcrypt');
const supabase = require('../config/supabase_config');
const User = require("../models/user");
const JWTUtils = require('../middlewares/jwt_utils');
const UserBody = require("../models/body/user_body");

class AuthController {
    async signup(req, res) {
        try {
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserBody(req.body);
            newUser.password = hashedPassword;
            console.log(newUser);

            const {data: data, error} = await supabase.from('user').upsert([newUser]);

            if (error) {
                console.log(error);
                if (error.code === '23505') {
                    return res.status(400).json({ error: 'Email already exists.'});
                }
                return res.status(500).json({ error: 'Error: cannot create user.' });
            }

            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const { data: data, error } = await supabase
                .from('user')
                .select('*')
                .eq('email', email)
                .single();

            if (error) {
                return res.status(500).json({ error: 'Error: cannot retrieve the user.' });
            }

            if (data.length === 0) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const passwordMatch = await bcrypt.compare(password, data.password);

            if (passwordMatch) {
                console.log('Authentication success.' );
                const tokenSecret = process.env.JWT_SECRET;
                const jwtPayload = { userId: data.id, isAdmin: data.is_admin };
                const token = JWTUtils.generateJWT(jwtPayload, tokenSecret);

                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async logout(req, res) {
        try {
            delete req.headers.authorization;

            res.status(200).json({ message: 'Signed out.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }
}

module.exports = AuthController;
