import { Product } from "@/models/Product";
import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";
const bucketName = "jes-next-ecommerce";

const deleteS3Objects = async (imagesToDelete) => {
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: bucketName,
    Delete: {
      Objects: imagesToDelete,
    },
  };

  try {
    const response = await client.send(new DeleteObjectsCommand(params));
    console.log("Deleted objects:", response.Deleted);
  } catch (error) {
    console.error("Error deleting objects:", error.message); // Log the error message
  }
};

const updateImages = async (productId, newImages) => {
  const product = await Product.findById(productId);

  const imagesToDelete = product.images.filter(
    (image) => !newImages.includes(image)
  );

  deleteS3Objects(imagesToDelete.map((image) => ({ Key: image })));
};

export default updateImages;
