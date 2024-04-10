import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Barcartpsy() {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/counseling");

        const apiData = res.data;
        const filteredData = apiData.filter((item) => {
          const itemDate = new Date(item.visitdate);
          return (
            (!dateRange.start || itemDate >= dateRange.start) &&
            (!dateRange.end || itemDate <= dateRange.end)
          );
        });

        const groupedData = filteredData.reduce((acc, item) => {
          const counseling = item.firstproblems;

          if (counseling) {
            acc[counseling] = (acc[counseling] || 0) + 1;
          }
          return acc;
        }, {});

        // Format data for Recharts
        const chartData = Object.keys(groupedData).map((firstproblems) => ({
          firstproblems,
          count: groupedData[firstproblems],
        }));

        setChartData(chartData.slice(0, 10));
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
    <>
      <div className="flex justify-end mb-2.5 mt-2.5">
        <div className="mr-4">
          <label htmlFor="startDate" className="mr-2 text-sm">
            วันที่:
          </label>
          <input
            type="date"
            id="startDate"
            className="border text-sm rounded-md px-2 py-1 focus:outline-none"
            onChange={(e) => handleDateChange(e, "start")}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mr-2 text-sm">
            ถึงวันที่:
          </label>
          <input
            type="date"
            id="endDate"
            className="border text-sm rounded-md px-2 py-1 focus:outline-none"
            onChange={(e) => handleDateChange(e, "end")}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg mt-12">
        <div className="flex justify-center pr-4 mb-4">
          <div className="chart-container text-center mt-6 ">
            <h3 className="text-base font-bold mb-8 text-black-800 ">
              รายงานข้อมูลปัญหา
            </h3>
            <div>
              <BarChart width={580} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="firstproblems" fontSize={10} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0d9488" name="จำนวน" barSize={33} />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
