const supabase = require('../config/supabase_config');
const ServiceBody = require("../models/body/service_body");
const Service = require("../models/service");

class ServiceController {
    async getAllServices(req, res) {
        try {
            const {data, error} = await supabase.from('service').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve services.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getServiceByType(req, res) {
        try {
            const type = req.params.type;
            const {data, error} = await supabase
                .from('service')
                .select('*')
                .eq('type', type);

            if (error) {
                return res.status(500).json({error: `Error: cannot retrieve ${type} services.`});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getServiceById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('service')
                .select('*')
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the service.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Service not found.'});
            }

            const service = new Service(data[0])

            res.json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async createService(req, res) {
        try {
            const newService = new ServiceBody(req.body);

            const {data, error} = await supabase
                .from('service')
                .insert([newService]);

            if (error) {
                if (error.code === '23514') {
                    return res.status(400).json({error: 'Error: invalid service type.'});
                }
                return res.status(500).json({error: 'Error: cannot create service.'});
            }

            res.status(201).json(newService);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateService(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('service')
                .update([req.body])
                .eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot update service.'});
            }

            res.status(200).json({message: `Service ${id} updated.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteService(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('service').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the service.'});
            }

            res.json({message: `Service ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getReservationsByServiceId(req, res) {
        try {
            const service_id = req.params.id;
            const { data: cartIds, error } = await supabase
                .from('buy_service')
                .select('cart_id')
                .eq('service_id', service_id);

            if (error) {
                return res.status(500).json({ error: 'Cannot retrieve users ids' });
            }

            const userIds = [];

            for (const entry of cartIds) {
                const { data: cartData, error: cartError } = await supabase
                    .from('cart')
                    .select('user_id')
                    .eq('id', entry.cart_id)
                    .single();

                if (cartData) {
                    userIds.push(cartData.user_id);
                } else {
                    console.error('Error:', cartError);
                }
            }

            res.status(200).json(userIds);
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    }
}

module.exports = ServiceController;