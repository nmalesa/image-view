const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb://localhost/images';

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB...')
  } catch(err) {
    console.error('Could not connect to MongoDB:', err);
  } finally {
    await client.close();
  }
};

main().catch(console.error);
