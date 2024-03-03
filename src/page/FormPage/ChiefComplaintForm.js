// ChiefComplaintForm.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ChiefComplaintForm = ({
  formDataStep2,
  handleInputChangeStep2,
  handleNext,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white rounded-md ">
        <h3 className="text-base text-center font-bold mb-5 p-2">
          อาการแรกรับ
        </h3>
      </div>
      <div className="p-4 bg-white shadow-lg rounded-md">
        <div>
          <label className="block mb-2 m-4">
            อาการที่มารับบริการ
            <br />
            <textarea
              className="w-full p-2 border rounded-md h-20"
              type="text"
              value={formDataStep2.chief_complaint}
              onChange={(e) =>
                handleInputChangeStep2("chief_complaint", e.target.value)
              }
            />
          </label>

          <label className="block mb-2 m-4">
            การตรวจร่างกายตามระบบที่สัมพันธ์กับความเจ็บป่วย
            <br />
            <textarea
              className="w-full p-2  border rounded-md h-40"
              value={formDataStep2.physical_exam}
              onChange={(e) =>
                handleInputChangeStep2("physical_exam", e.target.value)
              }
            />
          </label>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                navigate("/manage");
              }}
              className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              กลับ
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChiefComplaintForm;
