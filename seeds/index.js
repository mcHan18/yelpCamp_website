const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCampDB', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64b00a02f6ae825a77b1e438',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzpongmvi/image/upload/v1689413243/YelpCamp/seattle-washington-SEATTLETG0221-43c8ef3221db4e5da6806af7d9d481e8_l3u4hu.jpg',
                    filename: 'seattle-washington-SEATTLETG0221-43c8ef3221db4e5da6806af7d9d481e8_l3u4hu'
                },
                {
                    url: 'https://res.cloudinary.com/dzpongmvi/image/upload/v1689413091/YelpCamp/BellevueWashington-7be0f9262caf441bb79c8787e9b9ceaf_wv9vsx.jpg',
                    filename: 'BellevueWashington-7be0f9262caf441bb79c8787e9b9ceaf_wv9vsx'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})