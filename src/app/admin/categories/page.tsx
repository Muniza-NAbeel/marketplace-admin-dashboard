"use client";
import { FaCar, FaBolt, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { useState, useEffect } from "react";

// Define the category themes for car types
type CategoryTheme = {
  icon: JSX.Element;
  bg: string;
  progress: string;
};

// Define valid category keys
type CategoryKey = "sedan" | "sports" | "truck" | "default";

// Themed Icon Component
const ThemedIcon = ({ Icon, className }: { Icon: React.ElementType; className?: string }) => (
  <Icon className={className || ""} />
);

// Car inventory data (Replace with API if needed)
const carProducts = [
  { id: 1, name: "Honda Civic", stock: 5, price: 25000, categoryName: "sedan" },
  { id: 2, name: "Toyota Corolla", stock: 8, price: 22000, categoryName: "sedan" },
  { id: 3, name: "Ford Mustang", stock: 2, price: 55000, categoryName: "sports" },
  { id: 4, name: "Lamborghini Huracan", stock: 1, price: 200000, categoryName: "sports" },
  { id: 5, name: "Ford F-150", stock: 4, price: 35000, categoryName: "truck" },
];

// Category themes with corresponding styles
const categoryThemes: Record<CategoryKey, CategoryTheme> = {
  sedan: {
    icon: <ThemedIcon Icon={FaCar} className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50",
    progress: "bg-gradient-to-r from-blue-600 to-blue-300",
  },
  sports: {
    icon: <ThemedIcon Icon={FaBolt} className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50",
    progress: "bg-gradient-to-r from-blue-600 to-blue-300",
  },
  truck: {
    icon: <ThemedIcon Icon={FaCar} className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50",
    progress: "bg-gradient-to-r from-blue-600 to-blue-300",
  },
  default: {
    icon: <ThemedIcon Icon={FaBoxOpen} className="w-8 h-8 text-gray-600" />,
    bg: "bg-blue-50",
    progress: "bg-gradient-to-r from-blue-600 to-blue-300",
  },
};

const Categories = () => {
  const [products] = useState(carProducts);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [categoryWiseAmount, setCategoryWiseAmount] = useState<Record<string, number>>({});

  useEffect(() => {
    let total = 0;
    let totalQuantity = 0;
    const categoryAmounts: Record<string, number> = {}; // Changed from 'let' to 'const'

    products.forEach((product) => {
      total += product.stock * product.price;
      totalQuantity += product.stock;

      categoryAmounts[product.categoryName] = (categoryAmounts[product.categoryName] || 0) + product.stock * product.price;
    });

    setTotalAmount(total);
    setTotalStock(totalQuantity);
    setCategoryWiseAmount(categoryAmounts);
  }, [products]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-6">
      <div className="w-full max-w-6xl space-y-8 py-12 flex flex-row gap-6">
        {/* Sidebar (Assumed to be on the left side) */}
        <div className="w-1/4 bg-white p-6 rounded-xl hidden sm:block">
          {/* Sidebar Content */}
        </div> 

        <div className="flex-1 bg-white border-2 border-gray-950 rounded-xl p-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-6">
              Car Inventory Analytics 🚗
            </h1>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <ThemedIcon Icon={FaDollarSign} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Total Inventory Value</p>
                  <p className="text-2xl font-bold text-white">
                    ${totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <ThemedIcon Icon={FaBoxOpen} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Total Cars in Inventory</p>
                  <p className="text-2xl font-bold text-white">{totalStock}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(categoryWiseAmount).map(([category, amount]) => {
              const categoryKey = category.toLowerCase() as CategoryKey;
              const theme = categoryThemes[categoryKey] || categoryThemes.default;
              const percentage = totalAmount > 0 ? (((amount as number) / totalAmount) * 100).toFixed(1) : "0";

              return (
                <div key={category} className={`${theme.bg} rounded-2xl  shadow-lg p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-white/20 border-black">{theme.icon}</div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/30">
                      <span className="text-sm font-semibold text-gray-700">{percentage}%</span>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4 mb-1">{category.toUpperCase()}</h3>
                  <p className="text-2xl font-bold text-gray-700 mb-4">
                    ${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                  <div className="relative">
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div className={`${theme.progress} h-3 rounded-full`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
