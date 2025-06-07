"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";

const dummyCoins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$67,300",
    change: "+2.3%",
    id: "bitcoin",
    icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,200",
    change: "+1.7%",
    id: "ethereum",
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "$160.50",
    change: "+4.1%",
    id: "solana",
    icon: "https://assets.coingecko.com/coins/images/4128/large/Solana.jpg",
  },
];

export default function Dashboard() {
  const [selected, setSelected] = useState("BTC");
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChartData = async (coinId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days,
            interval: "daily",
          },
        }
      );

      const formatted = response.data.prices.map((entry: number[]) => {
        const date = new Date(entry[0]);
        const label = `${date.getMonth() + 1}/${date.getDate()}`;
        return {
          name: label,
          price: entry[1],
        };
      });

      setChartData(formatted);
    } catch (error) {
      console.error("Failed to fetch chart data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCoin = dummyCoins.find((c) => c.symbol === selected);
    if (selectedCoin) {
      fetchChartData(selectedCoin.id);
    }
  }, [selected, days]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">AgentFlow</h2>
        <nav className="flex flex-col gap-2">
          <Button className="bg-gray-800 hover:bg-gray-700">Dashboard</Button>
          <Button className="bg-gray-800 hover:bg-gray-700">Portfolio</Button>
          <Button className="bg-gray-800 hover:bg-gray-700">Settings</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crypto Overview</h1>
          <Button>Connect Wallet</Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {dummyCoins.map((coin) => (
            <Card
              key={coin.symbol}
              className={`cursor-pointer transition-all duration-200 transform hover:scale-[1.03] hover:shadow-xl ${
                selected === coin.symbol ? "border border-blue-500" : "border border-gray-800"
              }`}
              onClick={() => setSelected(coin.symbol)}
            >
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src={coin.icon} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <h3 className="text-lg font-semibold">{coin.name}</h3>
                </div>
                <p className="text-sm text-gray-400">{coin.symbol}</p>
                <div className="text-xl mt-2">{coin.price}</div>
                <div
                  className={`text-sm ${
                    coin.change.startsWith("+") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {coin.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Controls */}
        <div className="mb-4 flex gap-2">
          {[7, 30, 90].map((range) => (
            <Button
              key={range}
              className={`${
                days === range
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setDays(range)}
            >
              {range}D
            </Button>
          ))}
        </div>

        {/* Line Chart */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">
            {selected} Price Chart (Last {days} Days)
          </h2>

          {loading ? (
            <div className="h-[300px] w-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart key={`${selected}-${days}`} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </main>
    </div>
  );
}
