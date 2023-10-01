class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.created_at = data.created_at;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.birthday_date = data.birthday_date;
        this.street = data.street;
        this.postal_code = data.postal_code;
        this.city = data.city;
        this.country = data.country;
        this.subscription_id = data.subscription_id;
        this.is_admin = data.is_admin;
    }
}

module.exports = User;
