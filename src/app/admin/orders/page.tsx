"use client";

import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaSearch, } from "react-icons/fa";
const ThemedIcon = ({ icon: Icon, className }: { icon: React.ElementType; className?: string }) => (
  <Icon className={className || ''} />
);


type Order = {
  _id: string;
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffDate: string;
  dropoffTime: string;
  car: {
    _id: string;
    name: string;
    pricePerDay: string;
  };
  pricePerDay: string;
  bookingDate: string;
  status: string;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("bookingDate"); // Default sorting by bookingDate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "order"]{
            _id,
            name,
            phoneNumber,
            address,
            city,
            pickupLocation,
            pickupDate,
            pickupTime,
            dropoffLocation,
            dropoffDate,
            dropoffTime,
            car->{
              _id,
              name,
              pricePerDay,
            },
            pricePerDay,
            bookingDate,
            status
          }`
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter and sort logic remains the same
  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortBy as keyof Order];
    const bValue = b[sortBy as keyof Order];
    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });

  const filteredOrders = sortedOrders.filter(
    (order) =>
      (order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phoneNumber.includes(searchTerm)) &&
      (statusFilter === "" || order.status === statusFilter)
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 ml-0 md:ml-64">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2 pt-14">
          Order Management
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Manage and track all customer orders
        </p>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg shadow-sm"
          />
           <ThemedIcon 
                        icon={FaSearch} 
                        className="absolute left-4 top-4 text-gray-600" 
                      />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-200 rounded-lg md:rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm md:text-base"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Canceled</option>
            <option value="completed">Confirmed</option>

          </select>
        </div>

        {/* Sort By Dropdown */}
        <div>
          <select
            className="w-full px-4 py-2 md:py-3 bg-white border border-gray-200 rounded-lg md:rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="orderDate">Sort by Date</option>
            <option value="totalAmount">Sort by Amount</option>
            <option value="orderId">Sort by Order ID</option>
            <option value="customer">Sort by Customer</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 md:h-96 rounded-xl md:rounded-2xl bg-white/50">
          <FaSpinner className="animate-spin text-blue-500 mb-3 w-6 h-6 md:w-8 md:h-8" />
          <p className="text-sm md:text-base text-gray-600 font-medium">
            Loading Orders...
          </p>
        </div>
      ) : (
        <div className="bg-white/90 rounded-xl md:rounded-2xl shadow-lg overflow-x-auto border border-gray-100">
          <table className="w-full min-w-[800px] md:min-w-0">
            <thead className="bg-blue-600 text-white">
              <tr>
              <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  Order ID
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  Phone
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  Pickup Location
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  Dropoff Location
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  Car
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-left text-xs font-semibold">
                  PricePerDay
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-4 py-2 md:px-6 md:py-4 text-xs font-medium text-blue-600">
                    {order._id}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-base">
                    {order.name}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-base">
                    {order.phoneNumber}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-base">
                    {order.pickupLocation}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4 text-xs md:text-base">
                    {order.dropoffLocation}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 md:px-3 rounded-full text-xs font-medium ${
                        order.status === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status ? order.status.toUpperCase() : "PENDING"}
                    </span>
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py">
                    {order.car ? order.car.name : "N/A"}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py">
                    {order.car ? order.car.pricePerDay : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
