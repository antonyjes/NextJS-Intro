import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({ action, productInfo }) => {
  const [title, setTitle] = useState(productInfo?.title || "");
  const [description, setDescription] = useState(
    productInfo?.description || ""
  );
  const [price, setPrice] = useState(productInfo?.price || "");
  const [images, setImages] = useState(productInfo?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images };
    if (productInfo?._id) {
      //update
      await axios.patch(`/api/products?id=${productInfo._id}`, data);
    } else {
      await axios.post("/api/products", data);
    }
    router.push("/products");
  };

  const uploadImages = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages([...images, res.data.links]);
      setIsUploading(false);
    }
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  }

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
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
          {
            images?.length > 0 && images.map(link => (
              <div key={link} className="h-24 bg-white shadow-sm rounded-sm border border-gray-200" >
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))
          }
        </ReactSortable>
        {isUploading && (
            <div className="h-24 flex items-center">
              <ColorRing />
            </div>
          )}
        <label className="w-24 h-24 cursor-pointer border flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input
            className="hidden"
            type="file"
            onChange={uploadImages}
          />
        </label>
      </div>
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
