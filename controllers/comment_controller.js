const supabase = require('../config/supabase_config');
const CommentBody = require("../models/body/comment_body");
const Comment = require("../models/comment");

class CommentController {
    async getAllComments(req, res) {
        try {
            const {data, error} = await supabase.from('comment').select('*');

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve comments.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getAllCommentsByUserId(req, res) {
        try {
            const {user_id} = req.params;
            const {data, error} = await supabase
                .from('comment')
                .select('*')
                .eq('user_id', user_id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve comments.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getAllCommentsByServiceId(req, res) {
        try {
            const {service_id} = req.params;
            const {data, error} = await supabase
                .from('comment')
                .select('*')
                .eq('service_id', service_id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve comments.'});
            }

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async getCommentById(req, res) {
        try {
            const {id} = req.params;

            const {data, error} = await supabase
                .from('comment')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                return res.status(500).json({error: 'Error: cannot retrieve the comment.'});
            }

            if (data.length === 0) {
                return res.status(404).json({error: 'Comment not found.'});
            }

            const comment = new Comment(data[0])

            res.json(comment);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async createComment(req, res) {
        try {
            const newComment = new CommentBody(req.body);

            const {data, error} = await supabase
                .from('comment')
                .insert([newComment]);

            if (error) {
                return res.status(500).json({error: 'Error: cannot create comment.'});
            }

            res.status(201).json(newComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async updateComment(req, res) {
        try {
            const {id} = req.params;
            if (Object.keys(req.body).includes('content')) {
                const {data, error} = await supabase
                    .from('comment')
                    .update([req.body])
                    .eq('id', id);

                if (error) {
                    return res.status(500).json({error: 'Error: cannot update comment.'});
                }

                res.status(200).json({message: `Comment ${id} updated.`});
            } else {
                res.status(400).json({error: 'Bad request: content is required.'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }

    async deleteComment(req, res) {
        try {
            const {id} = req.params;

            const {error} = await supabase.from('comment').delete().eq('id', id);

            if (error) {
                return res.status(500).json({error: 'Error: cannot delete the comment.'});
            }

            res.json({message: `Comment ${id} successfully deleted.`});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error server.'});
        }
    }
}

module.exports = CommentController;