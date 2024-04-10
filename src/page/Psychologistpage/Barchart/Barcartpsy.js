import { useState, useEffect } from "react";
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
import { CSVLink } from "react-csv";
import { MdSimCardDownload } from "react-icons/md";

const BarChartcounseling = () => {
  const [chartData, setChartData] = useState([]);
  const [chartDataOrganization, setChartDataOrganization] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/counseling");
        const apiData = response.data;

        // Filter and format data based on date range
        const filteredData = apiData.filter((item) => {
          const itemDate = new Date(item.visitdate);
          return (
            (!dateRange.start || itemDate >= dateRange.start) &&
            (!dateRange.end || itemDate <= dateRange.end)
          );
        });

        // Group data by counseling and calculate count
        const groupedData = filteredData.reduce((acc, item) => {
          const counseling = item.firstproblems;

          if (counseling) {
            acc[counseling] = (acc[counseling] || 0) + 1;
          }
          return acc;
        }, {});

       

        const groupedDataOrganization = filteredData.reduce((acc, item) => {
          // Check if 'patient' object exists and 'organizations' is not null
          if (item.patient && item.patient.organizations !== null) {
            const organization = item.patient.organizations;
            acc[organization] = (acc[organization] || 0) + 1;
          }
          return acc;
        }, {});

       

        // Format data for Recharts
        const chartData = Object.keys(groupedData).map((counseling) => ({
          counseling,
          count: groupedData[counseling],
        }));

        

        const chartDataOrganization = Object.keys(groupedDataOrganization).map(
          (organization) => ({
            organization,
            count: groupedDataOrganization[organization],
          })
        );

        //คณะ

        setChartData(chartData.slice(0, 10));
        setChartDataOrganization(chartDataOrganization.slice(0, 10));
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
  const topcounseling = chartData
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const toporganization = chartDataOrganization
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  //CSV
  const Csvcounseling = chartData.sort((a, b) => b.count - a.count);

  const Csvorganization = chartDataOrganization.sort(
    (a, b) => b.count - a.count
  );

  const startDateLabel =
    dateRange.start && dateRange.end
      ? `${dateRange.start.getDate()}/${
          dateRange.start.getMonth() + 1
        }/${dateRange.start.getFullYear()}-${dateRange.end.getDate()}/${
          dateRange.end.getMonth() + 1
        }/${dateRange.end.getFullYear()}`
      : "";

  const headers = [
    {
      label: `ชื่อโรค (${startDateLabel})`,
      key: "counseling",
    },
    { label: "จำนวน", key: "count" },
  ];

  const headersOr = [
    { label: `คณะ (${startDateLabel})`, key: "organization" },
    { label: "จำนวน", key: "count" },
  ];

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
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="grid">
          <div className="bg-white rounded-lg ">
            <div className="flex justify-center pr-4 mb-4">
              <div className="chart-container text-center mt-6 ">
                <h3 className="text-base font-bold mb-8 text-black-800 ">
                  รายงานข้อมูลปัญหา
                </h3>
                <div>
                  <BarChart width={580} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="counseling" fontSize={10} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#0d9488"
                      name="จำนวน"
                      barSize={24}
                    />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg ">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold mb-4 text-black-800">
              TOP 10 รายงานข้อมูลปัญหา
            </h3>

            <CSVLink
              data={Csvcounseling}
              headers={headers}
              filename={"counseling_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink>
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topcounseling.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.counseling}</div>
                <div>{item.count}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="grid">
          <div className="bg-white rounded-lg ">
            <div className="flex justify-center pr-4 mb-4">
              <div className="chart-container text-center mt-6 ">
                <h3 className="text-base font-bold mb-8 text-black-800">
                  รายงานข้อมูลหน่วยงาน/คณะ ที่เข้าใช้บริการ
                </h3>
                <div>
                  <BarChart
                    width={580}
                    height={340}
                    data={chartDataOrganization}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="organization" fontSize={11} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#0d9488"
                      name="จำนวน"
                      barSize={24}
                    />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg ">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold mb-4 text-black-800">
              อันดับข้อมูลหน่วยงาน/คณะ
            </h3>

            <CSVLink
              data={Csvorganization}
              headers={headersOr}
              filename={"คณะที่ใช้บริการ.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink>
          </div>

          <ul className="grid grid-cols-1 gap-3">
            {toporganization.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.organization}</div>
                <div>{item.count}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BarChartcounseling;
