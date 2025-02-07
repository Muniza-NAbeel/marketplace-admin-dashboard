'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';

const initialData = [
  { time: '10:00 AM', speed: 60, fuel: 80, distance: 10 },
  { time: '10:30 AM', speed: 70, fuel: 75, distance: 25 },
  { time: '11:00 AM', speed: 65, fuel: 70, distance: 40 },
  { time: '11:30 AM', speed: 80, fuel: 65, distance: 60 },
  { time: '12:00 PM', speed: 85, fuel: 55, distance: 80 },
  { time: '12:30 PM', speed: 90, fuel: 50, distance: 100 },
];

export default function CarAnalyticsGraph() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const newData = currentData.map(item => ({
          ...item,
          speed: Math.max(50, item.speed + Math.floor(Math.random() * 10 - 5)),
          fuel: Math.max(0, item.fuel - Math.floor(Math.random() * 3)),
          distance: item.distance + Math.floor(Math.random() * 10 + 5),
        }));
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-8 bg-gradient-to-r from-gray-900 to-gray-700 shadow-2xl rounded-xl border border-gray-600 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Car Performance Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis 
            dataKey="time" 
            stroke="#ddd"
            tick={{ fill: '#ddd' }}
          />
          <YAxis 
            stroke="#ddd"
            tick={{ fill: '#ddd' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(50, 50, 50, 0.9)',
              border: '1px solid #777',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line 
            type="monotone" 
            dataKey="speed" 
            stroke="#4ade80" 
            strokeWidth={3}
            dot={{ fill: '#4ade80', strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="fuel" 
            stroke="#f87171" 
            strokeWidth={3}
            dot={{ fill: '#f87171', strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="distance" 
            stroke="#60a5fa" 
            strokeWidth={3}
            dot={{ fill: '#60a5fa', strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
