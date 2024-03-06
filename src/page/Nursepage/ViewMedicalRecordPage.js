import React from "react";
import { useLoaderData } from "react-router-dom";
import GoBack from "../../component/GoBack";
import axios from "../../api/axios";

export async function getViewMedicalRecord(id) {
  const res = await axios.get(
    `/api/medicalrecord/${id}`
  ); // Use axios.get
  return res.data;
}

export const LoadgetViewMedicalRecord = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getViewMedicalRecord(id);
    console.log(id);
    return res;
  } catch (error) {
    throw new Error("MedicalRecord with id: " + id + " could not be found.");
  }
};

export default function ViewMedicalRecordPage() {
  const viewMedicalRecord = useLoaderData();

  // const handlePrint = () => {
  //   window.print();
  // };

  return (
    <>
      <div className="mt-2 p-8 bg-white rounded-md print-section">
        <div>
          <h1 className="text-xl font-bold mb-4">
            ห้องพยาบาลมหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1  ml-8 ">
            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">วันที่</div>
              <p className="text-sm">{viewMedicalRecord.visitdate}</p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">รหัสนักศึกษา</div>
              <p className="text-sm">{viewMedicalRecord.patient.student_id}</p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">ชื่อ-นามสกุล</div>
              <p className="text-sm">
                {viewMedicalRecord.patient.patient_fname}{" "}
                {viewMedicalRecord.patient.patient_lname}
              </p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">สถานภาพ</div>
              <p className="text-sm">{viewMedicalRecord.patient.status}</p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">คณะ/หน่วยงาน</div>
              <p className="text-sm">
                {viewMedicalRecord.patient.organizations}
              </p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">อายุ</div>
              <p className="text-sm">{viewMedicalRecord.patient.age}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 mt-2 rounded-md">
        <h1 className="text-base font-bold mt-4 mb-2">รายละเอียดการรักษา</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs"></thead>
            <tbody>
              <h1 className="text-sm font-bold">ระบบทางเดินหายใจ</h1>
              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal">
                  สีผิวหนัง/ปาก/เล็บ
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.skin_color_detail
                    ? viewMedicalRecord.skin_color_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ขนาดและรูปร่างทรวงอก
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.chest_size_detail
                    ? viewMedicalRecord.chest_size_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ต่อมน้ำเหลือง
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.yellow_gland_detail
                    ? viewMedicalRecord.yellow_gland_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  เสียงหายใจ
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.breathing_sound_detail
                    ? viewMedicalRecord.breathing_sound_detail
                    : "ปกติ"}
                </td>
              </tr>

              <h1 className="text-sm font-bold pt-4">ระบบทางเดินอาหาร</h1>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ช่องปากและลำคอ
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.mouth_and_throat_detail
                    ? viewMedicalRecord.mouth_and_throat_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ลักษณะท้อง
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.abdominal_appearance_detail
                    ? viewMedicalRecord.abdominal_appearance_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  เสียงลำไส้เคลื่อนไหว
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.intestinal_movement_sound_detail
                    ? viewMedicalRecord.intestinal_movement_sound_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  เสียงผนังหน้าท้อง
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.abdominal_wall_sound_detail
                    ? viewMedicalRecord.abdominal_wall_sound_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  หน้าท้องและอวัยวะช่องท้อง
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.abdominal_surface_detail
                    ? viewMedicalRecord.abdominal_surface_detail
                    : "ปกติ"}
                </td>
              </tr>

              <h1 className="text-sm font-bold pt-4">การตรวจร่างกาย</h1>
              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ผิวหนัง
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.skin_detail
                    ? viewMedicalRecord.skin_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ศีรษะ
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.head_detail
                    ? viewMedicalRecord.head_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  หน้า
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.face_detail
                    ? viewMedicalRecord.face_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ตา
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.eyes_detail
                    ? viewMedicalRecord.eyes_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ช่องปาก
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.mouth_detail
                    ? viewMedicalRecord.mouth_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ลิ้น
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.tongue_detail
                    ? viewMedicalRecord.tongue_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ช่องคอ
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.throat_detail
                    ? viewMedicalRecord.throat_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ต่อมน้ำเหลือง
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.thyroid_detail
                    ? viewMedicalRecord.thyroid_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  เต้านม
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.breasts_detail
                    ? viewMedicalRecord.breasts_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ทรวงอก
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.chest_detail
                    ? viewMedicalRecord.chest_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ระบบไหวเวียนโลหิต
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.circulatory_system
                    ? viewMedicalRecord.circulatory_system
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ท้อง
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.abdomen_detail
                    ? viewMedicalRecord.abdomen_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ระบบสืบพันธ์
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.reproductive_system_detail
                    ? viewMedicalRecord.reproductive_system_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ระบบโครงร่างกล้ามเนื้อ
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.musculoskeletal_system_detail
                    ? viewMedicalRecord.musculoskeletal_system_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ระบบประสาท
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.nervous_system_detail
                    ? viewMedicalRecord.nervous_system_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  อาการที่มารับบริการ
                </th>
                <td className="px-6 py-4">
                  {viewMedicalRecord.chief_complaint}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  การตรวจร่างกายตามระบบที่สัมพันธ์กับความเจ็บป่วย
                </th>
                <td className="px-6 py-4">{viewMedicalRecord.physical_exam}</td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  การวินิจฉัย
                </th>
                <td className="px-6 py-4">{viewMedicalRecord.diagnosis}</td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  กิจกรรมพยาบาล
                </th>
                <td className="px-6 py-4">
                  {" "}
                  {viewMedicalRecord.nursing_activities}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  การจ่ายยา
                </th>
                <td className="px-6 py-4">
                  {" "}
                  {viewMedicalRecord.medications_dis.map(
                    (medication, index) => (
                      <span key={index}>
                        {medication.medical_name} {medication.qty} <br />
                        {"     "}
                      </span>
                    )
                  )}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  หมายเหตุ
                </th>
                <td className="px-6 py-4"> {viewMedicalRecord.remarks}</td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ผู้บันทึก
                </th>
                <td className="px-6 py-4">{viewMedicalRecord.doctor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between ">
        <GoBack />
        {/* <div className="mt-4">
          <button
            className="bg-teal-500 text-white px-6  py-1 rounded-md hover:bg-blue-700"
            onClick={handlePrint}
          >
            พิมพ์
          </button>
        </div> */}
      </div>
    </>
  );
}
