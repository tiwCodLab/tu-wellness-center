import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";

import axios from "axios";

async function updateActivities(id, updatedActivities) {
  try {
    const response = await axios.put(
      `https://api-data-medical-room-tu.onrender.com/api/activities/${id}`,
      updatedActivities,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Could not update activities ${id}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function Actionactivities({ params, updatedactivities }) {
  const { id } = params;
  await updateActivities(id, updatedactivities);
}

export default function UpdateNursingActivities() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activities, setactivities] = useState({
    activities_id: "",
    activities_name: "",
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `https://api-data-medical-room-tu.onrender.com/api/activities/${id}`
        );
        setactivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a function to handle the form submission
      await Actionactivities({ params: { id }, updatedactivities: activities });

      // Add any additional logic or redirection after submission if needed
      navigate(`/activities`);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, display an error message, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setactivities((prevactivities) => ({ ...prevactivities, [name]: value }));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      replace
      method="put"
      className="max-w-md mx-auto mt-8"
    >
      <div className="bg-white p-10 rounded-md">
        <label className="block mb-4">
          <div className="text-black">รหัสโรค</div>

          <input
            type="text"
            value={activities.activities_id}
            name="activities_id"
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label className="block mb-4">
          <div className="text-black">ชื่อโรค</div>
          <input
            type="text"
            value={activities.activities_name}
            name="activities_name"
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => {
              navigate(`/disease`);
            }}
            className="bg-red-600 text-white px-4 rounded-md hover:bg-red-500"
          >
            ยกเลิก
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4  rounded-md hover:bg-blue-700"
          >
            บันทึก
          </button>
        </div>
      </div>
    </Form>
  );
}
