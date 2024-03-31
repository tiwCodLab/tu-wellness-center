import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import FormAddGeneral from "./Nursepage/Form/FormAddGeneral";
import { TiUserAdd } from "react-icons/ti";
import SweetAlert2 from "react-sweetalert2";

const Log = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [statusOptions, setStatus] = useState([]);
  const [organizationOptions, setOrganization] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [swalProps, setSwalProps] = useState({});

  const [formData, setFormData] = useState({
    student_id: "",
    prefix: "",
    patient_fname: "",
    patient_lname: "",
    status: "",
    organizations: "",
    birthday: "",
    email: "",
    phonenumber: "",

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
    bmi: "",
    body_temperature: "",
    heart_rate: "",
    respiratory_rate: "",
    blood_pressure: "",

    Last_edited: "",
    edited_by: "",
  });

  useEffect(() => {
    // ดึงข้อมูลจาก API สำหรับ diagnosis
    axios
      .get("/api/status")
      .then((response) => setStatus(response.data))
      .catch((error) =>
        console.error("Error fetching diagnosis options:", error)
      );

    // ดึงข้อมูลจาก API สำหรับ nursing activities
    axios
      .get("/api/organization")
      .then((response) => setOrganization(response.data))
      .catch((error) =>
        console.error("Error fetching nursing activities options:", error)
      );
  }, []);

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        "https://restapi.tu.ac.th/api/v1/auth/Ad/verify",
        {
          UserName: username,
          PassWord: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Application-Key":
              "TUc85b336eefa9a9a6457e10a6b44a55108d23bf628844ea77547deb2126ec32eac09e8f45cacbb69d8ff5c443c9d5ac0c",
          },
        }
      );

      // Update student_id directly here
      setFormData({
        ...formData,
        student_id: res.data.username,
        patient_fname: res.data.displayname_th.split(" ")[0],
        patient_lname: res.data.displayname_th.split(" ")[1],
        status: res.data.type === "student" ? "นักศึกษา" : "ค่าอื่น ๆ",
        organizations: res.data.faculty,
        email: res.data.email,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    let newFormDataStep1 = { ...formData, [fieldName]: value };

    if (fieldName === "weight" || fieldName === "height") {
      const weight = newFormDataStep1.weight;
      const height = newFormDataStep1.height / 100; // Convert height to meters
      const bmi = (weight / (height * height)).toFixed(2); // Calculate BMI and round to 2 decimal places
      newFormDataStep1 = { ...newFormDataStep1, bmi: parseFloat(bmi) };
    }
    setFormData(newFormDataStep1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalFormData = { ...formData };

      const response = await fetch("/api/status/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      if (response.status === 409) {
        // Handle 409 Conflict (Duplicate Data) - Show pop-up or notification
        alert("รหัสนักศึกษา/รหัสเลขประจำตัว ซ้ำ!!!");
      } else if (response.status === 201) {
        setSuccessMessage(true);
      }

      if (!response.ok) {
        let error = await response.json();
        throw new Error(`Error: ${error.message}`);
      }

      let newUser = await response.json();
      // console.log("Success:", newUser);

      setSuccessMessage(newUser);

      // Reset form data
      setFormData({
        patient_id: "",
        prefix: "",
        student_id: "",
        patient_fname: "",
        patient_lname: "",
        status: "",
        organizations: "",
        age: "",
        email: "",
        phonenumber: "",

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
        bmi: "",
        body_temperature: "",
        heart_rate: "",
        respiratory_rate: "",
        blood_pressure: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
      setSuccessMessage(null); // Reset success message on error
    }
  };

  return (
    <>
      <div className="" style={{ textAlign: "right" }}></div>
      <div className="p-4 md:p-8 bg-white shadow-lg rounded-md">
        <div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0 text-base">
              <TiUserAdd style={{ fontSize: "28px" }} />
              <h3 className="font-semibold ml-2">
                เพิ่มข้อมูลผู้ใช้บริการใหม่
              </h3>
            </div>

            <div className="md:text-right">
              <div className="mb-2 text-black text-sm">
                *หากต้องการดึงข้อมูล สามารถใช้ รหัสนักศึกษา และ
                รหัสผ่านของมหาลัยในการดึงข้อมูลได้
              </div>
              <input
                type="text"
                placeholder="รหัสนักศึกษา"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border text-sm rounded-md px-3 py-1 mb-2 md:mr-2 md:mb-0 focus:outline-none"
              />
              <input
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border text-sm rounded-md px-3 py-1 mb-2 md:mr-2 md:mb-0 focus:outline-none"
              />
              <button
                onClick={handleVerify}
                className="bg-teal-600 text-white px-4 rounded-md hover:bg-yellow-300 focus:outline-none"
              >
                รับข้อมูล
              </button>
            </div>
          </div>

          <div className="text-sm">
            <form onSubmit={handleSubmit}>
              <FormAddGeneral
                formData={formData}
                handleInputChange={handleInputChange}
                organizationOptions={organizationOptions}
                statusOptions={statusOptions}
              />
              <div className="px-4 py-3 sm:px-6 sm:flex justify-center">
                <button
                  type="submit"
                  onClick={() => {
                    setSwalProps({
                      show: true,
                      title: '<span class="font-thin">บันทึกเรียบร้อย</span>',
                      icon: "success",
                    });
                  }}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 mb-2 md:mb-0 md:mr-4"
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 "
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>

          {successMessage && <SweetAlert2 {...swalProps} />}
        </div>
      </div>
    </>
  );
};

export default Log;
