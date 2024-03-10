import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";
import { FaUserInjured } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { MdSimCardDownload } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

export default function PatientPage() {
  const { page } = useParams(); // ดึงค่า params ชื่อ page
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [pageSize] = useState(10);
  const [deletePopup, setDeletePopup] = useState({
    isOpen: false,
    patientId: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/patient?page=${currentPage}&pageSize=${pageSize}`,
          { withCredentials: true }
        );
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openDeletePopup = (patientId) => {
    setDeletePopup({ isOpen: true, patientId });
  };

  const closeDeletePopup = () => {
    setDeletePopup({ isOpen: false, patientId: null });
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to your API endpoint to delete the patient
      await axios.delete(
        `https://api-data-medical-room-tu.onrender.com/api/patient/${deletePopup.patientId}`
      );

      // After successful deletion, fetch the updated data
      const response = await axios.get(
        `https://api-data-medical-room-tu.onrender.com/api/patient?page=${currentPage}&pageSize=${pageSize}`
      );
      setPatientData(response.data);
      // Close the confirmation popup
      closeDeletePopup();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const filteredData = patientData.filter(
    (item) =>
      item.patient_fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student_id.toString().includes(searchTerm.toLowerCase())
  );

  const headers = [
    { label: "รหัสนักศึกษา	", key: "student_id" },
    { label: "ชื่อ", key: "patient_fname" },
    { label: "นามสกุล	", key: "patient_lname" },
    { label: "สถานะ", key: "status" },
    { label: "คณะ/หน่วยงาน	", key: "organizations" },
    { label: "อายุ", key: "age" },
    { label: "เบอร์โทร	", key: "phonenumber" },
    { label: "อีเมล", key: "email" },
  ];

  return (
    <>
      <div className="rounded-lg bg-white px-6 pt-4 pb-10 shadow-default mt-2">
        <div className="max-w-full overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaUserInjured style={{ fontSize: "22px" }} />
              <h5 className="font-bold ml-2 " style={{ fontSize: "18px" }}>
                ข้อมูลผู้ป่วย
              </h5>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                className="mr-2 border text-sm rounded-xl px-4 py-1.5 w-4/4"
                placeholder="ค้นหาชื่อผู้ป่วย"
                value={searchTerm}
                onChange={handleSearch}
              />
              <CSVLink
                data={patientData}
                headers={headers}
                filename={"diagnosis_data.csv"}
                className="text-sm font-bold text-teal-800 px-4 py-1.5 rounded-2xl flex items-center position-relative"
              >
                <MdSimCardDownload className="h-8 w-8" />
              </CSVLink>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-lg bg-white p-4 rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
              <thead className="text-xs text-black  py-2 ">
                <tr className="text-center">
                  <th className="py-2 px-4 text-black">รหัสนักศึกษา</th>
                  <th className="py-2 px-4 text-black">ชื่อ-นามสกุล</th>
                  <th className="py-2 px-4 text-black">สถานะ</th>
                  <th className="py-2 px-4 text-black">คณะ/สถาบัน</th>
                  <th className="py-2 px-4 text-black">อายุ</th>
                  <th className="py-2 px-4 text-black">แก้ไข</th>
                  <th className="py-2 px-4 text-black">ลบ</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 text-sm"
                  >
                    <td className="px-4 py-3 text-center">
                      <Link to={`${item._id}/general`}>{item.student_id}</Link>
                    </td>
                    <td className="px-4">
                      <Link to={`${item._id}/general`}>
                        {`${item.patient_fname} ${item.patient_lname}`}
                      </Link>
                    </td>
                    <td className="px-4 text-center">{item.status}</td>
                    <td className="px-4 text-center">{item.organizations}</td>
                    <td className="py-2 px-4 text-center">{item.age}</td>
                    <td className="text-center">
                      <Link
                        to={`${item._id}`}
                        className="text-sm inline-block  px-3 py-1 rounded-md transition duration-300 hover:text-blue-400"
                      >
                        <BiEdit className="text-white hover:bg-blue-700 text-xl mr-2 bg-blue-600 p-1.5 h-7 w-7 rounded-md " />
                      </Link>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => openDeletePopup(item._id)}
                        className="text-sm inline-block x-3 rounded-md transition duration-300 hover:text-red-700"
                      >
                        <FaTrashCan className="text-white hover:bg-red-700 text-base bg-red-600 p-2 h-7 w-7 rounded-md" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-2 text-sm ">
              <div className="flex justify-center text-sm ">
                <Link
                  to={`/patient/page/${currentPage - 1}`}
                  className={`mx-1 px-2 py-1  text-black  ${
                    currentPage === 1 && "pointer-events-none opacity-50"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaCircleChevronLeft className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
                </Link>
                <Link
                  to={`/patient/page/${currentPage + 1}`}
                  className="mx-1 px-2 py-1  text-black"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <FaCircleChevronRight className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deletePopup.isOpen && (
        <div className="fixed inset-0 bg-black opacity-25"></div>
      )}
      {deletePopup.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <p className="text-lg font-semibold mb-4">
              ต้องการลบข้อมูลผู้ป่วยหรือไม่?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 rounded-md mr-16"
              >
                ลบ
              </button>
              <button
                onClick={closeDeletePopup}
                className="bg-gray-300 text-gray-700 px-4 rounded-md"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
