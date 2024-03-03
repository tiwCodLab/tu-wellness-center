import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarC = () => {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/medicalrecord"
        );
        const demoData = response.data;

        // Filter and format data based on date range
        const filteredData = demoData.filter((item) => {
          const itemDate = new Date(item.visitdate);
          return (
            (!dateRange.start || itemDate >= dateRange.start) &&
            (!dateRange.end || itemDate <= dateRange.end)
          );
        });

        // Group data by diagnosis and calculate count
        const groupedData = filteredData.reduce((acc, item) => {
          const diagnosis = item.diagnosis;
          acc[diagnosis] = (acc[diagnosis] || 0) + 1;
          return acc;
        }, {});

        // Format data for Recharts
        const chartData = Object.keys(groupedData).map((diagnosis) => ({
          diagnosis,
          count: groupedData[diagnosis],
        }));

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleDateChange = (event, key) => {
    const newDate = new Date(event.target.value);
    setDateRange((prev) => ({ ...prev, [key]: newDate }));
  };

  return (
    <div className="container mx-auto mt-8">
      <h3 className="text-center text-2xl font-bold mb-4">
        React Js Filter Data by Date Range
      </h3>
      <div className="flex justify-center mb-4">
        <div className="mr-4">
          <label htmlFor="startDate" className="mr-2 font-semibold">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            className="border rounded-md px-2 py-1"
            onChange={(e) => handleDateChange(e, "start")}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mr-2 font-semibold">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            className="border rounded-md px-2 py-1"
            onChange={(e) => handleDateChange(e, "end")}
          />
        </div>
      </div>
      <div className="chart-container flex justify-center">
        <BarChart width={800} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="diagnosis" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Count" />
        </BarChart>
      </div>
    </div>
  );
};

export default BarC;
