import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

async function updateMedicationSupplies(id, updatedMedicationSupplies) {
  try {
    let response = await fetch(`/api/medicalsupplies/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedMedicationSupplies),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Could not update medicalsupplies ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function ActionMedicationSupplies({
  params,
  updatedMedicationSupplies,
}) {
  const { id } = params;
  await updateMedicationSupplies(id, updatedMedicationSupplies);
}

export default function UpdateMedicalSupplies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicationsupplies, setMedicationsupplies] = useState({
    medical_supplies_id: "",
    medical_supplies_name: "",
    unit: "",
    price: "",
    stock: "",
    properties: "",
  });

  useEffect(() => {
    async function fetchMedication() {
      const response = await fetch(`/api/medicalsupplies/${id}`);
      const data = await response.json();
      setMedicationsupplies(data);
    }
    fetchMedication();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a function to handle the form submission
      await ActionMedicationSupplies({
        params: { id },
        updatedMedicationSupplies: medicationsupplies,
      });

      // Add any additional logic or redirection after submission if needed
      navigate(`/medicalsupplies/${medicationsupplies._id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, display an error message, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicationsupplies((prevMedication) => ({
      ...prevMedication,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="py-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-md shadow-md"
        >
          <h1 className="text-xl font-bold mb-6">แก้ไขข้อมูลเวชภัณฑ์</h1>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 block mb-2">รหัสเวชภัณฑ์</label>
              <input
                type="text"
                value={medicationsupplies.medical_supplies_id}
                name="medical_supplies_id"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">ชื่อเวชภัณฑ์</label>
              <input
                type="text"
                value={medicationsupplies.medical_supplies_name}
                name="medical_supplies_name"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">หน่วย</label>
              <input
                type="text"
                value={medicationsupplies.unit}
                name="unit"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">ราคา</label>
              <input
                type="number"
                value={medicationsupplies.price}
                name="price"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">จำนวน</label>
              <input
                type="number"
                value={medicationsupplies.stock}
                name="stock"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-2">สรรพคุณ</label>
              <input
                type="text"
                value={medicationsupplies.properties}
                name="properties"
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              บันทึก
            </button>

            <button
              type="button"
              onClick={() => {
                navigate(`/medicalsupplies/${medicationsupplies._id}`);
              }}
              className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
