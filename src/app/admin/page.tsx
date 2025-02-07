"use client";
import { useEffect, useState } from "react";
import { FaBox, FaMoneyBillWave, FaShoppingCart, FaUsers } from "react-icons/fa";
import CarAnalyticsGraph from "@/components/CarAnalytics";
import { client } from "@/sanity/lib/client";


const ThemedIcon = ({ icon: Icon, className }: { icon: React.ElementType; className?: string }) => (
  <Icon className={className || ''} />
);

export default function Dashboard() {
  const [totalCars, setTotalCars] = useState<number>(0);
  const [, setTotalStock] = useState<number>(0);
  const [, setTotalAmount] = useState<number>(0);
  const [, setTotalOrders] = useState<number>(0);
  const [, setCompletedOrders] = useState<number>(0);
  const [, setPendingOrders] = useState<number>(0);
  const [, setDeliveredOrders] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productQuery = `*[_type == "car"]{
           _id,
      name,
      brand,
      type,
      fuelCapacity,
      transmission,
      seatingCapacity,
      pricePerDay,
      originalPrice,
      tags,
      "imageUrl": image.asset->url
        }`;

        const carsData = await client.fetch(productQuery);
        setTotalCars(carsData.length);
        setTotalStock(
          carsData.reduce((acc: number, product: { stock: number }) => acc + product.stock, 9876)
        );
        setTotalAmount(
          carsData.reduce(
            (acc: number, product: { price: number; stock: number }) =>
              acc + product.price * product.stock,
            0
          )
        );

        const ordersQuery = `*[_type == "order"]`;

        const ordersData = await client.fetch(ordersQuery);
        setTotalOrders(ordersData.length);
        setCompletedOrders(
          ordersData.filter((order: { status: string }) => order.status === "completed").length
        );
        setPendingOrders(
          ordersData.filter((order: { status: string }) => order.status === "pending").length
        );
        setDeliveredOrders(
          ordersData.filter((order: { status: string }) => order.status === "delivered").length
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:ml-64">
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8 font-[Poppins]">Business Overview</h1>

      <div className="bg-blue-900 rounded-xl p-6 md:p-8 shadow-lg relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">

          {/* Total Products Card */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-transform duration-300 hover:scale-105 flex items-center justify-between">
            <div>
              <p className="text-black font-medium mb-1 text-sm sm:text-base">Total Cars</p>
              <p className="text-2xl sm:text-3xl font-bold text-black">{totalCars}</p>
            </div>
            <div className="bg-blue-600 p-3 sm:p-4 rounded-full">
              <ThemedIcon icon={FaBox} className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>

          {/* Total Stock Card */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-transform duration-300 hover:scale-105 flex items-center justify-between">
            <div>
              <p className="text-black font-medium mb-1 text-sm sm:text-base">Total Stock</p>
              <p className="text-2xl sm:text-3xl font-bold text-black">{188}</p>
            </div>
            <div className="bg-blue-600 p-3 sm:p-4 rounded-full">
              <ThemedIcon icon={FaShoppingCart} className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>

          {/* Total Amount Card */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-transform duration-300 hover:scale-105 flex items-center justify-between">
            <div>
              <p className="text-black font-medium mb-1 text-sm sm:text-base">Total Rent</p>
              <p className="text-2xl sm:text-3xl font-bold text-black">${7654}</p>
            </div>
            <div className="bg-blue-600 p-3 sm:p-4 rounded-full">
              <ThemedIcon icon={FaMoneyBillWave} className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-transform duration-300 hover:scale-105 flex items-center justify-between">
            <div>
              <p className="text-black font-medium mb-1 text-sm sm:text-base">Total Orders</p>
              <p className="text-2xl sm:text-3xl font-bold text-black">{70}</p>
            </div>
            <div className="bg-blue-600 p-3 sm:p-4 rounded-full">
              <ThemedIcon icon={FaUsers} className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>

        </div>

        <br />
        <CarAnalyticsGraph />
      </div>
    </div>
  );
}
