import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";

async function updataPatient(id, updataPatient) {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.put(`/api/patient/${id}`, updataPatient, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      alert("แก้ไขข้อมูลเรียบร้อย");
    } else {
      throw new Error(`Could not update patient ${id}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    // You may choose to throw the error again to propagate it to the calling code
    throw error;
  }
}

export async function ActionPatient({ request, params }) {
  const formData = await request.formData();
  let patient = Object.fromEntries(formData);
  if (!patient) {
    throw new Error("Error in updating Patient " + params.id);
  }
  const { id } = params;
  const updatedpatient = {
    id,
    ...patient,
  };
  await updataPatient(id, updatedpatient);
  return redirect(`/patient`);
}

export default function UpdatePatientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState();
  let Auth = useAuth();
  let doctorName = Auth.user.username;

  const [statusOptions, setStatus] = useState([]);
  const [organizationOptions, setOrganization] = useState([]);

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

  // Load initial product data from APi

  useEffect(() => {
    const fetchPatient = async () => {
      const authToken = localStorage.getItem("token");
      try {
        const response = await axios.get(`/api/patient/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // เพิ่ม 1 เพื่อปรับเป็นรูปแบบที่เริ่มที่ 1
  const currentDay = currentDate.getDate();

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const formattedDate = `${currentDay}-${currentMonth}-${currentYear}`;
  const formattedTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

  return (
    <Form
      replace
      method="put"
      className="mx-auto p-4 bg-white shadow-md rounded-md mt-2 "
    >
      <div className="flex justify-end">
        <h1 style={{ fontSize: "12px" }}>
          แก้ไขล่าสุด :{" "}
          <span>
            {patient.Last_edited ? patient.Last_edited : "ยังไม่มีการแก้ไข"}
          </span>
          <p>
            โดย{" "}
            <span>{patient.edited_by ? patient.edited_by : "ไม่มีข้อมูล"}</span>{" "}
          </p>
        </h1>
      </div>

      <div className="text-sm px-4">
        <label className="block mb-2">
          รหัสนักศึกษา
          <input
            type="text"
            defaultValue={patient.student_id}
            name="student_id"
            className="w-full border mt-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          ชื่อ
          <input
            type="text"
            defaultValue={patient.patient_fname}
            name="patient_fname"
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          นามสกุล
          <input
            type="text"
            defaultValue={patient.patient_lname}
            name="patient_lname"
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          สถานะ
          <select
            name="status"
            value={patient.status}
            onChange={(e) => setPatient({ ...patient, status: e.target.value })}
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="status" disabled>
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
          คณะ/หน่วยงาน
          <select
            name="organizations"
            value={patient.organizations}
            onChange={(e) =>
              setPatient({ ...patient, organizations: e.target.value })
            }
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="organizations" disabled>
              --เลือก--
            </option>
            {organizationOptions.map((option) => (
              <option key={option._id} value={option.organizations_name}>
                {option.organizations_name}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          วันเกิด
          <input
            type="date"
            defaultValue={patient.birthday}
            name="birthday"
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mb-2">
          อีเมล
          <input
            type="text"
            defaultValue={patient.email}
            name="email"
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mb-2">
          เบอร์ติดต่อ
          <input
            type="text"
            defaultValue={patient.phonenumber}
            name="phonenumber"
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mb-2">
          วันที่แก้ไข
          <input
            type="text"
            defaultValue={`${formattedTime} ${formattedDate}`}
            name="Last_edited"
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
            readOnly
          />
        </label>

        <label className="block mb-2">
          ผู้แก้ไข
          <input
            type="text"
            value={doctorName}
            name="edited_by"
            className="w-full border p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
            readOnly
          />
        </label>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500 focus:outline-none"
        >
          ยกเลิก
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          บันทึก
        </button>
      </div>
    </Form>
  );
}
