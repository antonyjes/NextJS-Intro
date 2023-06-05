import { S3 } from "@aws-sdk/client-s3";
const bucketName = "jes-next-ecommerce";

const deleteS3Image = async (image) => {
  const url = new URL(image);
  const keyImage = url.pathname;

  const s3 = new S3({
    region: 'us-east-2',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: bucketName,
    Key: keyImage,
  };

  try {
    console.log("Deleting image...");
    const response = await s3.deleteObject(params);
    if (response.statusCode === 200) {
      console.log("Image deleted successfully");
    } else {
      console.error("Error deleting image:", response.message);
    }
  } catch (error) {
    console.error("Error deleting image:", error.message);
  }
};

export default deleteS3Image;
