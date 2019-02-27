const app = module.exports =  require('express')();

app.get('/api/features/1', (req, res) => {
    console.log("Request recieved")
    var objResult;
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      let lastChar = req.originalUrl.length - 1
      var applicationId = parseInt(req.originalUrl.substr(lastChar));
      console.log(applicationId);
      dbo.collection("features").find({ApplicationId: applicationId}).toArray(function(err, result) {
        if (err) throw err
        // console.log(result)
        // objResult = { ...result}
        res.json(result);
        // console.log(objResult);
      })
      db.close();
    });
  });