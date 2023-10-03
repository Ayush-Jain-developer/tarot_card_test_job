"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
const client = new client_s3_1.S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});
const uploadFile = async (filePath) => {
    const bucketName = process.env.S3_BUCKET_NAME;
    const objectKey = filePath;
    const fileContent = fs_1.default.readFileSync(filePath);
    const params = {
        Bucket: bucketName,
        Key: objectKey,
        Body: fileContent,
    };
    try {
        return await client.send(new client_s3_1.PutObjectCommand(params));
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = uploadFile;
