const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const mime = require("mime-types");
const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");
const Project = require("../models/Projects");

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    signatureVersion: "v4",
    region: "us-east-2"
});

if (process.env.NODE_ENV === "production") {
    Bucket = "code-collab-prod";
} else {
    Bucket = "code-collab-image";
}

module.exports = app => {
    app.get("/api/upload", requireLogin, (req, res) => {
        const key = `${req.session.user._id}/${uuid()}.jpeg`;

        s3.getSignedUrl(
            "putObject",
            {
                Bucket,
                ContentType: "image/jpeg",
                Key: key
            },
            (err, url) => res.send({ key, url })
        );
    });
};
