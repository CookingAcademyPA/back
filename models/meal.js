class Meal {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.image = data.image;
        this.created_at = data.created_at;
    }
}

module.exports = Meal;