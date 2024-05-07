import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";

import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
// import Spinners from "../../component/Spinner";

export default function HistorymedicalPage() {
  const { page } = useParams(); // ดึงค่า params ชื่อ page
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [dataHistory, setdataHistory] = useState([]);

  const [pageSize] = useState(14); // Adjust the page size as needed
  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `/api/medicalrecord?page=${currentPage}&pageSize=${pageSize}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setdataHistory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // Delay execution of fetchData by 500 milliseconds
    };

    fetchData();
  }, [currentPage, pageSize]);

  const reversedDataHistory = [...dataHistory].reverse();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="rounded-lg mt-2 shadow-default">
        <div className="max-w-full overflow-x-auto  ">
          <div className="rounded-lg border bg-white p-8 shadow-default">
            <div className="max-w-full overflow-x-auto">
              <div className="flex items-center mb-4">
                <FaHistory />
                <h5 className="text-base font-bold ml-2">ประวัติการทำรายการ</h5>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-xs">
                    <th className="py-2 px-4 text-black">เวลา</th>
                    <th className="py-2 px-4 text-black">วันที่</th>
                    <th className="py-2 px-4 text-black">ชื่อ-นามสกุล</th>
                    <th className="py-2 px-4 text-black">อาการ</th>
                    <th className="py-2 px-4 text-black">การวินิจฉัย</th>
                    <th className="py-2 px-4 text-black">ผู้บันทึก</th>
                    <th className="py-2 px-4 text-black">รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {reversedDataHistory.length > 0 ? (
                    reversedDataHistory.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-50 font-light"
                      >
                        <td className="px-4 py-2.5 text-sm text-center">
                          {item.visittime}
                        </td>
                        <td className="px-4 text-sm text-center ">
                          {item.visitdate}
                        </td>
                        <td className="px-4 text-sm">
                          {item.patient
                            ? `${item.patient.patient_fname} ${item.patient.patient_lname}`
                            : "ไม่มีข้อมูล"}
                        </td>
                        <td className="px-4 text-sm ">
                          {item.chief_complaint || "ไม่มีข้อมูล"}
                        </td>
                        <td className="px-4 text-sm ">
                          {item.diagnosis || "ไม่มีข้อมูล"}
                        </td>
                        <td className="px-4 text-sm text-center">
                          {item.doctor || "ไม่มีข้อมูล"}
                        </td>
                        <td className="text-center">
                          <Link
                            to={`${item._id}/view`}
                            className="inline-block t  text-base text-white px-2.5 py-1 rounded-md transition duration-300"
                          >
                            <IoEye className="text-white hover:bg-teal-700 text-base bg-teal-400 p-2 h-8 w-8 rounded-md" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <p className="pt-4">ไม่มีข้อมูล</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-3 text-sm ">
            <div className="flex justify-center text-sm ">
              <Link
                to={`/record/page/${currentPage - 1}`}
                className={`mx-3 px-2  text-3xl text-teal-600 hover:text-teal-700 ${
                  currentPage === 1 && "pointer-events-none opacity-50"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaCircleChevronLeft className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
              </Link>
              <Link
                to={`/record/page/${currentPage + 1}`}
                className="mx-1 px-2  text-3xl text-teal-600 hover:text-teal-700  "
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FaCircleChevronRight className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
