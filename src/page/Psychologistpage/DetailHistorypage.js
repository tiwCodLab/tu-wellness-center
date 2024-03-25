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

export async function getViewCounseling(id) {
  try {
    const res = await axios.get(`/api/counseling/${id}`);
    return res.data; // Return response data directly
  } catch (error) {
    throw new Error(error.response.data.error || "Something went wrong."); // Adjust error handling
  }
}

export const LoadgetViewCounseling = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getViewCounseling(id);
    console.log(id);
    return res;
  } catch (error) {
    throw new Error("MedicalRecord with id: " + id + " could not be found.");
  }
};

export default function ViewCounselingById() {
  const viewCounseling = useLoaderData();

  return (
    <>
      <div className="mt-2 p-8 bg-white rounded-md print-section">
        <div>
          <h1 className="text-xl font-bold mb-4">
            มหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1  ml-8 ">
            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">วันที่</div>
              <p className="text-sm">{viewCounseling.visitdate}</p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">รหัสนักศึกษา</div>
              <p className="text-sm">{viewCounseling.patient.student_id}</p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">ชื่อ-นามสกุล</div>
              <p className="text-sm">
                {viewCounseling.patient.patient_fname}{" "}
                {viewCounseling.patient.patient_lname}
              </p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">สถานภาพ</div>
              <p className="text-sm">{viewCounseling.patient.status}</p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">คณะ/หน่วยงาน</div>
              <p className="text-sm">{viewCounseling.patient.organizations}</p>
            </div>

            <div className="mb-4">
              <div className="mb-2 font-semibold text-sm">อายุ</div>
              <p className="text-sm">
                {viewCounseling.patient.birthday
                  ? calculateAge(viewCounseling.patient.birthday)
                  : "ไม่ได้ระบุ"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 mt-2 rounded-md">
        <h1 className="text-base font-bold mt-4 mb-2">รายละเอียดการปรึกษา</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs"></thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal">
                  รูปแบบการปรึกษา
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.format ? viewCounseling.format : "ไม่ได้ระบุ"}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ปัญหานำ
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.firstproblems
                    ? viewCounseling.firstproblems
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ปัญหาสำคัญ
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.problems
                    ? viewCounseling.problems
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  เสียงหายใจ
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.breathing_sound_detail
                    ? viewCounseling.breathing_sound_detail
                    : "ปกติ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ลักษณะทั่วไปและพฤติกรรมขณะให้การปรึกษา
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.behavior
                    ? viewCounseling.behavior
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ผลการให้คำปรึกษา
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.counseling_result
                    ? viewCounseling.counseling_result
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  แผนการให้คำปรึกษาในครั้งต่อไป
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.counseling_plan
                    ? viewCounseling.counseling_plan
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  แบบคัดกรองโรคซึมเศร้า (2Q)
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.form_2q === "1"
                    ? viewCounseling.form_2q +
                      " = ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้รู้สึกหดหู่เศร้าหรือท้อแท้สิ้นหวัง"
                    : viewCounseling.form_2q === "2"
                    ? "= ใน 2 สัปดาห์ที่ผ่านมารวมวันนี้รู้สึกเบื่อทำอะไรก็ไม่เพลิดเพลิน"
                    : viewCounseling.form_2q
                    ? viewCounseling.form_2q
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  แบบคัดกรองโรคซึมเศร้า (9Q)
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.form_9q
                    ? viewCounseling.form_9q
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  แบบคัดกรองการฆ่าตัวตาย (8Q)
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.form_8q
                    ? viewCounseling.form_8q
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  แบบประเมินความเครียด (ST-5)
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.form_st_5
                    ? viewCounseling.form_st_5
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  แบบวัดความวิตกกังวล (GAD-7)
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.form_gad
                    ? viewCounseling.form_gad
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  แนวทางการให้ความช่วยเหลือ
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.assistance
                    ? viewCounseling.assistance
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  หมายเหตุ
                </th>
                <td className="px-6 py-2.5">
                  {viewCounseling.remarks
                    ? viewCounseling.remarks
                    : "ไม่ได้ระบุ"}
                </td>
              </tr>

              <tr className="border-b border-gray-100">
                <th scope="row" className="px-6 pt-2 text-sm font-normal ">
                  ผู้บันทึก
                </th>
                <td className="px-6 py-2.5">{viewCounseling.psychologist}</td>
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
