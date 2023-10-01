const supabase = require('../config/supabase_config');
const RecipeBody = require("../models/body/recipe_body");
const Recipe = require("../models/recipe");

class RecipeController {
    async getAllRecipes(req, res) {
        try {
            const {data, error} = await supabase.from('recipe').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve recipes.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getRecipeById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('recipe')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the recipe.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Recipe not found.'});
            }

            const recipe = new Recipe(data[0])

            res.json(recipe);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async createRecipe(req, res) {
        try {
            const newRecipe = new RecipeBody(req.body);

            const {data, error} = await supabase
                .from('recipe')
                .insert([newRecipe]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot create recipe.'});
            }

            res.status(201).json(newRecipe);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateRecipe(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('recipe')
                .update([req.body])
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot update recipe.'});
            }

            res.status(200).json({message: 'Recipe updated.'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteRecipe(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('recipe').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the recipe.'});
            }

            res.json({message: `Recipe ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = RecipeController;