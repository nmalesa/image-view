const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/images', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB:', err));

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Connection error: '));
connection.once('open', function() {
  connection.db.collection('products', (err, collection) => {
    collection.findOne({ name:'Licensed Rubber Gloves', primaryImage: 'http://lorempixel.com/640/480/city', videoEmbed: 'https://www.youtube.com/watch?v=f3tth4lps5d', description: 'Expanded local solution', thumbnails:['http://lorempixel.com/640/480/cats', 'http://lorempixel.com/640/480/sports', 'http://lorempixel.com/640/480/people', null, null] }, (err, data) => {
      console.log(data);
    });
  });
});
