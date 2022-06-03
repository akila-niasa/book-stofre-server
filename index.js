const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// db_book_user
// Z9GksubURt2Mw0gN

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bsuux.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



async function run() {
   
    try{
        await client.connect()
        const booksCollection = client.db("bookdb").collection("books");
        const orderList = client.db("bookdb").collection("orders");

        //(GET)Get all books API database code
  app.get('/books', (req, res) => {
    booksCollection.find()
    .toArray((err, book) => {
      res.send(book)
    })
  })

// (POST)Post order
  app.post('/addOrder', (req, res) => {
    const newOrder = req.body;
    console.log(newOrder)
    orderList.insertOne(newOrder)
  .then(result => {
    console.log(result)
    res.send(result.insertedCount > 0);
  })
})

//(GET)Get order books API database code
app.get('/orders', (req, res) => {
    orderList.find({})
    .toArray((err, documents) => {
        res.send(documents);
    })
  })
  
//   (POST)Post Add Books
app.post('/addBookInfo', (req, res) => {
    const newBookInfo = req.body;
    console.log('adding book info', newBookInfo)
    booksCollection.insertOne(newBookInfo)
  .then(result =>{
    console.log('inserted count',result.insertedCount)
    res.send(result.insertedCount > 0)
  })
})

    }
    finally{

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Welcome in My CarRepair Server side')
})
app.listen(port, () => { console.log('CURD is running', port) })