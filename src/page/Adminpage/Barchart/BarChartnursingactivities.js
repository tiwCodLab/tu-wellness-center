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
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";

const BarChartNusingactivities = () => {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const COLORS = ["#0f766e", "#0d9488", "#14b8a6", "#2dd4bf", "#5eead4"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-data-medical-room-tu.onrender.com/api/medicalrecord"
        );

        const apiData = response.data;

        // Filter and format data based on date range
        const filteredData = apiData.filter((item) => {
          const itemDate = new Date(item.visitdate);
          return (
            (!dateRange.start || itemDate >= dateRange.start) &&
            (!dateRange.end || itemDate <= dateRange.end)
          );
        });

        // Group data by nursing_activities and calculate count
        const groupedData = filteredData.reduce((acc, item) => {
          const nursing_activities = item.nursing_activities;
          if (nursing_activities) {
            acc[nursing_activities] = (acc[nursing_activities] || 0) + 1;
          }
          return acc;
        }, {});

        // Format data for Recharts
        const chartData = Object.keys(groupedData).map(
          (nursing_activities) => ({
            nursing_activities,
            count: groupedData[nursing_activities],
          })
        );

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

  // Sort the chartData array by count in descending order and slice the first 5 elements
  const topnursing_activities = chartData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Display the top 5 diagnoses in the console

  return (
    <>
      <div className="flex items-center justify-center h-100 mb-4 rounded bg-white mt-4">
        <div className="chart-container mt-6 ">
          <div className="flex justify-center mb-4">
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
          <div>
            <BarChart width={1000} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nursing_activities" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#5eead4" name="จำนวน" barSize={30} />
            </BarChart>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-8 rounded-lg ">
          <h3 className="text-base font-bold mb-4 text-black-800">
            TOP 5 อันดับกิจกรรมพยาบาล
          </h3>
          <ul className="grid grid-cols-1 gap-4">
            {topnursing_activities.map((item, index) => (
              <li key={index} className="flex justify-between">
                <div className="number border-b">{`อันดับ ${index + 1}`}</div>
                <div className="">{item.nursing_activities}</div>
                <div>{item.count}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid">
          <div className="bg-white p-8 rounded-lg ">
            <div style={{ width: "100%", height: 270 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    dataKey="count"
                    data={topnursing_activities}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                  >
                    {topnursing_activities.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        name={entry.nursing_activities}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChartNusingactivities;
