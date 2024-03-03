import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GoBack from "../../component/GoBack";
import { IoEye } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import Spinners from "../../component/Spinner";

export async function getMedicalRecordByPatinet(id) {
  const res = await fetch(`/api/medicalrecord/patient/${id}`);

  let medicalrecord = await res.json();
  if (!res.ok) {
    throw Error(medicalrecord.error);
  }
  return medicalrecord; //res.json()
}

export const LoadMedicalRecordByPatient = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getMedicalRecordByPatinet(id);
    console.log(id);
    return res;
  } catch (error) {
    throw new Error("MedicalRecord with id: " + id + " could not be found.");
  }
};

const MedicalRecordByPatient = () => {
  const [loading, setLoading] = useState(true);
  const medicalrecord = useLoaderData();

  useEffect(() => {
    // Simulate loading state by setting a timeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="font-prompt rounded-lg  shadow-default mt-1">
        <div className="max-w-full overflow-x-auto">
          {/* เพิ่มเนื้อหาของตารางหรือ UI ที่ต้องการที่นี่ */}
          <div>
            <div className="font-prompt rounded-lg border border-stroke bg-white px-8 pt-6 pb-10 shadow-default">
              <div className="py-2">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    {/* <p className="text-gray-600">กำลังโหลดข้อมูล...</p> */}
                    <Spinners />
                  </div>
                ) : (
                  <div className="max-w-full overflow-x-auto">
                    <div className="flex items-center mb-4">
                      <FaHistory />
                      <h5 className="text-base font-bold ml-2">
                        ประวัติการรักษา
                      </h5>
                    </div>
                    <table className=" w-full table-auto ">
                      <thead>
                        <tr className="bg-gray-2 text-xs dark:bg-meta-4">
                          <th className="py-4 px-4 text-black border-b">
                            <i className="fas fa-user text-gray-600 mr-4"></i>
                            วันที่
                          </th>
                          <th className="py-4 px-4 text-black border-b">
                            <i className="fas fa-check-circle text-gray-600 mr-4"></i>
                            ชื่อ-นามสกุล
                          </th>
                          <th className="py-4 px-4 text-black border-b">
                            <i className="fas fa-building text-gray-600 mr-4"></i>
                            อาการ
                          </th>

                          <th className="py-4 px-4 text-black border-b">
                            <i className="fas fa-pen-alt text-gray-600 mr-4"></i>
                            การวินิจฉัย
                          </th>
                          <th className="py-4 px-4 text-black border-b">
                            <i className="fas fa-pen-alt text-gray-600 mr-4"></i>
                            กิจกรรมพยาบาล
                          </th>
                          <th className="py-4 px-4 text-black border-b">
                            <i className="fas fa-history text-gray-600 mr-4"></i>
                            ผู้ทำการบันทึก
                          </th>
                          <th className="py-4 px-4 text-black border-b">
                            <i className="fas fa-history text-gray-600 mr-4"></i>
                            รายละเอียด
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {medicalrecord.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b border-gray-100"
                          >
                            <td className="py-4 px-4">
                              <p className="text-black text-center">
                                {item.visitdate}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-black text-center">
                                {item.patient.patient_fname}{" "}
                                {item.patient.patient_lname}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-black text-center">
                                {item.chief_complaint}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-black text-center">
                                {item.diagnosis}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-black text-center">
                                {item.nursing_activities}
                              </p>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-black text-center">
                                {item.doctor}
                              </p>
                            </td>

                            <td className="text-center text-sm">
                              <Link
                                to={`${item._id}/view`}
                                className="inline-block text-black font-bold py-2.5 px-2 rounded-xl "
                              >
                                <IoEye className="text-white hover:bg-teal-700 text-base bg-teal-400 p-2 h-8 w-8 rounded-md" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoBack />
    </>
  );
};

export default MedicalRecordByPatient;