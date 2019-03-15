console.log('Loading function');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log(event);
   var dataItem = {
        FeatureSetId: event.FeatureSetId,
        Name: event.Name,
        Description: event.Description,
        FeatureNum: event.Features,
    }
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    var params = {
        Item: dataItem, 
        TableName: "FeatureSets",
    };
    dynamo.putItem(params, done);
    //dynamo.putItem(JSON.parse(event.body), done);
};