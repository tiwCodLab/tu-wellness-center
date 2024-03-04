import { Form, redirect, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Spinners from "../../component/Spinner";
async function updateMedicalrecord(id, updateMedicalrecord) {
  try {
    const response = await axios.put(
      `https://api-data-medical-room-tu.onrender.com/api/medicalrecord/${id}`,
      updateMedicalrecord,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      alert("แก้ไขข้อมูลเรียบร้อย");
    } else {
      throw new Error(`Could not update medicalrecord ${id}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateAction({ request, params }) {
  const formData = await request.formData();
  let medicalrecord = Object.fromEntries(formData);
  if (!medicalrecord) {
    throw new Error("Error in updating Book " + params.id);
  }
  const { id } = params;
  const updatedMedicalrecord = { id, ...medicalrecord };
  await updateMedicalrecord(id, updatedMedicalrecord);
  return redirect("/record/page/1");
}

export default function Editmedicalreacord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicalrecord, setmedicalrecord] = useState();

  const [diagnosisOptions, setDiagnosisOptions] = useState([]);
  const [nursingActivitiesOptions, setNursingActivitiesOptions] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก API สำหรับ diagnosis
    axios
      .get("https://api-data-medical-room-tu.onrender.com/api/diagnosis")
      .then((response) => setDiagnosisOptions(response.data))
      .catch((error) =>
        console.error("Error fetching diagnosis options:", error)
      );

    // ดึงข้อมูลจาก API สำหรับ nursing activities
    axios
      .get("https://api-data-medical-room-tu.onrender.com/api/activities")
      .then((response) => setNursingActivitiesOptions(response.data))
      .catch((error) =>
        console.error("Error fetching nursing activities options:", error)
      );
  }, []);

  // Load initial product data from API
  useEffect(() => {
    async function fetchMedicalrecord() {
      const response = await fetch(`/api/medicalrecord/${id}`);
      const data = await response.json();
      setmedicalrecord(data);
    }
    fetchMedicalrecord();
  }, [id]);

  if (!medicalrecord) {
    return (
      <div>
        <Spinners />
      </div>
    );
  }

  return (
    <Form
      className="mt-2 p-4 bg-white shadow-lg rounded-md"
      replace
      method="put"
    >
      <label className="block mb-2 text-sm">
        อาการที่มารับบริการ
        <textarea
          type="text"
          defaultValue={medicalrecord.chief_complaint}
          name="chief_complaint"
          className="border p-2 w-full mt-2 text-base"
        />
      </label>

      <label className="block mb-2 text-sm">
        การตรวจร่างกายตามระบบที่สัมพันธ์กับความเจ็บป่วย
        <textarea
          type="text"
          defaultValue={medicalrecord.physical_exam}
          name="physical_exam"
          className="border p-2 w-full mt-2 text-base"
        />
      </label>

      <label className="block mb-2 text-sm">
        การวินิจฉัย
        <Select
          name="diagnosis"
          defaultValue={{
            label: medicalrecord.diagnosis,
            value: medicalrecord.diagnosis,
          }}
          onChange={(selectedOption) =>
            setmedicalrecord({
              ...medicalrecord,
              diagnosis: selectedOption.value,
            })
          }
          options={diagnosisOptions.map((option) => ({
            label: option.diagnosis_name,
            value: option.diagnosis_name,
          }))}
          className="w-full mt-2 rounded-md focus:outline-none focus:border-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm">
        กิจกรรมพยาบาล
        <Select
          name="nursing_activities"
          defaultValue={{
            label: medicalrecord.nursing_activities,
            value: medicalrecord.nursing_activities,
          }}
          onChange={(selectedOption) =>
            setmedicalrecord({
              ...medicalrecord,
              nursing_activities: selectedOption.value,
            })
          }
          options={nursingActivitiesOptions.map((option) => ({
            label: option.activities_name,
            value: option.activities_name,
          }))}
          className="w-full mt-2 rounded-md focus:outline-none focus:border-gray-500"
        />
      </label>

      <label className="block mb-2 text-sm">
        การให้คำแนะนำ/แผนการดูแลรักษา
        <textarea
          type="text"
          defaultValue={medicalrecord.recommendations}
          name="recommendations"
          className="border p-2 w-full mt-2 text-base"
        />
      </label>

      <label className="block mb-2 text-sm">
        หมายเหตุ
        <textarea
          type="text"
          defaultValue={medicalrecord.remarks}
          name="remarks"
          className="border p-2 w-full mt-2 text-base"
        />
      </label>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 mr-2"
        >
          บันทึก
        </button>
        <button
          className="border text-white bg-red-500  px-4 py-1 rounded-md hover:bg-red-700"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          ยกเลิก
        </button>
      </div>
    </Form>
  );
}
