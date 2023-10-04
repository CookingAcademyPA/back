const supabase = require('../config/supabase_config');
const InvoiceBody = require("../models/body/invoice_body");
const Invoice = require("../models/invoice");

class InvoiceController {
    async getAllInvoices(req, res) {
        try {
            const {data, error} = await supabase.from('invoice').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve invoices.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getAllInvoicesByUserId(req, res) {
        try {
            const {user_id} = req.params;
            const {data, error} = await supabase
                .from('invoice')
                .select('*')
                .eq('user_id', user_id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve invoices.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getInvoiceByCartId(req, res) {
        try {
            const {cart_id} = req.params;
            const {data, error} = await supabase
                .from('invoice')
                .select('*')
                .eq('cart_id', cart_id)
                .single();

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve invoices.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Invoice not found.'});
            }

            const invoice = new Invoice(data[0])

            res.json(invoice);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }


    async getInvoiceById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('invoice')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the invoice.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Invoice not found.'});
            }

            const invoice = new Invoice(data[0])

            res.json(invoice);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async createInvoice(req, res) {
        try {
            const newInvoice = new InvoiceBody(req.body);

            const {data, error} = await supabase
                .from('invoice')
                .insert([newInvoice]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot create invoice.'});
            }

            res.status(201).json(newInvoice);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateInvoice(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('invoice')
                .update([req.body])
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot update invoice.'});
            }

            res.status(200).json({message: `Invoice ${id} updated.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteInvoice(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('invoice').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the invoice.'});
            }

            res.json({message: `Invoice ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = InvoiceController;