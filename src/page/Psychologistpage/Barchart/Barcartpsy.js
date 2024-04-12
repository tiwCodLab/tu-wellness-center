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
  const [chatForm2Q, setchartForm2Q] = useState([]);
  const [chartFomr9Q, setchartForm9Q] = useState([]);
  const [chartFomr8Q, setchartForm8Q] = useState([]);
  const [chartFomrst_5, setchartFormst_5] = useState([]);
  const [chartFomrgad_7, setchartFormgad_7] = useState([]);
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

        const groupedDataForm2Q = filteredData.reduce((acc, item) => {
          const form_2qs = item.form_2q;
          if (form_2qs) {
            acc[form_2qs] = (acc[form_2qs] || 0) + 1;
          }
          return acc;
        }, {});

        const groupedDataForm9Q = filteredData.reduce((acc, item) => {
          const form9q = item.form_9q;
          if (form9q) {
            acc[form9q] = (acc[form9q] || 0) + 1;
          }
          return acc;
        }, {});

        const groupedDataForm8Q = filteredData.reduce((acc, item) => {
          const form8q = item.form_8q;
          if (form8q) {
            acc[form8q] = (acc[form8q] || 0) + 1;
          }
          return acc;
        }, {});

        const groupedDataFormst_5 = filteredData.reduce((acc, item) => {
          const form_st_5 = item.form_st_5;
          if (form_st_5) {
            acc[form_st_5] = (acc[form_st_5] || 0) + 1;
          }
          return acc;
        }, {});

        const groupedDataFormgad_7 = filteredData.reduce((acc, item) => {
          const form_gad = item.form_gad;
          if (form_gad) {
            acc[form_gad] = (acc[form_gad] || 0) + 1;
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

        const chartDataForm2q = Object.keys(groupedDataForm2Q).map(
          (form2q) => ({
            form2q,
            count: groupedDataForm2Q[form2q],
          })
        );

        const chartDataForm9q = Object.keys(groupedDataForm9Q).map(
          (form9q) => ({
            form9q,
            count: groupedDataForm9Q[form9q],
          })
        );

        const chartDataForm8q = Object.keys(groupedDataForm8Q).map(
          (form8q) => ({
            form8q,
            count: groupedDataForm8Q[form8q],
          })
        );

        const chartDataFormst_5 = Object.keys(groupedDataFormst_5).map(
          (form_st_5) => ({
            form_st_5,
            count: groupedDataFormst_5[form_st_5],
          })
        );

        const chartDataFormgad_7 = Object.keys(groupedDataFormgad_7).map(
          (form_gad) => ({
            form_gad,
            count: groupedDataFormgad_7[form_gad],
          })
        );

        //คณะ

        setChartData(chartData.slice(0, 10));
        setChartDataOrganization(chartDataOrganization.slice(0, 10));
        setchartForm2Q(chartDataForm2q.slice(0, 10));
        setchartForm9Q(chartDataForm9q);
        setchartForm8Q(chartDataForm8q);
        setchartFormst_5(chartDataFormst_5);
        setchartFormgad_7(chartDataFormgad_7);
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

  const topForm2Q = chatForm2Q.sort((a, b) => b.count - a.count).slice(0, 10);

  const topForm9Q = chartFomr9Q.sort((a, b) => b.count - a.count).slice(0, 10);
  const topForm8Q = chartFomr8Q.sort((a, b) => b.count - a.count).slice(0, 10);
  const topFormst_5 = chartFomrst_5
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const topFormgad_7 = chartFomrgad_7
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

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="grid">
          <div className="bg-white rounded-lg ">
            <div className="flex justify-center pr-4 mb-4">
              <div className="chart-container text-center mt-6 ">
                <h3 className="text-base font-bold mb-8 text-black-800 ">
                  รายงานข้อมูลแบบคัดกรองโรคซึมเศร้า (2Q)
                </h3>
                <div>
                  <BarChart width={580} height={300} data={chatForm2Q}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="form2q" fontSize={10} />
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
              รายงานข้อมูลแบบคัดกรองโรคซึมเศร้า (2Q)
            </h3>

            {/* <CSVLink
              data={Csvcounseling}
              headers={headers}
              filename={"counseling_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink> */}
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topForm2Q.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.form2q}</div>
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
                <h3 className="text-base font-bold mb-8 text-black-800 ">
                  รายงานข้อมูลแบบคัดกรองโรคซึมเศร้า (9Q)
                </h3>
                <div>
                  <BarChart width={580} height={300} data={chartFomr9Q}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="form9q" fontSize={10} />
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
              รายงานข้อมูลแบบคัดกรองโรคซึมเศร้า (9Q)
            </h3>

            {/* <CSVLink
              data={Csvcounseling}
              headers={headers}
              filename={"counseling_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink> */}
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topForm9Q.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.form9q}</div>
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
                <h3 className="text-base font-bold mb-8 text-black-800 ">
                  รายงานข้อมูลแบบคัดกรองการฆ่าตัวตาย (8Q)
                </h3>
                <div>
                  <BarChart width={580} height={300} data={chartFomr8Q}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="form8q" fontSize={10} />
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
              แบบคัดกรองการฆ่าตัวตาย (8Q)
            </h3>

            {/* <CSVLink
              data={Csvcounseling}
              headers={headers}
              filename={"counseling_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink> */}
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topForm8Q.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.form8q}</div>
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
                <h3 className="text-base font-bold mb-8 text-black-800 ">
                  รายงานข้อมูลแบบประเมินความเครียด (ST-5)
                </h3>
                <div>
                  <BarChart width={580} height={300} data={chartFomrst_5}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="form_st_5" fontSize={10} />
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
              รายงานข้อมูลแบบประเมินความเครียด (ST-5)
            </h3>

            {/* <CSVLink
              data={Csvcounseling}
              headers={headers}
              filename={"counseling_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink> */}
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topFormst_5.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.form_st_5}</div>
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
                <h3 className="text-base font-bold mb-8 text-black-800 ">
                  รายงานข้อมูลแบบวัดความวิตกกังวล (GAD-7)
                </h3>
                <div>
                  <BarChart width={580} height={300} data={chartFomrgad_7}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="form_gad" fontSize={10} />
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
              รายงานข้อมูลแบบแบบวัดความวิตกกังวล (GAD-7)
            </h3>

            {/* <CSVLink
              data={Csvcounseling}
              headers={headers}
              filename={"counseling_data.csv"}
              className="text-sm font-bold text-teal-800 rounded-2xl flex items-center position-relative"
            >
              <MdSimCardDownload className="h-8 w-8" />
              ดาวโหลด CSV
            </CSVLink> */}
          </div>
          <ul className="grid grid-cols-1 gap-2.5">
            {topFormgad_7.map((item, index) => (
              <li key={index} className="flex justify-between px-6">
                <div className="text-sm">{item.form_gad}</div>
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
