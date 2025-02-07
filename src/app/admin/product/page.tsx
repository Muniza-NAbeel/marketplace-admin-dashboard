'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import ConditionalSideBar from '@/components/ConditionalSideBar';
import ClipLoader from "react-spinners/ClipLoader"

interface Product {
  _id: string;
  name: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  originalprice: number;
  tags: string[];
  sizes: string[];
  imageUrl: string;
}

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen] = useState<boolean>(true);
  const router = useRouter(); // Use Next.js router

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "car"] [4..19]{ 
          _id, 
          name, 
          type, 
          fuelCapacity, 
          transmission, 
          seatingCapacity, 
          pricePerDay, 
          originalprice, 
          tags,  
          "imageUrl": image.asset->url
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Navigate to edit page
  const handleEdit = (productId: string) => {
    router.push(`/edit/${productId}`);
  };

  // Remove product
  const handleRemove = (productId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this product?');
    if (confirmDelete) {
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all md:block hidden`}> 
        <ConditionalSideBar />
      </div>
      <div className="flex-1 p-5 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Panel - My Cars</h1>

        {loading ? (
          <p>
            <ClipLoader color="#3563E9" size={50} />
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg shadow-lg p-4 bg-white">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  height={400}
                  width={300}
                  className="w-full h-24 object-cover rounded-md mb-2"
                  onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                />
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.type}</p>
                <p className="text-blue-500 font-semibold">{product.pricePerDay}</p>
                <p className="text-gray-600">Fuel: {product.fuelCapacity}</p>
                <p className="text-gray-600">Seats: {product.seatingCapacity}</p>
                <p className="text-gray-600">Transmission: {product.transmission}</p>
                <p className="text-green-500">Original Price: {product.originalprice}</p>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRemove(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

























