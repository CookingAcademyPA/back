const supabase = require('../config/supabase_config');
const User = require("../models/user");

class UserController {
    async getAllUsers(req, res) {
        try {
            const { data, error } = await supabase.from('user').select('*').eq('is_admin', false);

            if (error) {
                return res.status(500).json({ error: 'Error: cannot retrieve users.' });
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;

            const { data, error } = await supabase
                .from('user')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({ error: 'Error: cannot retrieve the user.' });
            }

            if (data.length === 0) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const user = new User(data[0])

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;

            const updatedUser = new User( { id, ...req.body } );

            // Mettre à jour une tâche dans la base de données
            const { data, error } = await supabase
                .from('user')
                .upsert([updatedUser]);

            if (error) {
                return res.status(500).json({ error: 'Error: cannot update user.' });
            }

            res.json(data[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }

    async deleteUser(req, res) {
        try {
            if (req.isAdmin === true) {
                const {id} = req.params;

                const {error} = await supabase.from('user').delete().eq('id', id);

                if (error) {
                    return res.status(500).json({error: 'Error: cannot delete the user.'});
                }

                res.json({message: `User ${id} successfully deleted.`});
            } else {
                res.status(403).json({error: 'You are not authorized to perform this action.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error server.' });
        }
    }
}

module.exports = UserController;