const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 8000 ;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hxrsyqo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// DB Collection ---------

const ClassicCollection = client.db('fontAwesomeDB').collection('classicIcon');
const BrandCollection = client.db('fontAwesomeDB').collection('brandIcon');
const FreeCollection = client.db('fontAwesomeDB').collection('freeIcon');
const ProCollection = client.db('fontAwesomeDB').collection('proIcon');





app.get('/classicIcon', async(req,res)=>{
    const result = await ClassicCollection.find().toArray();
    res.send(result);
});


app.get('/brandIcon', async(req,res)=>{
    const result = await BrandCollection.find().toArray();
    res.send(result);
});

app.get('/freeIcon', async(req,res)=>{
    const result = await FreeCollection.find().toArray();
    res.send(result);
});

app.get('/proIcon', async(req,res)=>{
  const result = await ProCollection.find().toArray();
  res.send(result);
});

























async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.get('/',(req,res)=>{
    res.send('Font Awesome server running')
});

app.listen(port ,()=>{
    console.log(`Font Awesome server running on terminal : ${port}`)
});