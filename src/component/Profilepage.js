import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../utils/AuthProvider";

async function getProfile(user) {
  const authToken = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `https://api-data-medical-room-tu.onrender.com/api/user/${user}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const ProfilePage = () => {
  const auth = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile(auth.user.username);
        setData(res);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchData();
  }, [auth.user.username]);

  return (
    <div className="py-2 px-1">
      {/* ข้อมูลผู้ใช้ */}
      {data && (
        <div className="bg-white overflow-hidden  sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl font-semibold leading-6 text-gray-900">
              ข้อมูลส่วนตัว
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              ข้อมูลส่วนตัวของผู้ใช้
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ชื่อ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.firstname}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">นามสกุล</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.lastname}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  ขื่อยูสเซอร์
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.username}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">สถานะ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {data.roles.Admin
                    ? "ผู้ดูแลระบบ"
                    : data.roles.Nurse
                    ? "พยาบาล"
                    : data.roles.Psychologist
                    ? "นักจิตวิทยา"
                    : "อื่น ๆ"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
