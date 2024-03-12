import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaFileMedical } from "react-icons/fa6";
import { RiFolderHistoryFill } from "react-icons/ri";
import { RiUserSearchFill } from "react-icons/ri";
import Loading from "../../component/Loading";

const SearchPatientPage = () => {
  const storedStudentId = localStorage.getItem("studentId") || "";
  const [searchResults, setSearchResults] = useState([]);
  const [studentId, setStudentId] = useState(storedStudentId);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (studentId.trim() === "") {
          // Do not make a request if studentId is empty
          setSearchResults([]);
          return;
        }

        const authToken = localStorage.getItem("token");

        const response = await fetch(
          `https://api-data-medical-room-tu.onrender.com/api/patient/search?student_id=${studentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json", // คุณอาจต้องการระบุ Content-Type อื่น ๆ ตามที่ API ต้องการ
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Delay the fetch by 2 seconds
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        await delay(800);

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
  }, [studentId]);

  useEffect(() => {
    localStorage.setItem("studentId", studentId);
  }, [studentId]);

  return (
    <div className="rounded-lg  shadow-default">
      <div className="max-w-full overflow-x-auto  ">
        <div className="py-2 ">
          <div className="rounded-lg border border-stroke bg-teal-800 p-6 shadow-default">
            <div className="ml-4 mt-2 block text-base font-semibold mb-2 ">
              <div className="flex items-center">
                <RiUserSearchFill
                  className="text-white"
                  style={{ fontSize: "24px" }}
                />
                <p className="ml-2 text-white">ค้นหาผู้ป่วย</p>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto">
              {/* <label className="block text-base font-semibold mb-2 text-center">
                ค้นหาผู้ป่วย
              </label> */}

              <form className="flex items-center max-w-sm mx-auto">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FaSearch className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    placeholder="กรอกรหัสนักศึกษาหรือรหัสประจำตัว"
                    onChange={(e) => setStudentId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-100 block w-full ps-10 p-2.5 focus:outline-none"
                    required
                  />
                </div>
              </form>
              {studentId.trim() !== "" && (
                <div className="mt-4 bg-white  p-4 rounded-lg">
                  <table className="w-full table-auto text-sm">
                    <thead>
                      <tr className="bg-gray-2 text-xs">
                        <th className="py-2 px-4 text-black">
                          รหัสนักศึกษา/รหัสประจำตัว
                        </th>
                        <th className="py-2 px-4 text-black">ชื่อ-นามสกุล</th>
                        <th className="py-2 px-4 text-black">สถานะ</th>
                        <th className="py-2 px-4 text-black">คณะ/สถาบัน</th>
                        <th className="py-2 px-4 text-black">
                          บันทึกเวชระเบียน
                        </th>

                        <th className="py-2 px-4 text-black">ประวัติ</th>
                      </tr>
                    </thead>
                    {searchResults.length > 0 ? (
                      <tbody>
                        {searchResults.slice(0, 10).map((item) => (
                          <tr
                            key={item._id}
                            className="border-b border-gray-100"
                          >
                            <td className="px-4 py-2.5 text-sm text-center">
                              <Link to={`${item._id}/general`}>
                                {item.student_id}
                              </Link>
                            </td>
                            <td className="px-4 py-2.5">{`${item.patient_fname} ${item.patient_lname}`}</td>
                            <td className="px-4 py-2.5 text-center">
                              {item.status}
                            </td>
                            <td className="px-4 py-2.5 text-center">
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

                            <td className="px-4 py-2.5 text-center">
                              <Link
                                to={`${item._id}/history`}
                                className="inline-block rounded-md transition duration-300 "
                              >
                                <RiFolderHistoryFill className="text-white hover:bg-teal-300 text-base bg-teal-500 p-1.5 h-7 w-7 rounded-md" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="7" className="px-4  text-sm text-center">
                            <Loading />
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPatientPage;
