import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMedicalSuppliesPage() {
  const [formData, setFormData] = useState({
    medical_supplies_id: "",
    medical_supplies_name: "",
    unit: "",
    price: "",
    quantity: "",
    properties: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalFormData = { ...formData };

      const response = await fetch(
        "https://api-data-medical-room-tu.onrender.com/api/medicalsupplies",
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
        alert("รหัสเวชภัณฑ์ซ้ำ!!!");
      }

      if (!response.ok) {
        let error = await response.json();
        throw new Error(`Error: ${error.message}`);
      }

      // Redirect to the homepage
      window.location.href = "/medicalsupplies";
      let newUser = await response.json();
      console.log("Success:", newUser);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="py-2">
      <div className="bg-white p-8 rounded-md">
        <h3 className="text-xl font-bold mb-4">เพิ่มข้อมูลเวชภัณฑ์</h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-700 mb-2">รหัสเวชภัณฑ์</label>
            <input
              type="text"
              value={formData.medical_supplies_id}
              onChange={(e) =>
                handleInputChange("medical_supplies_id", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">ชื่อเวชภัณฑ์</label>
            <input
              type="text"
              value={formData.medical_supplies_name}
              onChange={(e) =>
                handleInputChange("medical_supplies_name", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">หน่วย</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">ราคา</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">จำนวน</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">สรรพคุณ</label>
            <textarea
              type="text"
              value={formData.properties}
              onChange={(e) => handleInputChange("properties", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            บันทึก
          </button>

          <button
            type="button"
            className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              navigate("/medicalsupplies");
            }}
          >
            ยกเลิก
          </button>
        </form>
      </div>
    </div>
  );
}
