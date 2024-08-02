const { MongoClient } = require('mongodb');
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(uri);
  cachedDb = client.db('devitrakDB');
  return cachedDb;
}

exports.handler = async (event, context) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection(`${event.collection}`);
  const result = await collection.find({"email": `${event.email}`}).limit(10).toArray()
  return {
    statusCode: 200,
    body: result,
  };
};