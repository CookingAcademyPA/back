class ServiceBody {
    constructor(data) {
        this.type = data.type;
        this.price = data.price;
        this.title = data.title;
        this.description = data.description;
        this.number_of_person = data.number_of_person;
        this.place = data.place;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.organizer = data.organizer;
    }
}

module.exports = ServiceBody;