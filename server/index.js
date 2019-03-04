const express = require('express');
var request = require('request');
const app = express();
var mongo = require('mongodb');
var fetch = require('node-fetch');
const apiURL = 'https://9wb0wt6jlf.execute-api.eu-west-2.amazonaws.com/test';
var webServerPort = 3001;
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mydb";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/../build`));
const path = require('path')

app.get('/api/features/:applicationId', (req, res) => {
  //console.log("Request recieved")
  fetch(apiURL + req.originalUrl)
  .then(function(response) {
    //console.log(response.body);
    return response.json();
  })
  .then(function(myJson) {
    //console.log(JSON.stringify(myJson));
    res.send(myJson.body);
  });
});

app.get('/api/applications', (req, res) => {
  fetch(apiURL + req.originalUrl)
  .then(function(response) {
    //console.log(response.body);
    return response.json();
  })
  .then(function(myJson) {
    //console.log(JSON.stringify(myJson));
    res.send(myJson);
  });

})
app.get('/api/featuresets/:applicationId', (req, res) => {
  //console.log("Request recieved")
  fetch(apiURL + req.originalUrl)
  .then(function(response) {
    //console.log(response.body);
    return response.json();
  })
  .then(function(myJson) {
    //console.log(JSON.stringify(myJson));
    res.send(myJson.body);
  });
});

app.post('/api/features', (req, res) => {
  console.log("POST features received");
  //console.log(req.body);
  fetch(apiURL + req.originalUrl, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(req.body), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));
})

app.post('/api/featuresets/save', (req, res) => {
  console.log("POST features set received");
  //console.log(req.body);
  var noFeatures = {...req.body};
  delete noFeatures.Features;
  //noFeatures.FeatureNum = [1, 2];
  //console.log(noFeatures);
  fetch(apiURL + req.originalUrl, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(noFeatures), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));  
})

app.post('/api/featuresets/:featuresetid/savefeature', (req, res) => {
  console.log("POST featuresets saved received");
  //console.log(req.body);
  fetch(apiURL + req.originalUrl, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(req.body), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));  
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
app.listen(webServerPort, () =>
  console.log(`Express server is running on localhost:${webServerPort}`)
);
