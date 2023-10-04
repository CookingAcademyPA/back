class CommentBody {
    constructor(data) {
        this.user_id = data.user_id;
        this.service_id = data.service_id;
        this.content = data.content;
    }
}

module.exports = CommentBody;