import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdMedication, MdAddCircle } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";

export default function MedicationsPage() {
  const [medication, setMedication] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-data-medical-room-tu.onrender.com/api/medication`
        );
        setMedication(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("ต้องการลบข้อมูลโรคนี้ใช่หรือไม่?")) {
      try {
        await axios.delete(
          `https://api-data-medical-room-tu.onrender.com/api/medication/${id}`
        );

        alert("ลบข้อมูลโรคเรียบร้อยแล้ว");
        window.location.reload(); // Refresh the page after successful deletion
      } catch (error) {
        console.error("Error deleting medication:", error.message);
      }
    }
  };

  const filteredData = medication.filter((item) =>
    item.medication_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="rounded-lg shadow-default">
        <div className="max-w-full overflow-x-auto  ">
          <div className="py-2">
            <div className="rounded-lg border border-stroke bg-white px-6 pt-4 pb-10 shadow-default">
              <div className="max-w-full overflow-x-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <MdMedication style={{ fontSize: "24px" }} />
                    <h5 className="font-bold ml-2" style={{ fontSize: "18px" }}>
                      ข้อมูลคลังยา
                    </h5>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="border text-sm rounded-xl px-4 py-2 w-56 mr-2 focus:outline-teal-200"
                      placeholder="ค้นหา"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Link
                      to={"add"}
                      className="flex items-center text-sm font-bold  mr-6 bg-teal-500 text-white px-3 py-1.5 rounded-2xl hover:bg-teal-700"
                    >
                      <MdAddCircle className="w-7 h-7 mr-2" />
                      เพิ่มข้อมูล
                    </Link>
                  </div>
                </div>
                <div className="relative overflow-x-auto shadow-lg sm:rounded-md">
                  <table className="w-full text-sm text-left rtl:text-right text-black ">
                    <thead className="text-xs text-gray-500 uppercase  text-center ">
                      <tr>
                        <th scope="col" className="px-6 py-2 text-center">
                          รหัสยา
                        </th>
                        <th scope="col" className="px-6 py-2 text-center">
                          ชื่อยา
                        </th>

                        <th scope="col" className="px-6 py-2 text-center">
                          หน่วย
                        </th>
                        <th scope="col" className="px-6 py-2 text-center">
                          จำนวนคงเหลือ
                        </th>
                        <th scope="col" className="px-6 py-2 text-center">
                          รายละเอียด
                        </th>
                        <th scope="col" className="px-6 py-2 text-center">
                          ลบ
                        </th>

                        <th scope="col" className="px-6 py-2 text-center">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => (
                        <tr
                          key={item._id}
                          className="bg-white border-b  dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-100"
                        >
                          <th
                            scope="row"
                            className="px-6 py-2 text-center font-medium text-gray-900 whitespace-nowrap"
                          >
                            {item.medication_id}
                          </th>
                          <td className="px-6 py-3">
                            {item.medication_name}
                          </td>

                          <td className="px-6 py-2 text-center">{item.unit}</td>

                          <td className="px-6 py-2 text-center">
                            {item.stock}
                          </td>

                          <td className="text-center text-sm">
                            <Link
                              to={`/medication/${item._id}`}
                              className="flex items-center justify-center"
                            >
                              <TbListDetails className="text-white hover:bg-blue-700 text-xl mr-2 bg-blue-600 p-1.5 h-7 w-7 rounded-md" />
                            </Link>
                          </td>

                          <td className="text-center">
                            <button
                              className="text-red-500  items-center justify-center text-base"
                              onClick={() => handleDelete(item._id)}
                            >
                              <FaTrashCan className="text-white hover:bg-red-700 text-base bg-red-600 p-2 h-7 w-7 rounded-md" />
                            </button>
                          </td>

                          <td className="px-6 py-4 text-right"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
