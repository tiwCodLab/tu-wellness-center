import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function RegisterForm() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    roles: {
      Admin: 5150,
      Nurse: 1984,
      Psychologist: 2001,
    },
  });

  // Function เพิ่มข้อมูลผ่าน API
  const addUserData = async () => {
    try {
      const response = await fetch(
        "https://api-data-medical-room-tu.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.status === 409) {
        // Handle 409 Conflict (Duplicate Data) - Show pop-up or notification
        alert("ชื่อยูเซอร์ซ้ำ!!! โปรดใช้ชื่อ ยูสเซอร์ อื่น");
      }

      if (response.status === 201) {
        alert("สมัครแล้วเรียบร้อย");
      }

      if (!response.ok) {
        throw new Error("Failed to add user data");
      }

      // อัปเดต state หลังจากเพิ่มข้อมูลสำเร็จ
      setNewUser({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        roles: {
          Admin: 5150,
          Nurse: 1984,
          Psychologist: 2001,
        },
      });

      console.log("User data added successfully");
    } catch (error) {
      console.error("Error adding user data:", error.message);
    }
  };
  // Function จัดการการเปลี่ยนแปลงข้อมูลใน input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "roles") {
      // ถ้ามีการเปลี่ยนแปลงใน roles, ให้สร้าง object ใหม่เฉพาะ roles ที่ถูกเลือก
      setNewUser((prevUser) => ({
        ...prevUser,
        roles: {
          [value]: prevUser.roles[value],
        },
      }));
    } else {
      // สำหรับ input fields อื่น ๆ ให้ใช้เหมือนเดิม
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-6 mt-2 bg-white rounded-md shadow-md mx-2 ">
      <h1 className="text-xl font-bold mb-4">เพิ่มผู้ใช้งานระบบ</h1>
      <div className="text-sm">
        <div className="mb-4">
          <label className="block mb-2">
            ชื่อ
            <input
              type="text"
              name="firstname"
              value={newUser.firstname}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-2 w-full focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            นามสกุล
            <input
              type="text"
              name="lastname"
              value={newUser.lastname}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 w-full focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            ยูสเซอร์
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            รหัสผ่าน
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            สถานะการใช้งาน
            <select
              name="roles"
              value={newUser.roles}
              onChange={handleInputChange}
              className="border rounded-md px-3 py-2 w-full"
            >
              <option value="">คลิกเพื่อเลือก</option>
              <option value="Admin">ผู้ดูแลระบบ</option>
              <option value="Nurse">พยาบาล</option>
              <option value="Psychologist">นักจิตวิทยา</option>
            </select>
          </label>
        </div>
      </div>
      <div className="my-2">
        <button
          type="button"
          onClick={addUserData}
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700"
        >
          สมัครใช้งาน
        </button>
        <button
          type="button"
          className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-md w-24 focus:outline-none focus:shadow-outline"
          onClick={() => {
            navigate("/users");
          }}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
