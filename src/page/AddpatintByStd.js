import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Log = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [statusOptions, setStatus] = useState([]);
  const [organizationOptions, setOrganization] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

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
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalFormData = { ...formData };

      const response = await fetch(
        "https://api-data-medical-room-tu.onrender.com/api/patient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      let newUser = await response.json();
      console.log("Success:", newUser);

      setSuccessMessage("บันทึกเรียบร้อยแล้ว");

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
      setSuccessMessage(null); // Reset success message on error
    }
  };

  return (
    <>
      <div className="mt-" style={{ textAlign: "right" }}></div>
      <div className="p-8 bg-white shadow-lg rounded-md">
        <div>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-4">
              เพิ่มข้อมูลผู้ใช้บริการใหม่
            </h3>

            <div style={{ textAlign: "right" }}>
              <div className="mb-2 text-black text-sm">
                *หากต้องการดึงข้อมูล สามารถใช้ รหัสนักศึกษา และ
                รหัสผ่านของมหาลัยในการดึงข้อมูลได้
              </div>
              <input
                type="text"
                placeholder="รหัสนักศึกษา"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border text-sm rounded-md px-3 py-1 mr-2 focus:outline-none"
              />
              <input
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border text-sm rounded-md px-3 py-1 mr-2 focus:outline-none"
              />
              <button
                onClick={handleVerify}
                className="bg-teal-600  text-white  px-4 rounded-md hover:bg-yellow-300 focus:outline-none"
              >
                รับข้อมูล
              </button>
            </div>
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
                  required // เพิ่ม attribute required เพื่อบังคับให้เลือกคำนำหน้าชื่อ
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
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 mt-4"
              >
                บันทึก
              </button>
              <button
                type="button"
                className="ml-6 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 mt-4"
                onClick={() => {
                  navigate("/");
                }}
              >
                ยกเลิก
              </button>
            </form>
          </div>

          {successMessage && (
            <div className="text-green-600 mt-4">{successMessage}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Log;
