import React from "react";
import { useLoaderData } from "react-router-dom";
import GoBack from "../../component/GoBack";
import axios from "../../api/axios";

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

  return age;
}

export async function getViewMedicalRecord(id) {
  const res = await axios.get(`/api/medicalrecord/${id}`); // Use axios.get
  return res.data;
}

export const LoadgetViewMedicalRecord = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getViewMedicalRecord(id);

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
      <div className="bg-white rounded-lg pt-6 pl-6 mt-2">
        <h2 className="text-xl font-semibold mb-4">
          ห้องพยาบาลมหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง
        </h2>
        <div className="flex flex-wrap -mx-2 text-sm">
          <div className="w-full md:w-1/2 px-6 mb-4">
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">วันที่</span>
              <span className="ml-2">{viewMedicalRecord.visitdate}</span>
            </p>
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">รหัสประจำตัว</span>
              <span className="ml-2">
                {viewMedicalRecord.patient.student_id}
              </span>
            </p>
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">ชื่อผู้ป่วย</span>
              <span className="ml-2">
                {viewMedicalRecord.patient.patient_fname}{" "}
                {viewMedicalRecord.patient.patient_lname}
              </span>
            </p>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">สถานภาพ</span>{" "}
              <span>{viewMedicalRecord.patient.status}</span>
            </p>
            <p className="text-gray-800 mb-2">
              <span className="font-semibold">คณะ/หน่วยงาน</span>{" "}
              <span> {viewMedicalRecord.patient.organizations}</span>
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">อายุ</span>
              <span className="ml-2">
                {viewMedicalRecord.patient.birthday
                  ? calculateAge(viewMedicalRecord.patient.birthday)
                  : "ไม่ได้ระบุ"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white pt-4 pl-8 mt-1 rounded-md">
        <h1 className="text-xl font-bold mt-4 mb-2">รายละเอียดการรักษา</h1>
        <div className="relative overflow-x-auto px-4">
          <table className="text-sm w-4/5 text-left ">
            <thead className="text-xs"></thead>
            <tbody>
              {viewMedicalRecord.skin_color && (
                <>
                  <h1 className="text-sm font-bold">ระบบทางเดินหายใจ</h1>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      สีผิวหนัง/ปาก/เล็บ
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.skin_color_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.chest_size && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    ขนาดและรูปร่างทรวงอก
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.chest_size_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.breathingRate && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    ลักษณะการหายใจ
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.breathingRate_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.lungTube && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    หลอดลม
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.lungTube_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.ribCage && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    กระดูกซี่โครง
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.ribCage_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.chestExpansion && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    การยายตัวของทรวงอก
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.chestExpansion_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.abnormalBreathSounds && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    เสียงผิดปกติ
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.abnormalBreathSounds_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.breathing_sound && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    เสียงหายใจ
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.breathing_sound_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.yellow_gland && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    ต่อมน้ำเหลือง
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.yellow_gland_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.mouth_and_throat && (
                <>
                  <h1 className="text-sm font-bold pt-4">ระบบทางเดินอาหาร</h1>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ช่องปากและลำคอ
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.mouth_and_throat_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.abdominal_appearance && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    ลักษณะท้อง
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.mabdominal_appearance_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.intestinal_movement_sound && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    เสียงลำไส้เคลื่อนไหว
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.intestinal_movement_sound_detail ||
                      "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.abdominal_wall_sound && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    เสียงผนังหน้าท้อง
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.abdominal_wall_sound_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.abdominal_surface && (
                <tr>
                  <th scope="row" className="px-6 text-sm font-normal pt-2">
                    หน้าท้องและอวัยวะช่องท้อง
                  </th>
                  <td className="px-6 py-1">
                    {viewMedicalRecord.abdominal_surface_detail || "ปกติ"}
                  </td>
                </tr>
              )}

              {viewMedicalRecord.skin && (
                <>
                  <h1 className="text-sm font-bold pt-4">การตรวจร่างกาย</h1>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ผิวหนัง
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.skin_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.head && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ศีรษะ
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.head_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.face && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      หน้า
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.face_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.eyes && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ตา
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.eyes_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.mouth && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ช่องปาก
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.mouth_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.tongue && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ลิ้น
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.tongue_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.throat && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ช่องคอ
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.throat_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.thyroid && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ต่อมน้ำเหลือง
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.thyroid_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.breasts && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      เต้านม
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.breasts_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.chest && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ทรวงอก
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.chest_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.circulatory_system && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ระบบไหวเวียนโลหิต
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.circulatory_system_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.abdomen && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ท้อง
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.abdomen_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.reproductive_system && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ระบบสืบพันธ์
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.reproductive_system_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.musculoskeletal_system && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ระบบโครงร่างกล้ามเนื้อ
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.musculoskeletal_system_detail ||
                        "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              {viewMedicalRecord.nervous_system && (
                <>
                  <tr>
                    <th scope="row" className="px-6 text-sm font-normal pt-2">
                      ระบบประสาท
                    </th>
                    <td className="px-6 py-1">
                      {viewMedicalRecord.nervous_system_detail || "ปกติ"}
                    </td>
                  </tr>
                </>
              )}

              <tr>
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  อาการที่มารับบริการ
                </th>
                <td className="px-6 py-1">
                  {viewMedicalRecord.chief_complaint}
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  การตรวจร่างกายตามระบบที่สัมพันธ์กับความเจ็บป่วย
                </th>
                <td className="px-6 py-1">{viewMedicalRecord.physical_exam}</td>
              </tr>

              <tr>
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  การวินิจฉัย
                </th>
                <td className="px-6 py-1">{viewMedicalRecord.diagnosis}</td>
              </tr>

              <tr>
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  กิจกรรมพยาบาล
                </th>
                <td className="px-6 py-1">
                  {viewMedicalRecord.nursing_activities}
                </td>
              </tr>
              {/* <tr>
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  การจ่ายยา
                </th>
                <td className="px-6 py-2">
                  {viewMedicalRecord.medications_dis.map(
                    (medication, index) => (
                      <span key={index}>
                        {medication.medical_name} {medication.qty} <br />
                        {"     "}
                      </span>
                    )
                  )}
                </td>
              </tr> */}

              <tr>
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  หมายเหตุ
                </th>
                <td className="px-6 py-1"> {viewMedicalRecord.remarks}</td>
              </tr>

              <tr>
                <th scope="row" className="px-6 pt-2 text-sm font-normal pb-6">
                  ผู้บันทึก
                </th>
                <td className="px-6 py-1 pb-6">{viewMedicalRecord.doctor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white pt-4 pl-8 pr-8 pb-6 mt-1 rounded-md">
        <h1 className="text-xl font-bold mt-4 mb-2">รายละเอียดการจ่ายยา</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-800">
              <tr>
                <th scope="col" className="text-center py-1">
                  ชื่อยา
                </th>
                <th scope="col" className="px-6 py-1 ">
                  จำนวน
                </th>
                <th scope="col" className="px-6 py-1"></th>
                <th scope="col" className="px-6 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {viewMedicalRecord.medications_dis.map((medication) => (
                <tr className="" key={medication._id}>
                  <td className="py-1 font-medium pl-8 ">
                    {medication.medical_name}
                  </td>
                  <td className="px-8 py-1 ">{medication.qty}</td>
                  <td className="px-10 py-1"></td>
                  <td className="px-10 py-1"></td>
                </tr>
              ))}
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
