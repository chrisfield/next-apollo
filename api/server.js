require('dotenv').config();
const server = require('express')();
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const start = async () => {

  const client = await MongoClient.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
  );
  const db = client.db(process.env.MONGO_DB);

  const Pages = db.collection('Pages');

  server.use(bodyParser.urlencoded({ extended: true }));

  server.post('/page', async (req, res) => {
    await Pages.insertOne(req.body);
    res.json({});
  });


  server.delete('/page/:id', async (req, res) => {
    const status = await Pages.deleteOne({_id: ObjectId(req.params.id)});
    res.json(status);
  });

  server.get('/pages', async (req, res) => {
    const pages = await Pages.find({}).toArray();
    res.json({pages: pages});
  });


  server.get('*', (req, res) => {
    res.json({name: 'api val'});
  });
  
  server.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });

};

start();