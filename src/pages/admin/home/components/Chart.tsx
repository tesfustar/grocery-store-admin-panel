import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import ReactLoading from "react-loading";
import { mainColor } from "../../../../styles/Style";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
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
          TotalOrder: item.total,
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
  console.log({ status });
  const test = [
    { name: "May", TotalOrder: 3 },
    { name: "Sep", TotalOrder: 3 },
    { name: "Sep", TotalOrder: 3 },
    { name: "Dec", TotalOrder: 3 },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },

    },
  };

  const data = {
    labels: status.map((item: any) => item.name),
    datasets: [
      {
        fill: true,
        label: "orders",
        data: status.map((item: any) => item.TotalOrder),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="h-96 w-full ">
      {orderStatData.isFetched &&
      orderStatData.isSuccess &&
      status.length > 0 ? (
        <Line options={options} data={data} />
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
