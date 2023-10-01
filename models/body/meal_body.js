class MealBody {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.image = data.image;
    }
}

module.exports = MealBody;