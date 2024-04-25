const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

require("dotenv").config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const BUCKET = process.env.AWS_BUCKET;
const s3 = new aws.S3();

module.exports = upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, "uploads/"+Date.now()+file.originalname);
    },
  }),
});
