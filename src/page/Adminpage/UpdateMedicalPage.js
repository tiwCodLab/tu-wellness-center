import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

async function updateMedication(id, updatedMedication) {
  try {
    const response = await axios.put(
      `https://api-data-medical-room-tu.onrender.com/api/medication/${id}`,
      updatedMedication,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Could not update medication ${id}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function ActionMedication({ params, updatedMedication }) {
  const { id } = params;
  await updateMedication(id, updatedMedication);
}

export default function UpdateMedicalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medication, setMedication] = useState({
    medication_id: "",
    medication_name: "",
    unit: "",
    price: "",
    properties: "",
    stock: "",
    quantiused_quantityty: "",
  });

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await axios.get(
          `https://api-data-medical-room-tu.onrender.com/api/medication/${id}`
        );
        setMedication(response.data);
      } catch (error) {
        console.error("Error fetching medication:", error);
      }
    };

    fetchMedication();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a function to handle the form submission
      await ActionMedication({ params: { id }, updatedMedication: medication });

      // Add any additional logic or redirection after submission if needed
      navigate(`/medication/${medication._id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, display an error message, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication((prevMedication) => ({ ...prevMedication, [name]: value }));
  };

  return (
    <>
      <div className="py-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 "
        >
          <h1 className="text-xl font-bold mb-6">แก้ไขข้อมูลยา</h1>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 block mb-2">รหัสยา</label>
              <input
                type="text"
                value={medication.medication_id}
                name="medication_id"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">ชื่อยา</label>
              <input
                type="text"
                value={medication.medication_name}
                name="medication_name"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">หน่วย</label>
              <input
                type="text"
                value={medication.unit}
                name="unit"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">ราคา</label>
              <input
                type="number"
                value={medication.price}
                name="price"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">จำนวน</label>
              <input
                type="number"
                value={medication.stock}
                name="stock"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">สรรพคุณ</label>
              <input
                type="text"
                value={medication.properties}
                name="properties"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => {
                navigate(`/medication/${medication._id}`);
              }}
              className=" bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
