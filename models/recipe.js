class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.created_at = data.created_at;
    }
}

module.exports = Recipe;