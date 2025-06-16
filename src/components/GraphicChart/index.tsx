import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { day: '01/10', revenue: 12000 },
  { day: '02/10', revenue: 15000 },
  { day: '03/10', revenue: 8000 },
  { day: '04/10', revenue: 20000 },
  { day: '05/10', revenue: 18000 },
  { day: '06/10', revenue: 22000 },
  { day: '07/10', revenue: 25000 }
];

const RevenueChart = () => {
  return (
    <div style={{ width: '100%', height: 150, padding: '12px' }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
