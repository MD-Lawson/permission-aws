console.log('Loading getFeatures');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log(event);
    var params = {
        TableName : "Features",
        FilterExpression: "ApplicationId = :applicationId",
        ExpressionAttributeValues: {
            ":applicationId": parseInt(event.applicationId),
        }};
    const done = (err, res) => callback(null, {
        body: err ? err.message : res,
        
    });
    var items;
    dynamo.scan(params,  function(err, data){
        if (err) console.log(err)
        else {
        var items = JSON.stringify(data.Items)
        console.log(items);}
        done(err, data.Items);
    });
};
