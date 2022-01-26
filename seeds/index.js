const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];
const seedDB = async() => {
    await Campground.deleteMany({});
   for (let i= 0 ; i<  100; i++){
       const random1000 = Math.floor(Math.random() * 1000);
       const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground({
           author : "6015520857451d0654144e04",
           location: `${cities[random1000].city}, ${cities[random1000].state}`,
           title : `${sample(descriptors)} ${sample(places)}`,
           description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem itaque iusto architecto sequi eaque tempore impedit odio fugiat non earum! Necessitatibus nemo eligendi laborum repellendus hic incidunt temporibus eveniet repellat.',
           price : price,
           images :  [
            {              
              url: 'https://res.cloudinary.com/kk9tuu7nfm/image/upload/v1612168546/YelpCamp/rv3hm8nab3rf4hfamvs1.jpg',
              filename: 'YelpCamp/rv3hm8nab3rf4hfamvs1'
            },
            {              
              url: 'https://res.cloudinary.com/kk9tuu7nfm/image/upload/v1612168546/YelpCamp/a33qgh0ph8akgq4dkuqr.jpg',
              filename: 'YelpCamp/a33qgh0ph8akgq4dkuqr'
            },
            {              
              url: 'https://res.cloudinary.com/kk9tuu7nfm/image/upload/v1612168546/YelpCamp/rbepxfsnwi3stlkdsc1e.jpg',
              filename: 'YelpCamp/rbepxfsnwi3stlkdsc1e'
            }
          ]
       })
       await camp.save();
   }
}
seedDB().then(() => {
    mongoose.connection.close();
})