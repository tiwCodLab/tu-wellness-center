import axios from "../../api/axios";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

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

// ฟังก์ชันสำหรับแปลงรูปแบบวันเกิด
function formatBirthday(birthday) {
  // แยกส่วนของวันที่, เดือน, และปีออกจากกัน
  const [year, month, day] = birthday.split("-");
  // สร้างวันที่ใหม่ในรูปแบบ "วัน-เดือน-ปี"
  return `${day}-${month}-${year}`;
}

export async function getGeneralByPatient(id) {
  const authToken = localStorage.getItem("token");
  try {
    const response = await axios.get(`/api/patient/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const LoadGeneralByPatientPsy = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getGeneralByPatient(id);
    console.log(id);
    return res;
  } catch (error) {
    throw new Error("General with ID: " + id + " could not be found.");
  }
};

export default function Generalpage() {
  const general = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <div className="container pt-2">
        <div className="bg-white rounded-md">
          <div className="p-10">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-semibold leading-7 text-gray-900 mb-2">
                ข้อมูลทั่วไป
              </h3>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                รหัสนักศึกษา
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {general.student_id || "ไม่มีข้อมูล"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                ชื่อ - นามสกุล
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {general.patient_fname ? general.patient_fname : "ไม่มีข้อมูล"}{" "}
                {general.patient_lname ? general.patient_lname : "ไม่มีข้อมูล"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                คณะ/หน่วยงาน
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {general.organizations ? general.organizations : "ไม่มีข้อมูล"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                วันเกิด
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {general.birthday ? formatBirthday(general.birthday) : "ไม่มี"}
              </dd>
            </div>
            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                อายุ
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {calculateAge(general.birthday)} ปี
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                อีเมล
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {general.email ? general.email : "ไม่มีข้อมูล"}
              </dd>
            </div>
            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                เบอร์โทร
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.phonenumber ? general.phonenumber : "ไม่มีข้อมูล"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                แพ้ยา
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.allergy_medicine_detail
                  ? general.allergy_medicine_detail
                  : "ไม่มี"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                แพ้อาหาร
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.allergy_food_detail
                  ? general.allergy_food_detail
                  : "ไม่มี"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                การสูบบุหรี่ (กี่มวน/วัน)
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.smoking_status_detail
                  ? general.smoking_status_detail
                  : "ไม่มี"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                การดื่มสุรา (กี่ครั้ง/สัปดาห์)
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.alcohol_consumption_detail
                  ? general.alcohol_consumption_detail
                  : "ไม่มี"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                สารเสพติอื่น ๆ
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.other_substance_detail
                  ? general.other_substance_detail
                  : "ไม่มี"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                น้ำหนัก (kg)
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.weight ? general.weight : "ไม่มีข้อมูล"}
              </dd>
            </div>

            <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                ส่วนสูง (cm)
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {general.height ? general.height : "ไม่มีข้อมูล"}
              </dd>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="ml-1 mt-4 bg-gray-500 text-white px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            กลับ
          </button>
        </div>
      </div>
    </>
  );
}
