var AWS = require('aws-sdk');
var keys = require('../core/server/config/config');

AWS.config.update({
        accessKeyId: keys.AWSAccessKeyId
    ,   secretAccessKey: keys.AWSSecretKey
    ,   region: keys.AWSRegion
});

var s3 = new AWS.S3();

module.exports.uploadToS3 = function(fileObj, callback) {
    
    var params = {
            Key: fileObj.name
        ,   Body: fileObj.body
        ,   ContentType: fileObj.type
        ,   ACL: 'public-read'
    };
    s3.upload(params, callback)
};

module.exports.deleteFromS3 = function(fileObj, callback) {
    
    var params = {
        Delete: {
            Objects: fileObj
        }
    };
    s3.deleteObjects(params, callback);
};

