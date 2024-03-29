import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiUserAdd } from "react-icons/ti";
import SweetAlert2 from "react-sweetalert2";

export default function AddpatientPage() {
  const [statusOptions, setStatus] = useState([]);
  const [organizationOptions, setOrganization] = useState([]);
  
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [swalProps, setSwalProps] = useState({});

  const [formData, setFormData] = useState({
    student_id: "",
    prefix: "",
    patient_fname: "",
    patient_lname: "",
    status: "",
    organizations: "",
    birthday: "",
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

    Last_edited: "",
    edited_by: "",
  });

  useEffect(() => {
    // ดึงข้อมูลจาก API สำหรับ diagnosis
    axios
      .get("https://api-data-medical-room-tu.onrender.com/api/status")
      .then((response) => setStatus(response.data))
      .catch((error) =>
        console.error("Error fetching diagnosis options:", error)
      );

    // ดึงข้อมูลจาก API สำหรับ nursing activities
    axios
      .get("https://api-data-medical-room-tu.onrender.com/api/organization")
      .then((response) => setOrganization(response.data))
      .catch((error) =>
        console.error("Error fetching nursing activities options:", error)
      );
  }, []);

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalFormData = { ...formData };
      const authToken = localStorage.getItem("token");

      const response = await fetch(
        "https://api-data-medical-room-tu.onrender.com/api/patient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(finalFormData),
        }
      );

      if (response.status === 409) {
        // Handle 409 Conflict (Duplicate Data) - Show pop-up or notification
        alert("รหัสนักศึกษา/รหัสเลขประจำตัว ซ้ำ!!!");
      }

      if (!response.ok) {
        let error = await response.json();
        throw new Error(`Error: ${error.message}`);
      }

      if (response.status === 201) {
        setSuccessMessage(true);
      }

      // let newUser = await response.json();
      // console.log("Success:", newUser);

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
      });
    } catch (error) {
      console.error("Error:", error.message);
      setSuccessMessage(false); // Reset success message on error
    }
  };

  return (
    <>
      <div className="p-8 mt-2 bg-white shadow-lg rounded-md">
        <div>
          <div className="flex items-center mb-4 text-base">
            <TiUserAdd style={{ fontSize: "28px" }} />
            <h3 className=" font-semibold ml-2">เพิ่มข้อมูลผู้ใช้บริการใหม่</h3>
          </div>

          <div className="text-sm">
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                รหัสนักศึกษา/รหัสประจำตัวประชาชน *
                <br />
                <input
                  value={formData.student_id}
                  onChange={(e) =>
                    handleInputChange("student_id", e.target.value)
                  }
                  className="border p-2 w-full mt-2 rounded-md"
                  required
                />
              </label>

              <label className="block mb-2">
                คำนำหน้าชื่อ *
                <select
                  value={formData.prefix}
                  onChange={(e) => handleInputChange("prefix", e.target.value)}
                  className="border p-2 w-full mt-2 rounded-md"
                  required
                >
                  <option value="" disabled>
                    --เลือก--
                  </option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </label>

              <label className="block mb-2">
                ชื่อ *
                <br />
                <input
                  value={formData.patient_fname}
                  onChange={(e) =>
                    handleInputChange("patient_fname", e.target.value)
                  }
                  className="border p-2 w-full mt-2 rounded-md"
                  required
                />
              </label>

              <label className="block mb-2">
                นามสกุล *
                <br />
                <input
                  value={formData.patient_lname}
                  onChange={(e) =>
                    handleInputChange("patient_lname", e.target.value)
                  }
                  className="border p-2 w-full mt-2 rounded-md"
                  required
                />
              </label>

              <label className="block mb-2">
                สถานะ *
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="border p-2 w-full mt-2 rounded-md"
                  required
                >
                  <option value="" disabled>
                    --เลือก--
                  </option>
                  {statusOptions.map((option) => (
                    <option key={option._id} value={option.status_name}>
                      {option.status_name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2">
                คณะ/หน่วยงาน *
                <select
                  value={formData.organizations}
                  onChange={(e) =>
                    handleInputChange("organizations", e.target.value)
                  }
                  className="border p-2 w-full mt-2 rounded-md"
                  required
                >
                  <option value="" disabled>
                    --เลือก--
                  </option>
                  {organizationOptions.map((option) => (
                    <option key={option._id} value={option.organizations_name}>
                      {option.organizations_name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="block my-2">
                <label className="">วันเกิด</label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    handleInputChange("birthday", e.target.value)
                  }
                  className="border p-2 w-full mt-2 rounded-md"
                />
              </div>

              <label className="block mb-2">
                เบอร์ติดต่อ
                <br />
                <input
                  value={formData.phonenumber}
                  onChange={(e) =>
                    handleInputChange("phonenumber", e.target.value)
                  }
                  className="border p-2 w-full mt-2 rounded-md"
                />
              </label>

              <label className="block mb-2">
                อีเมล
                <br />
                <input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border p-2 w-full mt-2 rounded-md"
                />
              </label>

              <button
                type="submit"
                onClick={() => {
                  setSwalProps({
                    show: true,
                    title:
                      '<span class="font-thin">บันทึกข้อมูลเรียบร้อย</span>',
                    icon: "success",
                    fontSize: "16px",
                    confirmButtonText: "ปิด",
                  });
                }}
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 mt-4"
              >
                บันทึก
              </button>
              <button
                type="button"
                className="ml-6 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 mt-4"
                onClick={() => {
                  navigate(-1);
                }}
              >
                ยกเลิก
              </button>
            </form>
          </div>

          {successMessage && <SweetAlert2 {...swalProps} />}
        </div>
      </div>
    </>
  );
}
