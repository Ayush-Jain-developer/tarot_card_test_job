// eslint-disable-next-line import/no-extraneous-dependencies
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${NODE_ENV}` });

const client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

const uploadFile = async (filePath: string) => {
  const bucketName = process.env.S3_BUCKET_NAME;
  const objectKey = filePath;

  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: fileContent,
  };
  try {
    return await client.send(new PutObjectCommand(params));
  } catch (error: any) {
    throw new Error(error);
  }
};

export default uploadFile;
