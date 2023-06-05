import { mongooseConnect } from "@/lib/moongose";
import { Product } from "@/models/Product";
import deleteS3Image from "./updateImages.js";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.findById(req.query.id);
      res.json(product);
    } else {
      const products = await Product.find();
      res.json(products);
    }
  }

  if (method === "POST") {
    const { title, description, price, images } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
    });
    res.json(productDoc);
  }

  if (method === "PATCH") {
    const { title, description, price, images } = req.body;
    const { id } = req.query;

    await Product.findByIdAndUpdate(id, {
      title,
      description,
      price,
      images,
    });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      const product = await Product.findById(req.query?.id);
      product.images.map((image) => deleteS3Image(image));
      await Product.findByIdAndDelete(req.query.id);
      res.json(true);
    }
  }
}
