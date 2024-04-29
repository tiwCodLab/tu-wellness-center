import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { CSVLink } from "react-csv";
import { FaUserInjured } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { MdSimCardDownload } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import headers from "./Barchart/CSV/HeaderPatientCSV";
import Loading from "../../component/Loading";

function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age+543;
}

export default function PatientPage() {
  const { page } = useParams(); // ดึงค่า params ชื่อ page
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize] = useState(50);
  const [deletePopup, setDeletePopup] = useState({
    isOpen: false,
    patientId: null,
  });
  const [csv, setCsv] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get(`/api/patient`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPatientData(response.data);
        setLoading(false);
        setCsv(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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
    console.log(patientId);
  };

  const closeDeletePopup = () => {
    setDeletePopup({ isOpen: false, patientId: null });
  };

  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem("token");
      let res = await axios.delete(`/api/patient/${deletePopup.patientId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 200) alert("ลบข้อมูลเรียบร้อย");

      const response = await axios.get(`/api/patient`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPatientData(response.data);
      closeDeletePopup();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const totalPages = Math.ceil(patientData.length / pageSize);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(
      <button
        key="prev"
        className={`px-3 py-1 mx-1 rounded-md ${currentPage === 1}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaCircleChevronLeft className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
      </button>
    );
    pageNumbers.push(
      <button
        key="next"
        className={`px-3 py-1 mx-1 rounded-md ${currentPage === totalPages}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaCircleChevronRight className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
      </button>
    );
    return pageNumbers;
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const filteredData = patientData.filter(
    (item) =>
      item.patient_fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student_id.toString().includes(searchTerm.toLowerCase())
  );
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="rounded-lg bg-white px-6 pt-4 pb-2 shadow-default mt-2">
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
                data={csv}
                headers={headers}
                filename={"patient_data.csv"}
                className="text-sm font-bold text-teal-800 px-4 py-1.5 rounded-2xl flex items-center position-relative"
              >
                <MdSimCardDownload className="h-8 w-8" />
              </CSVLink>
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : (
            <div className="relative overflow-x-auto shadow-lg bg-white p-4 rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
                <thead className="text-xs text-black  py-2 ">
                  <tr className="text-center">
                    <th className="py-2 px-4 text-black">รหัสนักศึกษา</th>
                    <th className="py-2 px-4 text-black">ชื่อ-นามสกุล</th>
                    <th className="py-2 px-4 text-black">สถานะ</th>
                    <th className="py-2 px-4 text-black">คณะ/สถาบัน</th>
                    <th className="py-2 px-4 text-black">อายุ</th>
                    <th className="py-2  text-black">แก้ไข</th>
                    <th className="py-2  text-black">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-100 text-sm"
                    >
                      <td className="px-4 py-3 text-center">
                        <Link to={`${item._id}/general`}>
                          {item.student_id}
                        </Link>
                      </td>
                      <td className="px-4">
                        <Link to={`${item._id}/general`}>
                          {`${item.patient_fname} ${item.patient_lname}`}
                        </Link>
                      </td>
                      <td className="px-4 text-center">{item.status}</td>
                      <td className="px-4 text-center">{item.organizations}</td>
                      <td className="py-2 px-4 text-center">
                        {calculateAge(item.birthday)}
                      </td>
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
              <div className="flex justify-center mt-4">
                {renderPageNumbers()}
              </div>
            </div>
          )}
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
