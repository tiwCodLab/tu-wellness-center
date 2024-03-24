import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNursingActivitiesPage() {
  const [formData, setFormData] = useState({
    activities_id: "",
    activities_name: "",
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
        "https://api-data-medical-room-tu.onrender.com/api/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalFormData),
        }
      );

      if (!response.ok) {
        let error = await response.json();
        throw new Error(`Error: ${error.message}`);
      }

      // Redirect to the homepage
      window.location.href = "/activities";
      let newUser = await response.json();
      console.log("Success:", newUser);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="py-2">
      <div className="bg-white p-8 rounded-md">
        <h3 className="text-xl font-bold mb-6">เพิ่มข้อมูลกิจกรรมพยาบาล</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              รหัสกิจกรรมพยาบาล
            </label>
            <input
              type="text"
              value={formData.activities_id}
              onChange={(e) =>
                handleInputChange("activities_id", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              ชื่อกิจกรรมพยาบาล
            </label>
            <input
              value={formData.activities_name}
              onChange={(e) =>
                handleInputChange("activities_name", e.target.value)
              }
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
              navigate("/activities");
            }}
          >
            ยกเลิก
          </button>
        </form>
      </div>
    </div>
  );
}
