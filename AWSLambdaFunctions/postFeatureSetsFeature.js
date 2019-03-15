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

    var featureParams = {
        TableName: "FeatureSets",
        FilterExpression: "FeatureSetId = :featureSetId",
        ExpressionAttributeValues: {
            ":featureSetId": event.FeatureSetId,
        }
    };
    dynamo.scan(featureParams, function(err, res) {
        var params = {
            "TableName": "FeatureSets",
            "Key": { FeatureSetId: event.FeatureSetId },
            "UpdateExpression": "set FeatureNum = :featureNum",
            "ExpressionAttributeValues": {
                ":featureNum": res.Items[0].FeatureNum,
            },
        };
        console.log(res.Items[0].FeatureNum);
        if(res.Items[0].FeatureNum.length === 0){
            console.log("No Features already in table");
            res.Items[0].FeatureNum.push(event.FeatureId);
        }else{
        var i = res.Items[0].FeatureNum.length
        while(i--) {
            if ( res.Items[0].FeatureNum[i] === event.FeatureId) {
                if (event.Enabled) {console.log("enabled")}
                else {
                    console.log("Not Enabled");
                    res.Items[0].FeatureNum.splice(i, 1);
                    break;
                }
            }else{
                console.log("doesnt already exist " + event.FeatureId)
                if(event.Enabled){
                    res.Items[0].FeatureNum.push(event.FeatureId);
                    break;
                }
            }
            console.log(res.Items[0].FeatureNum);
            }
        }
        console.log(res.Items[0].FeatureNum);
        dynamo.updateItem(params, done);
    });

};