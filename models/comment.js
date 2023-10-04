class Comment {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.service_id = data.service_id;
        this.content = data.content;
        this.created_at = data.created_at;
    }
}

module.exports = Comment;