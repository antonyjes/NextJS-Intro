import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  const getProduct = async () => {
    const response = await axios.get("/api/products?id=" + id);
    const data = await response.data;
    setProductInfo(data);
  };  

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  if (!id) return null;

  return (
    <Layout>
      {productInfo && <ProductForm action="Edit" productInfo={productInfo} />}
    </Layout>
  );
};

export default EditProductPage;
