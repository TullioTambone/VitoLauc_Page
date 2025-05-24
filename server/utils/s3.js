const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.uploadFileToS3 = (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${fileName}`,
    Body: fileContent,
    ACL: 'public-read',
  };

  return s3.upload(params).promise();
};
