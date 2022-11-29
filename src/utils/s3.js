require("dotenv").config();

const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const multer = require("multer");
const util = require("util");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const upload = multer({ dest: "uploads/" }).single("file");
const unlinkFile = util.promisify(fs.unlink);

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

function deleteFile(key) {
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };

  s3.deleteObject(deleteParams).promise();
}
module.exports = { upload, unlinkFile, uploadFile, deleteFile };
