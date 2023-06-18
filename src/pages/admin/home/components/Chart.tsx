import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import ReactLoading from "react-loading";
import { mainColor } from "../../../../styles/Style";

const Chart = () => {
  const [status, SetStatus] = useState([]);
  const { token } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const orderStatData = useQuery(
    ["orderStatData"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}order/admin/order-stat`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        console.log(res.data.data);
        const updatedStatus = res.data.data.map((item: any) => ({
          name: MONTHS[item._id - 1],
          "TotalOrder": item.total,
        }));
        SetStatus(updatedStatus);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
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
  console.log({status})
  const test=[
    {name: 'May', TotalOrder: 3},
    {name: 'Sep', TotalOrder: 3},
    {name: 'Sep', TotalOrder: 3},
    {name: 'Dec', TotalOrder: 3}
  ]
  return (
    <div className="w-full ">
      {orderStatData.isFetched && orderStatData.isSuccess && status.length > 0 ? (
        <ResponsiveContainer width="100%" height={"100%"}>
          <AreaChart
            width={730}
            height={250}
            data={test}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22a6df" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid
              strokeDasharray="3 3"
              className="border border-gray-300"
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="TotalOrder"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="w-full bg-white p-5 flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={mainColor}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
    </div>
  );
};

export default Chart;
