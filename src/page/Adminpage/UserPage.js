import React, { useEffect, useState } from "react";
import useFetchPrivate from "../../utils/useFetchPrivate";
import { Link } from "react-router-dom";
import Spinners from "../../component/Spinner";
import { FaUser } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

import nurse from "../../assets/nurse.png";
import admin from "../../assets/admin.png";
import psy from "../../assets/psy.png";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const { loading, callFetch } = useFetchPrivate();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const getuserData = async () => {
      try {
        const { response, data } = await callFetch("/api/user", {
          method: "GET", // เปลี่ยนเป็นเมทอด HTTP ตามที่คุณต้องการ
          // อาจจะมีคอนฟิกเพิ่มเติมที่ต้องการส่งไปยังเซิร์ฟเวอร์อื่น ๆ ได้ตรงนี้
        });
        if (response.ok) {
          setUserData(data);
          setDataLoaded(true); // Set dataLoaded to true when data is loaded
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Only call API when dataLoaded is false
    if (!dataLoaded) {
      getuserData();
    }
  }, [callFetch, dataLoaded]); // Add dataLoaded as a dependency
  return (
    <>
      {loading ? (
        <div className="rounded-lg mt-2 shadow-default">
          <div className="rounded-lg border border-stroke bg-white px-6 pt-4 pb-10 shadow-default">
            <div className="max-w-full overflow-x-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center  ">
                  <FaUser style={{ fontSize: "22px" }} />
                  <h5 className="font-bold ml-2" style={{ fontSize: "18px" }}>
                    ผู้ใช้งานระบบ
                  </h5>
                </div>
                <div>
                  <Link
                    to={"/users/adduser"}
                    className="flex items-center text-sm font-bold  mr-6 bg-teal-500 text-white px-3 py-1.5 rounded-3xl hover:bg-teal-700"
                  >
                    <MdAddCircle className="w-7 h-7 mr-2" />
                    เพิ่มผู้ใช้งานใหม่
                  </Link>
                </div>
              </div>
            </div>
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="text-center">
                    <div className="flex items-center justify-center ">
                      <Spinners />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-lg mt-2  bg-gray-50 px-6 pt-4 pb-10 shadow-default">
          <div className="max-w-full overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center  ">
                <FaUser style={{ fontSize: "22px" }} />
                <h5 className="font-bold ml-2" style={{ fontSize: "18px" }}>
                  ผู้ใช้งานระบบ
                </h5>
              </div>
              <div>
                <Link
                  to={"/users/adduser"}
                  className="flex items-center text-sm font-bold  mr-6 bg-teal-500 text-white px-3 py-1.5 rounded-3xl hover:bg-teal-400"
                >
                  <MdAddCircle className="w-7 h-7 mr-2" />
                  เพิ่มผู้ใช้งานใหม่
                </Link>
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-900">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-200 text-center dark:text-black">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                      ชื่อ
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      นามสกุล
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      ชื่อยูสเซอร์
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      สถานะการใช้งาน
                    </th>

                    <th scope="col" className="px-6 py-3 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:border-gray-100 hover:bg-gray-100"
                    >
                      <td className="px-4 text-center ">{item.firstname}</td>
                      <td className="py-2 px-4 text-center">{item.lastname}</td>
                      <td className="py-2 px-4 text-center">{item.username}</td>
                      <td className="py-2 px-4 text-center">
                        {item.roles.Admin
                          ? "ผู้ดูแลระบบ"
                          : item.roles.Nurse
                          ? "พยาบาล"
                          : item.roles.Psychologist
                          ? "นักจิตวิทยา"
                          : "อื่น ๆ"}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {item.roles.Admin ? (
                          <img
                            src={admin}
                            alt="คำอธิบายรูปภาพ"
                            width="40"
                            height="40"
                            className="rounded-full bg-gray-400"
                            loading="lazy"
                          />
                        ) : item.roles.Nurse ? (
                          <img
                            src={nurse}
                            alt="คำอธิบายรูปภาพ"
                            width="40"
                            height="40"
                            className="rounded-full bg-gray-400"
                            loading="lazy"
                          />
                        ) : item.roles.Psychologist ? (
                          <img
                            src={psy}
                            alt="คำอธิบายรูปภาพ"
                            width="40"
                            height="40"
                            className="rounded-full bg-gray-400"
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src={nurse}
                            alt="คำอธิบายรูปภาพ"
                            width="40"
                            height="40"
                            className="rounded-full bg-gray-400"
                            loading="lazy"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
