import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const response = await axios.get('/api/products');
        const data = response.data;
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return(
        <Layout>
            <Link className="bg-blue-900 rounded-md text-white py-1 px-2" href={'/products/new'}>Add new product</Link>
            <table>
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Products;