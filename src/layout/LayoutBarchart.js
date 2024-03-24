import axios from "axios";
import { useEffect, useState } from "react";
import { FaHospitalSymbol } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const LayoutBarchart = () => {
  const [count, setCount] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCount = await axios.get(
          "https://api-data-medical-room-tu.onrender.com/api/medicalrecord/count/record"
        );
        setCount(apiCount.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <nav className="bg-gradient-to-r from-teal-800 to-teal-600 p-4 rounded-lg font-prompt">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="flex items-center ml-4 text-xl font-Kanit font-medium text-white">
            <FaHospitalSymbol style={{ fontSize: "24px" }} className="mr-2" />
            TULP WELLNESS CENTER
          </h1>
          {/* คำสั่งอื่นๆ สามารถแสดงผลได้ที่นี่ */}
        </div>
      </nav>

      <div className="p-3 border-2 border-gray-300  rounded-md mt-0.5 bg-gradient-to-r from-teal-800 to-teal-600">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center justify-center h-24 rounded-md bg-white ">
            <div className="text-center">
              <p className="text-sm">ผู้ป่วย</p>
              <p className="text-4xl mt-2 text-gray-600 font-semibold">
                {count.patientCount}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-24 rounded-md bg-white ">
            <div className="text-center">
              <p className="text-sm">ผู้ใช้งานระบบ</p>
              <p className="text-4xl mt-2 text-gray-600 font-semibold">
                {count.userCont}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-24 rounded-md bg-white ">
            <div className="text-center">
              <p className="text-sm">การให้บริการทั้งหมด</p>
              <p className="text-4xl mt-2 text-gray-600 font-semibold">
                {count.recordCount}
              </p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutBarchart;
