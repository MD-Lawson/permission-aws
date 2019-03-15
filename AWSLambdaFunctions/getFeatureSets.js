console.log('Loading getFeatures');
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

var features;
exports.handler = (event, context, callback) => {
    var featureParams = {
    TableName: "Features",
    FilterExpression: "ApplicationId = :applicationId",
    ExpressionAttributeValues: {
            ":applicationId": parseInt(event.applicationId),
        }
    };
    dynamo.scan(featureParams, function (err, res) {
        if (err) console.log(err)
        else {
            features = res.Items;
            //console.log('Received event:', JSON.stringify(event, null, 2));
            console.log("Application ID is: " + parseInt(event.applicationId));
            //console.log(event);
            var params = {
                TableName: "FeatureSets"
            };
            const done = (err, res) => callback(null, {
                body: err ? err.message : res,
            });
            var items;
            dynamo.scan(params, function (err, data) {
                
                if (err) console.log(err)
                else {
                    for (key in data.Items) {
                        var usedFeatures = [];
                        //console.log(data.Items[key].Features.contents);
                        for (let id of data.Items[key].FeatureNum) {
                            for(featureKey in features){
                                if(id === features[featureKey].FeatureId){
                                    console.log("feature is apart "  + JSON.stringify(features[featureKey]));
                                    usedFeatures.push(features[featureKey]);
                                }else{
                                    console.log("feature isnt apart " + JSON.stringify(features[featureKey]));
                                }
                            }
                        };
                        data.Items[key].Features = usedFeatures;
                    }
                    console.log("Used features is " + JSON.stringify(data.Items[0].Features));
                    done(err, data.Items);
                }
            });
        }
    })
};