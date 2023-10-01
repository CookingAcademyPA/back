class RecipeBody {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
    }
}

module.exports = RecipeBody;