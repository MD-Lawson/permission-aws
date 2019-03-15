console.log('Loading function');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log(event);
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    var params = {
        "TableName": "FeatureSets",
        "Key": {FeatureSetId: event.FeatureSetId},
        "UpdateExpression": "set #n = :name, Description = :description",
        "ExpressionAttributeValues": {
        ":name": event.Name,
        ":description": event.Description
        },
        "ExpressionAttributeNames":{
        "#n": "Name"
        }
    };
    console.log(typeof event.FeatureSetId);
    dynamo.updateItem(params, done);
    //dynamo.putItem(JSON.parse(event.body), done);
};