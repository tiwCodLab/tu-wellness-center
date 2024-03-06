import axios from "../../api/axios";
import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import FormStep1 from "./Form/FormAddGeneral";
import GoBack from "../../component/GoBack";

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

export async function getGeneralByPatient(id) {
  try {
    const response = await axios.get(`/api/general/patient/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const LoadGeneralByPatient = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getGeneralByPatient(id);
    console.log(id);
    return res;
  } catch (error) {
    throw new Error("General with ID: " + id + " could not be found.");
  }
};

export default function ProfilePatientPage() {
  const { id } = useParams();
  const initialPatientID = id ? id : "";
  const general = useLoaderData();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [formDataStep1, setFormDataStep1] = useState({
    patient: initialPatientID,
    allergy_medicine: "",
    allergy_medicine_detail: "",
    allergy_food: "",
    allergy_food_detail: "",
    smoking_status: "",
    smoking_status_detail: "",
    alcohol_consumption: "",
    alcohol_consumption_detail: "",
    other_substance: "",
    other_substance_detail: "",
    weight: "",
    height: "",
    body_temperature: "",
    heart_rate: "",
    respiratory_rate: "",
    blood_pressure: "",
  });

  const handleInputChangeStep1 = (fieldName, value) => {
    setFormDataStep1({ ...formDataStep1, [fieldName]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/general", formDataStep1)
      .then((response) => {
        console.log("Response:", response.data);
        // ทำสิ่งที่ต้องการหลังจากได้รับการตอบกลับจากเซิร์ฟเวอร์
        alert("บันทึกเรียบร้อยแล้ว");
      })
      .catch((error) => {
        console.error("Error:", error);
        // ทำสิ่งที่ต้องการหากเกิดข้อผิดพลาดในการโพสต์ข้อมูล
      });
  };

  return (
    <>
      <div className="container pt-2">
        {general.length > 0 ? (
          general.map((item) => (
            <div key={item._id} className="bg-white rounded-md">
              <div className="p-10">
                <div className="px-4 sm:px-0 ">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    ข้อมูลทั่วไป
                  </h3>
                </div>
                <div className="">
                  <div className="mt-2  border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          รหัสนักศึกษา
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {item.patient.student_id
                            ? item.patient.student_id
                            : "ไม่มีข้อมูล"}
                        </dd>
                      </div>
                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          ชื่อ - นามสกุล
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {item.patient.patient_fname
                            ? item.patient.patient_fname
                            : "ไม่มีข้อมูล"}{" "}
                          {item.patient.patient_lname
                            ? item.patient.patient_lname
                            : "ไม่มีข้อมูล"}
                        </dd>
                      </div>
                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          คณะ/หน่วยงาน
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {item.patient.organizations
                            ? item.patient.organizations
                            : "ไม่มีข้อมูล"}
                        </dd>
                      </div>
                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          วันเกิด
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {item.birthday ? item.birthday : "ไม่มี"}
                        </dd>
                      </div>
                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          อายุ
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {calculateAge(item.patient.birthday)} ปี
                        </dd>
                      </div>
                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          อีเมล
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {item.patient.email
                            ? item.patient.email
                            : "ไม่มีข้อมูล"}
                        </dd>
                      </div>
                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          เบอร์โทร
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.patient.phonenumber
                            ? item.patient.phonenumber
                            : "ไม่มีข้อมูล"}
                        </dd>
                      </div>

                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          แพ้ยา
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.allergy_medicine_detail
                            ? item.allergy_medicine_detail
                            : "ไม่มี"}
                        </dd>
                      </div>

                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          แพ้อาหาร
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.allergy_food_detail
                            ? item.allergy_food_detail
                            : "ไม่มี"}
                        </dd>
                      </div>

                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          การสูบบุหรี่ (กี่มวน/วัน)
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.smoking_status_detail
                            ? item.smoking_status_detail
                            : "ไม่มี"}
                        </dd>
                      </div>

                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          การดื่มสุรา (กี่ครั้ง/สัปดาห์)
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.alcohol_consumption_detail
                            ? item.alcohol_consumption_detail
                            : "ไม่มี"}
                        </dd>
                      </div>

                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          สารเสพติอื่น ๆ
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.other_substance_detail
                            ? item.other_substance_detail
                            : "ไม่มี"}
                        </dd>
                      </div>

                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          น้ำหนัก (kg)
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.weight ? item.weight : "ไม่มีข้อมูล"}
                        </dd>
                      </div>

                      <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          ส่วนสูง (cm)
                        </dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {item.height ? item.height : "ไม่มีข้อมูล"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-6">
                  <GoBack />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2">
            <div className="mt-2">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                ข้อมูลทั่วไป
              </h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    รหัสนักศึกษา
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
                </div>
                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    ชื่อ - นามสกุล
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
                </div>
                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    คณะ/หน่วยงาน
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
                </div>
                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    อายุ
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
                </div>
                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    อีเมล
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
                </div>
                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    เบอร์โทร
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    แพ้ยา
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    แพ้อาหาร
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    การสูบบุหรี่ (กี่มวน/วัน)
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    การดื่มสุรา (กี่ครั้ง/สัปดาห์)
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    สารเสพติอื่น ๆ
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    น้ำหนัก (kg)
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>

                <div className="px-4 py-1.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    ส่วนสูง (cm)
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"></dd>
                </div>
              </dl>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="mt-4 bg-gray-500 text-white px-5 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                กลับ
              </button>

              <button
                onClick={() => setShowPopup(true)}
                className="mt-8 bg-blue-500 text-white px-5 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-60">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-80"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-4 max-w-lg w-full">
              <div className="bg-white px-10 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center">
                  <div className=" ml-4 text-left">
                    <h3 className="text-lg leading-6 text-center font-bold text-gray-900">
                      เพิ่มข้อมูลทั่วไป
                    </h3>
                    <div className="">
                      <form onSubmit={handleSubmit}>
                        <FormStep1
                          formDataStep1={formDataStep1}
                          handleInputChangeStep1={handleInputChangeStep1}
                        />
                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="w-50 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-500 text-base leading-6 font-medium text-white hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 ml-4"
                          >
                            บันทึก
                          </button>
                          <button
                            onClick={() => setShowPopup(false)}
                            type="button"
                            className="w-50 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-gray-300 text-base leading-6 font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          >
                            ปิด
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
