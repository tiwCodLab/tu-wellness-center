import { useState, useEffect } from "react";
import axios from "../../api/axios";

function Appointment() {
  const [dateRange, setDateRange] = useState({
    start: null,
    end: Date.now(),
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/appoinment");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAppointmentDone = async (id) => {
    try {
      await axios.put(
        `/api/appoinment/${id}`,
        { status: false }, // Update the status to false
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the data after status update
      const updatedData = data.map((item) => {
        if (item._id === id) {
          return { ...item, status: false };
        }
        return item;
      });

      setData(updatedData);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDateChange = (event, key) => {
    const newDate = new Date(event.target.value);
    setDateRange((prev) => ({ ...prev, [key]: newDate }));
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.appointment_date);
    return (
      (!dateRange.start || itemDate >= dateRange.start) &&
      (!dateRange.end || itemDate <= dateRange.end) &&
      item.status === true // Check for status to be true
    );
  });

  return (
    <div className="containe">
      <div className="p-4 bg-teal-800 rounded-md mt-2 mb-1">
        <h3 className="text-xl font-bold mb-4 mt-8 text-white">
          รายการนัดบริการปรึกษาจิตวิทยา
        </h3>
        <div className="flex flex-row items-center mb-4">
          <label className="mr-4 text-sm text-white">วันที่เริ่มต้น:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => handleDateChange(e, "start")}
          />
        </div>

        <div className="flex flex-row items-center mb-4">
          <label className="mr-4 text-sm text-white">วันที่สิ้นสุด:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => handleDateChange(e, "end")}
          />
        </div>
      </div>

      <div className="overflow-hidden">
        {loading ? (
          <p className="text-center p-4">กำลังโหลด...</p>
        ) : filteredData.length === 0 ? (
          <div>
            <p className="text-center p-4 text-white">
              ไม่มีข้อมูลสำหรับช่วงวันที่ที่เลือก
            </p>
          </div>
        ) : (
          <div>
            {filteredData.map((item) => (
              <div
                key={item._id}
                className="border-b bg-white rounded-md shadow-sm border-gray-200 p-4 mt-1"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="mb-2 text-xm font-bold">
                      {item.patient
                        ? `${item.patient.patient_fname} ${item.patient.patient_lname}`
                        : "ไม่ระบุ"}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-bold">วันที่</span>{" "}
                      {item.appointment_date || "ไม่ระบุ"}
                    </p>
                    <p className="text-sm font-medium mb-2">
                      <span className="font-bold">เวลา </span>
                      {item.appointment_time || "ไม่ระบุ"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAppointmentDone(item._id)}
                    className="bg-teal-500 text-white rounded-md px-4 h-12 text-sm font-medium hover:bg-teal-400 mt-4"
                  >
                    เรียบร้อย
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Appointment;
