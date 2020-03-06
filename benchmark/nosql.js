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
      productModel.findOne({ _id: '5e0980925349f02e58d1c27b' }).exec().then(e => {
        def.resolve();
      });
    }
  })
  .add('MongoDB', {
    defer: true,
    fn: def => {
      nativeCollection.findOne({ _id: '5e0980925349f02e58d1c27b' }, null, (e, r) => {
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
