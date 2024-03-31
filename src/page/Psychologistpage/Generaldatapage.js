import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

const ProfileInfoItem = ({ label, value }) => (
  <div className="flex mb-2">
    <div className="w-1/3 font-semibold">{label}</div>
    <div className="w-2/3">{value}</div>
  </div>
);

export default function Generaldata() {
  const [general, setGeneral] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/psypatient/${id}`
        ); // Use Axios to fetch data
        setGeneral(response.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container pt-6">
      {general && (
        <div className="bg-white shadow rounded-sm p-10">
          <ProfileInfoItem label="รหัสนักศึกษา" value={general.student_id} />
          <ProfileInfoItem label="ชื่อ" value={general.patient_fname} />
          <ProfileInfoItem label="นามสกุล" value={general.patient_lname} />
          <ProfileInfoItem label="สถานะ" value={general.status} />
          <ProfileInfoItem label="คณะ/หน่วยงาน" value={general.organizations} />
          <ProfileInfoItem label="อายุ" value={general.age} />
          <ProfileInfoItem label="อีเมล" value={general.email} />
          <ProfileInfoItem label="เบอร์โทร" value={general.phonenumber} />

          <div className="flex justify-between">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="mt-4 bg-gray-500 text-white px-5 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              กลับ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
