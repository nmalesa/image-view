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
    collection.findOne({ _id: '5e0980925349f02e58d1c27b' }, (err, data) => {
      console.log(data);
    });
  });
});
