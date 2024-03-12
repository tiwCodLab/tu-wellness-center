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
import { CSVLink } from "react-csv";
import { MdSimCardDownload } from "react-icons/md";
import headers from "./CSV/HeaderDiagnosis";
import headersNursing from "./CSV/HeaderNursing";
import headerMedical from "./CSV/HeaderMedical";

const BarChartdiagnosis = () => {
  const [chartData, setChartData] = useState([]);
  const [chartDataActivity, setChartDataActivity] = useState([]);
  const [chartDataOrganization, setChartDataOrganization] = useState([]);
  const [chartDataMedication, setChartDataMedication] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

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

        // Group data by diagnosis and calculate count
        const groupedData = filteredData.reduce((acc, item) => {
          const diagnosis = item.diagnosis;
          if (diagnosis) {
            acc[diagnosis] = (acc[diagnosis] || 0) + 1;
          }
          return acc;
        }, {});

        const groupedDataActivity = filteredData.reduce((acc, item) => {
          const nursing_activities = item.nursing_activities;
          if (nursing_activities) {
            acc[nursing_activities] = (acc[nursing_activities] || 0) + 1;
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

        const groupedDataMedication = filteredData.reduce((acc, item) => {
          // ตรวจสอบว่า medications_dis มีข้อมูลหรือไม่
          if (item.medications_dis && Array.isArray(item.medications_dis)) {
            item.medications_dis.forEach((medication) => {
              const medicalName = medication.medical_name;
              acc[medicalName] = (acc[medicalName] || 0) + medication.qty;
            });
          }
          return acc;
        }, {});

        // Format data for Recharts
        const chartData = Object.keys(groupedData).map((diagnosis) => ({
          diagnosis,
          count: groupedData[diagnosis],
        }));

        const chartDataActivity = Object.keys(groupedDataActivity).map(
          (nursing_activities) => ({
            nursing_activities,
            count: groupedDataActivity[nursing_activities],
          })
        );

        const chartDataOrganization = Object.keys(groupedDataOrganization).map(
          (organization) => ({
            organization,
            count: groupedDataOrganization[organization],
          })
        );

        const chartDataMedications = Object.keys(groupedDataMedication).map(
          (medicalName) => ({
            medicalName,
            count: groupedDataMedication[medicalName],
          })
        );

        //คณะ

        setChartDataMedication(chartDataMedications);
        setChartData(chartData.slice(0, 10));
        setChartDataActivity(chartDataActivity.slice(0, 10));
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
  const topDiagnosis = chartData.sort((a, b) => b.count - a.count).slice(0, 10);
  const topnursing_activities = chartDataActivity
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const toporganization = chartDataOrganization
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topmedicalName = chartDataMedication
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  // Display the top 5 diagnoses in the console

  //CSV
  const CsvDiagnosis = chartData.sort((a, b) => b.count - a.count);
  const CsvNusing_activates = chartDataActivity.sort(
    (a, b) => b.count - a.count
  );

  const CsvMedical = chartDataMedication.sort((a, b) => b.count - a.count);
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
                  รายงานข้อมูลการวินิจฉัย
                </h3>
                <div>
                  <BarChart width={580} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="diagnosis" fontSize={11} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#0d9488"
                      name="จำนวน"
                      barSize={22}
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
              TOP 10 อันดับข้อมูลการวินิจฉัย
            </h3>

            <CSVLink
              data={CsvDiagnosis}
              headers={headers}
              filename={"diagnosis_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink>
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topDiagnosis.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.diagnosis}</div>
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
                  รายงานข้อมูลการหัตถการ
                </h3>

                <div>
                  <BarChart width={580} height={340} data={chartDataActivity}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="nursing_activities" fontSize={11} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#0d9488"
                      name="จำนวน"
                      barSize={22}
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
              TOP 10 อันดับข้อมูลการหัตถการ
            </h3>

            <CSVLink
              data={CsvNusing_activates}
              headers={headersNursing}
              filename={"activity.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink>
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topnursing_activities.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.nursing_activities}</div>
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
                      barSize={22}
                    />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg ">
          <h3 className="text-base font-bold mb-4 text-black-800">
            อันดับข้อมูลหน่วยงาน/คณะ
          </h3>
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

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="grid">
          <div className="bg-white rounded-lg ">
            <div className="flex justify-center pr-4 mb-4">
              <div className="chart-container text-center mt-6 ">
                <h3 className="text-base font-bold mb-8 text-black-800">
                  รายงานข้อมูลยา
                </h3>

                <div>
                  <BarChart width={580} height={340} data={chartDataMedication}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="medicalName" fontSize={11} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#0d9488"
                      name="จำนวน"
                      barSize={22}
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
              TOP 10 อันดับข้อมูลยาที่ใช้เยอะที่สุด
            </h3>
            <CSVLink
              data={CsvMedical}
              headers={headerMedical}
              filename={"medical_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink>
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {topmedicalName.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.medicalName}</div>
                <div>{item.count}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BarChartdiagnosis;
