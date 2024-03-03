import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddmedicationPage() {
  const [formData, setFormData] = useState({
    medication_id: "",
    medication_name: "",
    unit: "",
    price: "",
    properties: "",
    stock: "",
    quantiused_quantityty: "",
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
        "https://api-data-medical-room-tu.onrender.com/api/medication",
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
        alert("รหัสยาซ้ำ!!!");
      }

      if (!response.ok) {
        let error = await response.json();
        throw new Error(`Error: ${error.message}`);
      }

      // Redirect to the homepage
      window.location.href = "/medication";
      let newUser = await response.json();
      console.log("Success:", newUser);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="py-2">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4">เพิ่มข้อมูลยา</h3>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-700 mb-1">รหัสยา</label>
            <input
              type="text"
              value={formData.medication_id}
              onChange={(e) =>
                handleInputChange("medication_id", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ชื่อยา</label>
            <input
              type="text"
              value={formData.medication_name}
              onChange={(e) =>
                handleInputChange("medication_name", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">หน่วย</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ราคา</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">จำนวน</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">สรรพคุณ</label>
            <textarea
              type="text"
              value={formData.properties}
              onChange={(e) => handleInputChange("properties", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
          >
            บันทึก
          </button>

          <button
            type="button"
            className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              navigate("/medication");
            }}
          >
            ยกเลิก
          </button>
        </form>
      </div>
    </div>
  );
}
