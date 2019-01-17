import path from 'path'
import express from 'express'
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb'
import template from './../template'
//comment out before building for production
import devBundle from './devBundle'
import config from './../config/config';
import app from './express';

//comment out before building for production
devBundle.compile(app)

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.on('err', () =>{
  throw new Error(`unable to connect to database:  ${mongoUri}`);
})

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
  res.status(200).send(template())
})

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
// Use connect method to connect to the server
MongoClient.connect(url, (err, db)=>{
  console.log("Connected successfully to mongodb server")
  db.close()
})



app.listen(config.port, (err) =>{
  if(err){
    console.log(err, 'error in app.listen');
  }else {
    console.log('server starting on port %s', config.port);
  }
})
