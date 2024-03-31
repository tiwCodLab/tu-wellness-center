import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

async function updateDiagnosis(id, updatedDiagnosis) {
  try {
    const response = await axios.put(`/api/diagnosis/${id}`, updatedDiagnosis, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`Could not update diagnosis ${id}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function ActionDiagnosis({ params, updatedDiagnosis }) {
  const { id } = params;
  await updateDiagnosis(id, updatedDiagnosis);
}

export default function UpdateDiagnosisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState({
    diagnosis_id: "",
    diagnosis_name: "",
  });

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const response = await axios.get(`/api/diagnosis/${id}`);
        setDiagnosis(response.data);
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
      }
    };

    fetchDiagnosis();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a function to handle the form submission
      await ActionDiagnosis({ params: { id }, updatedDiagnosis: diagnosis });

      // Add any additional logic or redirection after submission if needed
      navigate(`/disease`);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, display an error message, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiagnosis((prevDiagnosis) => ({ ...prevDiagnosis, [name]: value }));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      replace
      method="put"
      className="max-w-xl mx-auto mt-4"
    >
      <div className="bg-white p-10 rounded-md">
        <label className="block mb-4">
          <div className="text-black">รหัสโรค</div>

          <input
            type="text"
            value={diagnosis.diagnosis_id}
            name="diagnosis_id"
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label className="block mb-4">
          <div className="text-black">ชื่อโรค</div>
          <input
            type="text"
            value={diagnosis.diagnosis_name}
            name="diagnosis_name"
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
            className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500"
          >
            ยกเลิก
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700"
          >
            บันทึก
          </button>
        </div>
      </div>
    </Form>
  );
}
