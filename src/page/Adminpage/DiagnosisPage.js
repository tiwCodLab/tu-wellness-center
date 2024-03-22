import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { CSVLink } from "react-csv";
import { FaShieldVirus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";

const DiagnosisPage = () => {
  const [diagnosisdata, setDiagnosisdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const diagnosesPerPage = 20;
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
      await axios.delete(
        `https://api-data-medical-room-tu.onrender.com/api/diagnosis/${deletePopup.patientId}`
      );

      const dataRes = await axios.get(
        `https://api-data-medical-room-tu.onrender.com/api/diagnosis`
      );
      setDiagnosisdata(dataRes.data);
      closeDeletePopup();
      // Refresh the page after successful deletion
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
      <tr key={item._id} className="border-b border-gray-100  text-sm">
        <th
          scope="row"
          className="px-6 py-2 text-center font-medium text-gray-900 whitespace-nowrap"
        >
          {item.diagnosis_id}
        </th>

        <td className="px-6 py-2.5">{item.diagnosis_name}</td>
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

                <div className="relative overflow-x-auto shadow-lg sm:rounded-md">
                  <table className="w-full text-sm text-left rtl:text-right text-black ">
                    <thead className="text-xs text-gray-500 uppercase  text-center ">
                      <tr>
                        <th scope="col" className="px-6 py-2 text-center">
                          รหัสโรค
                        </th>
                        <th scope="col" className="px-6 py-2 text-center">
                          ชื่อโรค
                        </th>

                        <th scope="col" className="px-6 py-2 text-center">
                          จัดการ
                        </th>
                      </tr>
                    </thead>
                    <tbody>{displayDiagnoses}</tbody>
                  </table>
                </div>
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
            <div className="flex justify-between">
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
