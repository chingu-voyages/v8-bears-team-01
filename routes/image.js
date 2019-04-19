const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const mime = require("mime-types");
const verifyToken = require("../middlewares/verifyToken");
const keys = require("../config/keys");

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    signatureVersion: "v4",
    region: "us-east-2"
});

module.exports = app => {
    app.get("/api/upload", verifyToken, (req, res) => {
        const { file } = req.body;
        const key = `${req.user.id}/${uuid()}.${mime.extension(
            mime.lookup(file)
        )}`;

        s3.getSignedUrl(
            "putObject",
            {
                Bucket: "code-collab-image",
                ContentType: mime.lookup(file),
                Key: key
            },
            (err, url) => res.send({ key, url })
        );
    });
};
