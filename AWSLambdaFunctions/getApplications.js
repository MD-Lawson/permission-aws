console.log('Loading getApplications');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var params = {TableName : "Applications"};
    const done = (err, res) => callback(null, res);
    var items;
    dynamo.scan(params,  function(err, data){
        if (err) console.log(err)
        else {
        var items = JSON.stringify(data.Items)
        console.log(items);}
        done(err, data.Items);
    });
};
