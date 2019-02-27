var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express')
var fs = require('fs');
const app = express();
var path = require('path');
var appDir = path.dirname(require.main.filename);
// import * as data from './data/feature.json';
var data;
var featuresFilePath = './src/data/testFile.json'
var featureSetsFilePath = './src/data/featureSets.json'
var rolesFilePath = './src/data/roles.json'
var groupsFilePath = './src/data/groups.json'
var usersFilePath = './src/data/users.json'

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.get('/',  (req, res) => {
    res.send('Hello World')
    
});

function loadFile(pathFile){
    var xmlhttp = new XMLHttpRequest();
    var result = null;
    xmlhttp.open("GET", pathFile, false);
    xmlhttp.send();
    if(xmlhttp.status === 200 || 0) {
        console.log(xmlhttp.responseText)
    }
    console.log(result);
    return result;
}

app.get('/features', (req, res) => {
    data = require('./data/testFile.json');
    res.send(data);
});

app.get('/api/featureSets', (req, res) => {
    data = require('./data/featureSets.json');
    res.send(data);
});

app.get('/api/roles', (req, res) => {
    data = require('./data/roles.json');
    res.send(data);
});

app.get('/api/groups', (req, res) => {
    data = require('./data/groups.json');
    res.send(data);
});

app.get('/api/users', (req, res) => {
    data = require('./data/users.json');
    res.send(data);
});

app.post('/api/features', function(req, res) {
    
    var body = "";
    
    req.on('data', function(data){      
        body+= data;
    })

    req.on('end', function(){
        
        fs.writeFile(featuresFilePath, body, function(err){
            if(err) {
                next(err);
                 console.log(err);

            }else{
                 res.send("success").end();
            }

        });
      });
    
});

app.post('/api/featuresets/save', function(req, res) {
    
    var body = "";
    
    req.on('data', function(data){      
        body+= data;
    })

    req.on('end', function(){
        
        fs.writeFile(featureSetsFilePath, body, function(err){
            if(err) {
                next(err);
                 console.log(err);

            }else{
                 res.send("success").end();
            }
        });
      });
    
});

app.post('/api/featuresets/savefeature', function(req, res) {
    
    var body = "";
    
    req.on('data', function(data){      
        body+= data;
    })

    req.on('end', function(){

        fs.writeFile(featureSetsFilePath, body, function(err){
            if(err) {
                next(err);
                 console.log(err);

            }else{
                 res.send("success").end();
            }
        });
      });
    
});

app.post('/api/roles/save', function(req, res) {
    
    var body = "";
    
    req.on('data', function(data){      
        body+= data;
    })

    req.on('end', function(){

        fs.writeFile(rolesFilePath, body, function(err){
            if(err) {
                next(err);
                 console.log(err);

            }else{
                 res.send("success").end();
            }
        });
      });
    
});

app.post('/api/groups/save', function(req, res) {
    
    var body = "";
    
    req.on('data', function(data){      
        body+= data;
    })

    req.on('end', function(){
        
        fs.writeFile(groupsFilePath, body, function(err){
            if(err) {
                next(err);
                 console.log(err);

            }else{
                 res.send("success").end();
            }
        });
      });
    
});

app.post('/api/groups/savegroup', function(req, res) {
    
    var body = "";
    
    req.on('data', function(data){      
        body+= data;
    })

    req.on('end', function(){
        
        fs.writeFile(groupsFilePath, body, function(err){
            if(err) {
                next(err);
                 console.log(err);

            }else{
                 res.send("success").end();
            }
        });
      });
    
});

app.post('/api/users/save', function(req, res) {
    
    var body = "";
    
    req.on('data', function(data){      
        body+= data;
    })

    req.on('end', function(){
        
        fs.writeFile(usersFilePath, body, function(err){
            if(err) {
                next(err);
                 console.log(err);

            }else{
                 res.send("success").end();
            }
        });
      });
    
});

app.listen(8080, function listenHandler(){
  console.info(`Running on 8080`);
})
