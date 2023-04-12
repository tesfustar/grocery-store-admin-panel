import React, { PureComponent,useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const Chart = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const data = [
    {
      name: "Jan",
      incomplete: 4000,
      complete: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      incomplete: 3000,
      complete: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      incomplete: 2000,
      complete: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      incomplete: 2780,
      complete: 3708,
      amt: 2000,
    },
    {
      name: "May",
      incomplete: 11890,
      complete: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      incomplete: 2390,
      complete: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      incomplete: 3490,
      complete: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      incomplete: 3490,
      complete: 4300,
      amt: 2100,
    },
    {
      name: "Sep",
      incomplete: 9490,
      complete: 4300,
      amt: 2100,
    },
    {
      name: "Nov",
      incomplete: 340,
      complete: 14300,
      amt: 2100,
    },
    {
      name: "Dec",
      incomplete: 8490,
      complete: 400,
      amt: 2100,
    },
  ];
  return (
    <div className="w-full ">
      <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#30475e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgba(241, 194, 46, 0)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#30475e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#30475e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="incomplete"
            stroke="#30475e"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="complete"
            stroke="#30475e"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
