import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductForm = ({ action, productInfo }) => {
  const [title, setTitle] = useState(productInfo?.title || "");
  const [description, setDescription] = useState(
    productInfo?.description || ""
  );
  const [price, setPrice] = useState(productInfo?.price || "");
  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    if (productInfo?._id) {
      //update
      await axios.patch(`/api/products?id=${productInfo._id}`, data);
    } else {
      await axios.post("/api/products", data);
    }
    router.push("/products");
  };

  return (
    <form onSubmit={createProduct}>
      <h1>{action} Product</h1>
      <label>Product name</label>
      <input
        placeholder="name"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary">Save</button>
    </form>
  );
};

export default ProductForm;
