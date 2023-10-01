const supabase = require('../config/supabase_config');
const ProductBody = require("../models/body/product_body");
const Product = require("../models/product");

class ProductController {
    async getAllProducts(req, res) {
        try {
            const {data, error} = await supabase.from('product').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve products.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getProductById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('product')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the product.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Product not found.'});
            }

            const product = new Product(data[0])

            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async createProduct(req, res) {
        try {
            const newProduct = new ProductBody(req.body);

            const {data, error} = await supabase
                .from('product')
                .insert([newProduct]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot create product.'});
            }

            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateProduct(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('product')
                .update([req.body])
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot update product.'});
            }

            res.status(200).json({message: 'Product updated.'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteProduct(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('product').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the product.'});
            }

            res.json({message: `Product ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = ProductController;