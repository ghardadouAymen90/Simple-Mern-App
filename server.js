const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')// the driver to make communication with mongo (these scripts are from mongodb driver)
const BodyParser = require('body-parser')
const assert = require('assert') // modul from nodejs

const app = express()

app.use(BodyParser.json())//used as a middleware, body parser will let us read the body of a req and the body of res


const mongo_url = "mongodb://localhost/27017"  // where mongo db is running
const database = 'first-api'

MongoClient.connect(mongo_url,{ useNewUrlParser: true }, (err, client) => {
    assert.equal(err, null, 'dataBase connexion has failed')
    const db = client.db(database)

    //ADD one contact
    app.post('/add-contact', (req, res) => {
        db.collection('contacts').insertOne(req.body, (err, data) => {
            if (err) res.send('error! cannot show contacts')
            else res.send(data)
        })
    })

    //GET All contacts
    app.get('/contacts', (req, res) => {
        db.collection('contacts').find().toArray((err, data) => {
            if (err) res.send('error! cannot show contacts')
            else res.send(data)
        })
    })

      //GET one contact
      app.get('/update-contact/:id', (req, res) => {
          let id = ObjectID(req.params.id)
        db.collection('contacts').findOne({_id:id},(err, data) => {
            if (err) res.send('error! cannot show contact to update!')
            else res.send(data)
        })
    })


    //Update one contact
    app.put('/update-contact/:id', (req, res) => {
        let id = ObjectID(req.params.id)
        let contactToUpdate = req.body
        db.collection('contacts').findOneAndUpdate({ _id: id }, { $set: { ...contactToUpdate } }, (err, data) => {
            if (err) res.send('contact did not update')
            else res.send(data)
        })
    })


    //DELETE one contact
    app.delete('/delete-contact/:id', (req, res) => {
        let id = ObjectID(req.params.id)
        db.collection('contacts').findOneAndDelete({ _id: id }, (err, data) => {
            if (err) res.send('error! cannot show contacts')
            else res.send(data)
        })
    })




})

app.listen(3001, (err) => {
    if (err) console.log(err)
    else {
        console.log('server is running on port 3001')
    }
})