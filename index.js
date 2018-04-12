const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const jsonParser = bodyParser.json()

app.use(jsonParser)
app.post('/note', (req, res) => {
  MongoClient.connect('mongodb://localhost/library', (err, client) => {
    if (err) {
      console.error(err)
      res.sendStatus(500)
      process.exit(1)
    }

    const db = client.db('library')
    const notebook = db.collection('notebook')

    notebook.insertOne(req.body, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log(result)
      }
      client.close()
    })

    res.sendStatus(201)
  })
})

app.get('/note', (req, res) => {
  MongoClient.connect('mongodb://localhost/library', (err, client) => {
    if (err) {
      console.err(err)
      res.sendStatus(500)
      process.exit(1)
    }
    const db = client.db('library')
    const notebook = db.collection('notebook')

    notebook.find().toArray((err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log(result)
      }
      client.close()
    })
    res.sendStatus(200)
  })
})
app.listen(3000)
