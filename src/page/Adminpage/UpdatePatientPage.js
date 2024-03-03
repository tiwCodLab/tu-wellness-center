import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";

async function updataPatient(id, updataPatient) {
  try {
    let response = await fetch(`/api/patient/${id}`, {
      method: "PUT",
      body: JSON.stringify(updataPatient),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((res) => {
      if (res.ok) {
        alert("แก้ไขข้อมูลเรียบร้อย");
      } else {
        throw Error({ error: `Could not update patient ${id}` });
      }
      return res.json();
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function ActionPatient({ request, params }) {
  const formData = await request.formData();

  let patient = Object.fromEntries(formData);
  if (!patient) {
    throw new Error("Error in updating Patient " + params.id);
  }
  const { id } = params;
  const updatedpatient = { id, ...patient };
  await updataPatient(id, updatedpatient);
  return redirect(`/patient/page/1`);
}

export default function UpdatePatientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState();

  const [statusOptions, setStatus] = useState([]);
  const [organizationOptions, setOrganization] = useState([]);

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

  // Load initial product data from APi
  useEffect(() => {
    async function fetchpatient() {
      const response = await fetch(`/api/patient/${id}`);
      const data = await response.json();
      setPatient(data);
    }
    fetchpatient();
  }, [id]);

  if (!patient) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <Form
      replace
      method="put"
      className="mx-auto p-4 bg-white shadow-md rounded-md mt-2 "
    >
      <div className="text-sm ">
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
          อายุ
          <input
            type="text"
            defaultValue={patient.age}
            name="age"
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
