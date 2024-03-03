import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { FaFileMedical } from "react-icons/fa6";
import { RiFolderHistoryFill } from "react-icons/ri";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import sdt from "../../assets/graduated.png";
import teacher from "../../assets/teacher.png";
import maid from "../../assets/maid.png";

const ManagementPage = () => {
  const { page } = useParams(); // ดึงค่า params ชื่อ page
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-data-medical-room-tu.onrender.com/api/patient?page=${currentPage}&pageSize=${pageSize}`
        );
        setData(response.data);
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

  const filteredData = data.filter(
    (item) =>
      item.patient_fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.student_id.toString().includes(searchTerm.toLowerCase())
  );

  const reversedDataPatient = [...filteredData].reverse();

  return (
    <>
      <div className="rounded-lg border mt-2 border-stroke bg-white px-8 pt-6 pb-10 shadow-default">
        <div className="max-w-full overflow-x-auto">
          <div className="flex items-center justify-between mb-4 ">
            <div className="flex items-center">
              <FaFileMedical style={{ fontSize: "22px" }} />
              <p className="text-base font-bold ml-2">จัดการข้อมูลเวชระเบียน</p>
            </div>

            <input
              type="text"
              className="border rounded-md px-6 py-2 text-sm focus:outline-none"
              placeholder="ค้นหาชื่อผู้ป่วย"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="relative overflow-x-auto shadow-lg sm:rounded-md">
            <table className="w-full text-sm text-left rtl:text-right text-black ">
              <thead className="text-xs text-gray-500 uppercase  text-center ">
                <tr>
                  <th scope="col" className="px-6 py-2 text-center"></th>
                  <th scope="col" className="px-6 py-2 text-center">
                    รหัสนักศึกษา/รหัสประจำตัว
                  </th>
                  <th scope="col" className="px-6 py-2 text-center">
                    ชื่อ-นามสกุล
                  </th>

                  <th scope="col" className="px-6 py-2 text-center">
                    คณะ/สถาบัน
                  </th>
                  <th scope="col" className="px-6 py-2 text-center">
                    บันทึกเวชระเบียน
                  </th>

                  <th scope="col" className="px-6 py-2 text-center">
                    ประวัติ
                  </th>
                  <th scope="col" className="px-6 py-2 text-center">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {reversedDataPatient.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b  dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 text-center font-medium text-gray-900"
                    >
                      {item.status === "นักศึกษา" ? (
                        <img
                          src={sdt}
                          alt="คำอธิบายรูปภาพ"
                          width="35"
                          height="35"
                          className="rounded-full bg-gray-400"
                          style={{ display: "block", margin: "auto" }}
                          loading="lazy"
                        />
                      ) : item.status === "แม่บ้าน" ? (
                        <img
                          src={maid}
                          alt="คำอธิบายรูปภาพ"
                          width="35"
                          height="35"
                          className="rounded-full bg-gray-400"
                          style={{ display: "block", margin: "auto" }}
                          loading="lazy"
                        />
                      ) : item.status === "อาจารย์" ? (
                        <img
                          src={teacher}
                          alt="คำอธิบายรูปภาพ"
                          width="35"
                          height="35"
                          className="rounded-full bg-gray-400"
                          style={{ display: "block", margin: "auto" }}
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={sdt}
                          alt="คำอธิบายรูปภาพ"
                          width="35"
                          height="35"
                          className="rounded-full bg-gray-400"
                          style={{ display: "block", margin: "auto" }}
                          loading="lazy"
                        />
                      )}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-2 text-center font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Link to={`${item._id}/general`}>{item.student_id}</Link>
                    </th>
                    <td className="px-6 py-3">
                      <Link to={`${item._id}/general`}>
                        {`${item.patient_fname} ${item.patient_lname}`}
                      </Link>
                    </td>

                    <td className="px-6 py-2 text-center">
                      {item.organizations}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <Link
                        to={`${item._id}`}
                        className="inline-block rounded-md transition duration-300 "
                      >
                        <FaFileMedical className="text-white hover:bg-sky-600 text-base bg-sky-500 p-1.5 h-7 w-7 rounded-md" />
                      </Link>
                    </td>

                    <td className="text-center">
                      <Link
                        to={`${item._id}/history`}
                        className="inline-block rounded-md transition duration-300 "
                      >
                        <RiFolderHistoryFill className="text-white hover:bg-teal-300 text-base bg-teal-500 p-1.5 h-7 w-7 rounded-md" />
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-right"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2 text-sm ">
        <div className="flex justify-center text-sm ">
          <Link
            to={`/manage/page/${currentPage - 1}`}
            className={`mx-1 px-2 py-1  text-black  ${
              currentPage === 1 && "pointer-events-none opacity-50"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaCircleChevronLeft className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
          </Link>
          <Link
            to={`/manage/page/${currentPage + 1}`}
            className="mx-1 px-2 py-1  text-black"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FaCircleChevronRight className="text-white hover:bg-teal-700 text-base bg-teal-600 p-1 h-8 w-8 rounded-md" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;