import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { CSVLink } from "react-csv";
import { FaShieldVirus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";

// export const LoaderDiagnosis = async () => {
//   const res = await fetch("/api/diagnosis");
//   if (!res.ok) {
//     throw Error("Could not fetch the diagnosis");
//   }
//   return res.json();
// };

const DiagnosisPage = () => {
  const [diagnosisdata, setDiagnosisdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const diagnosesPerPage = 12;
  const pagesVisited = pageNumber * diagnosesPerPage;
  const pageCount = Math.ceil(diagnosisdata.length / diagnosesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api-data-medical-room-tu.onrender.com/api/diagnosis`
        );
        setDiagnosisdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [deletePopup, setDeletePopup] = useState({
    isOpen: false,
    patientId: null,
  });

  const openDeletePopup = (patientId) => {
    setDeletePopup({ isOpen: true, patientId });
  };

  const closeDeletePopup = () => {
    setDeletePopup({ isOpen: false, patientId: null });
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://api-data-medical-room-tu.onrender.com/api/diagnosis/${deletePopup.patientId}`
      );

      const dataRes = await axios.get(
        `https://api-data-medical-room-tu.onrender.com/api/diagnosis`
      );
      setDiagnosisdata(dataRes.data);

      if (response.ok) {
        closeDeletePopup();
        // Refresh the page after successful deletion
      } else {
        alert("ไม่สามารถลบข้อมูลโรคได้");
      }
    } catch (error) {
      console.error("Error deleting diagnosis:", error.message);
    }
  };

  const headers = [
    { label: "รหัสโรค", key: "diagnosis_id" },
    { label: "ชื่อโรค", key: "diagnosis_name" },
  ];

  const filteredData = diagnosisdata.filter(
    (item) =>
      item.diagnosis_name.toLowerCase().includes(searchTerm.toLowerCase())
    // item.student_id.toString().includes(searchTerm.toLowerCase())
  );

  const displayDiagnoses = filteredData
    .slice(pagesVisited, pagesVisited + diagnosesPerPage)
    .map((item) => (
      <tr
        key={item._id}
        className="border-b border-gray-100 text-center text-sm"
      >
        <td className="px-4 text-sm">{item.diagnosis_id}</td>
        <td className="py-2 px-4">{item.diagnosis_name}</td>
        <td className="text-center">
          <div className="flex items-center justify-center">
            <Link to={`/disease/${item._id}/edit`} className="mr-2">
              <BiEdit className="text-white hover:bg-blue-700 text-xl mr-2 bg-blue-600 p-1.5 h-7 w-7 rounded-md " />
            </Link>
            <button
              onClick={() => openDeletePopup(item._id)}
              className="text-sm inline-block 0 x-3 rounded-md transition duration-300 hover:text-red-700"
            >
              <FaTrashCan className="text-white hover:bg-red-700 text-base bg-red-600 p-2 h-7 w-7 rounded-md" />
            </button>
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <div className="rounded-lg shadow-default">
        <div className="max-w-full overflow-x-auto">
          <div className="py-2">
            <div className="rounded-lg border border-stroke bg-white px-6 pt-4 pb-10 shadow-default">
              <div className="max-w-full overflow-x-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FaShieldVirus style={{ fontSize: "24px" }} />
                    <h5 className="font-bold ml-2" style={{ fontSize: "18px" }}>
                      ข้อมูลโรค
                    </h5>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <input
                        type="text"
                        className="border text-sm rounded-xl px-4 py-2 w-56 mr-2 focus:outline-teal-200"
                        placeholder="ค้นหาโรค"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    <Link
                      to="/disease/add"
                      className="flex items-center text-sm font-bold  mr-6 bg-teal-500 text-white px-3 py-1.5 rounded-2xl hover:bg-teal-700"
                    >
                      <MdAddCircle className="w-7 h-7 mr-2" />
                      เพิ่มข้อมูล
                    </Link>
                    <CSVLink
                      data={diagnosisdata}
                      headers={headers}
                      filename={"diagnosis_data.csv"}
                      className="text-sm font-bold text-teal-800  py-1.5 rounded-2xl flex items-center position-relative"
                    >
                      {/* <MdSimCardDownload className="h-10 w-10" /> */}
                    </CSVLink>
                  </div>
                </div>

                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-xs">
                      <th className="py-2 px-4 text-black">รหัสโรค</th>
                      <th className="py-2 px-4 text-black">ชื่อโรค</th>
                      <th className="py-2 px-4 text-black">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>{displayDiagnoses}</tbody>
                </table>
              </div>
              <ReactPaginate
                previousLabel={"ก่อน"}
                nextLabel={"ถัดไป"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
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
                className="bg-red-500 text-white px-4 rounded-md mr-2"
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
};

export default DiagnosisPage;
