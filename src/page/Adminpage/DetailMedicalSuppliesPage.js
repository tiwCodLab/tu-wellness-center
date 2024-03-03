import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import axios from "axios";

export async function getDetailmedicalSupplies(id) {
  try {
    const response = await axios.get(
      `https://api-data-medical-room-tu.onrender.com/api/medicalsupplies/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const LoadgetDetailmedicalSupplies = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getDetailmedicalSupplies(id);
    console.log(id);
    return res;
  } catch (error) {
    throw new Error("medicalsupplies with id: " + id + " could not be found.");
  }
};

export default function DetailsMedicalPageSupplies() {
  const Detailmedicalsupplies = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <div className="mt-2 bg-white p-8 rounded-md shadow-md">
          <h1 className="text-xl font-bold mb-6">รายละเอียด</h1>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 mb-2">รหัสยา:</p>
              <p className="font-semibold">
                {Detailmedicalsupplies.medical_supplies_id}
              </p>
            </div>

            <div>
              <p className="text-gray-700 mb-2">ชื่อยา:</p>
              <p className="font-semibold">
                {Detailmedicalsupplies.medical_supplies_name}
              </p>
            </div>

            <div>
              <p className="text-gray-700 mb-2">หน่วย:</p>
              <p className="font-semibold">{Detailmedicalsupplies.unit}</p>
            </div>

            <div>
              <p className="text-gray-700 mb-2">ราคา:</p>
              <p className="font-semibold">{Detailmedicalsupplies.price}</p>
            </div>

            <div>
              <p className="text-gray-700 mb-2">จำนวนคงเหลือ:</p>
              <p className="font-semibold">{Detailmedicalsupplies.stock}</p>
            </div>

            <div>
              <p className="text-gray-700 mb-2">สรรพคุณ:</p>
              <p className="font-semibold">
                {Detailmedicalsupplies.properties}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 px-2 font-bold">
        <button
          className="flex items-center px-4  text-teal-black rounded-md hover:text-teal-500"
          type="button"
          onClick={() => {
            navigate("/medicalsupplies");
          }}
        >
          <FaChevronCircleLeft className="mr-2 h-8 w-8" /> กลับ
        </button>

        <Link to={`edit`} className="inline-block text-black font-bold px-4 ">
          <div className="flex items-center">
            <p className="mr-2 text-black-500">แก้ไข</p>
            <BiEdit className="text-white hover:bg-yellow-700 text-xl mr-2 bg-yellow-500 p-1.5 h-7 w-7 rounded-md " />
          </div>
        </Link>
      </div>
    </>
  );
}
