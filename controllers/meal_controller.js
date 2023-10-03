const supabase = require('../config/supabase_config');
const MealBody = require("../models/body/meal_body");
const Meal = require("../models/meal");

class MealController {
    async getAllMeals(req, res) {
        try {
            const {data, error} = await supabase.from('meal').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve meals.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getMealById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('meal')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the meal.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Meal not found.'});
            }

            const meal = new Meal(data[0])

            res.json(meal);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async createMeal(req, res) {
        try {
            const newMeal = new MealBody(req.body);

            const {data, error} = await supabase
                .from('meal')
                .insert([newMeal]);

            if (error) {
                if (error.code === '23505') {
                    return res.status(400).json({error: 'Error: meal already exists.'});
                }
                return res.status(500).json({error: 'Error: cannot create meal.'});
            }

            res.status(201).json(newMeal);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateMeal(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('meal')
                .update([req.body])
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot update meal.'});
            }

            res.status(200).json({message: 'Meal updated.'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteMeal(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('meal').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the meal.'});
            }

            res.json({message: `Meal ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = MealController;