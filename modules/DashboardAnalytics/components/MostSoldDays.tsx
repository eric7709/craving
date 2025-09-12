import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
type Props = {
  dailySalesRanking: {
    day_name: string;
    day_of_week: number;
    orders_count: number;
  }[];
};

export default function MostSoldDays({ dailySalesRanking }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="text-base font-semibold mb-3 text-slate-800">
        Most Sold Days Ranking
      </h2>
      {dailySalesRanking.length > 0 ? (
        <div className="h-48">
          <ResponsiveContainer>
            <BarChart
              data={dailySalesRanking}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="day"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="orders"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center text-gray-500">
          No daily sales data available
        </div>
      )}
    </div>
  );
}
