
   class Hotel {
    constructor(id,
        name,
        stars,
        price,
        image,
        amenities) {
        // always initialize all instance properties
        this.id = id;
        this.name = name;
        this.stars = stars;
        this.price = price;
        this.image = image;
        this.amenities = amenities;
    }
}

module.exports = Hotel;