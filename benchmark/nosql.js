const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

Promise.all([
  mongoose.connect('mongodb://localhost:27017/images', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  MongoClient.connect('mongodb://localhost:27017', {
    useUnifiedTopology: true
  })
]).then(clients => {
  const db = mongoose.connection;

  const Schema = mongoose.Schema;

  const productSchema = new Schema({
    name: String,
    primaryImage: String,
    videoEmbed: String,
    description: String,
    thumbnails: [ String ]
  });

  let productModel = mongoose.model('products', productSchema);

  let nativeCollection = clients[1].db('images').collection('products');

  suite.add('Mongoose', {
    defer: true,
    fn: def => {
      productModel.findOne({ name:'Licensed Rubber Gloves', primaryImage: 'http://lorempixel.com/640/480/city', videoEmbed: 'https://www.youtube.com/watch?v=f3tth4lps5d', description: 'Expanded local solution', thumbnails:['http://lorempixel.com/640/480/cats', 'http://lorempixel.com/640/480/sports', 'http://lorempixel.com/640/480/people', null, null] }).exec().then(e => {
        def.resolve();
      });
    }
  })
  .add('MongoDB', {
    defer: true,
    fn: def => {
      nativeCollection.findOne({ name:'Licensed Rubber Gloves', primaryImage: 'http://lorempixel.com/640/480/city', videoEmbed: 'https://www.youtube.com/watch?v=f3tth4lps5d', description: 'Expanded local solution', thumbnails:['http://lorempixel.com/640/480/cats', 'http://lorempixel.com/640/480/sports', 'http://lorempixel.com/640/480/people', null, null] }, null, (e, r) => {
        def.resolve();
      })
    }
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
})
