const { MongoClient, ObjectID } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const jsonParser = bodyParser.json()

MongoClient.connect('mongodb://localhost/library', (err, client) => {
  const db = client.db('library')
  const notebook = db.collection('notebook')

  if (err) {
    console.err(err)
    res.sendStatus(500)
    process.exit(1)
  }
  app.use(jsonParser)

  app.post('/note', (req, res) => {
    notebook.insertOne(req.body, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log(result)
      }
    })

    res.sendStatus(201)
  })

  app.get('/notes', (req, res) => {
    notebook
      .find()
      .toArray()
      .then(notes => res.send(notes))
      .catch(() => res.sendStatus(500))
  })

  app.put('/notes/:id', (req, res) => {
    const id = new ObjectID(req.params.id)
    notebook.update({ _id: id }, { title: req.body }, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log(result)
        res.send('id #' + id + ' has been updated.')
      }
    })
  })
})

app.listen(3000)
