import React from "react";

const MedicalrecordForm = ({
  formDataStep3,
  handleInputChangeStep3,
  filteredDiagnosisOptions,
  filterednursingActivitiesOptions,
  medicationOptions,
  medicalSupOptions,
  handleMenuClick,
  currentStep,
  handleMedicationChange,
  addMedication,
  handleRemoveMedication,
}) => (
  <>
    <div className="bg-white rounded-md ">
      <h3 className="text-base text-center font-bold mb-5 p-2">
        บันทึกเวชระเบียน
      </h3>
    </div>
    <forom>
      <div className="p-8 bg-white shadow-lg rounded-md">
        <div>
          <label className="block mb-2">
            การวินิจฉัย
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              value={formDataStep3.diagnosis}
              onChange={(e) =>
                handleInputChangeStep3("diagnosis", e.target.value)
              }
              placeholder="พิมพ์ข้อมูลเพื่อค้นหาการวินิจฉัย"
            />
            <div className="z-10 mt-1 w-full max-h-60 overflow-y-auto bg-gray-200 rounded-md shadow-sm">
              {filteredDiagnosisOptions.map((option, index) => (
                <div key={option._id}>
                  <div
                    onClick={() =>
                      handleInputChangeStep3("diagnosis", option.diagnosis_name)
                    }
                    className="cursor-pointer hover:bg-gray-100 pl-2 py-1 rounded-md"
                  >
                    {option.diagnosis_name}
                  </div>
                  {index !== filteredDiagnosisOptions.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </label>

          <label className="block mb-2">
            กิจกรรมพยาบาล
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              value={formDataStep3.nursing_activities}
              onChange={(e) =>
                handleInputChangeStep3("nursing_activities", e.target.value)
              }
              placeholder="พิมพ์ข้อมูลเพื่อค้นหากิจกรรมพยาบาล"
            />
            <div className="z-10 mt-1 w-full max-h-60 overflow-y-auto bg-gray-200 rounded-md shadow-sm">
              {filterednursingActivitiesOptions.map((option, index) => (
                <div key={option._id}>
                  <div
                    onClick={() =>
                      handleInputChangeStep3(
                        "nursing_activities",
                        option.activities_name
                      )
                    }
                    className="cursor-pointer hover:bg-gray-100 pl-2 py-1 rounded-md"
                  >
                    {option.activities_name}
                  </div>
                  {index !== filterednursingActivitiesOptions.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </label>

          <label className="block mb-2">
            การให้คำแนะนำ/แผนการดูแลรักษา
            <textarea
              className="w-full p-2 border rounded-md"
              value={formDataStep3.recommendations}
              onChange={(e) =>
                handleInputChangeStep3("recommendations", e.target.value)
              }
            />
          </label>

          {/* Input fields for medications can be dynamically added */}
          {formDataStep3.medications.map((medication, index) => (
            <div key={index}>
              <label>
                ชื่อยา
                <input
                  type="text"
                  name={`medications[${index}].medication_name`}
                  value={medication.medication_name}
                  onChange={(e) => handleMedicationChange(index, e)}
                />
              </label>
              <label>
                จำนวน
                <input
                  type="number"
                  name={`medications[${index}].quantity`}
                  value={medication.quantity}
                  onChange={(e) => handleMedicationChange(index, e)}
                />
              </label>
              <button
                type="button"
                onClick={() => handleRemoveMedication(index)}
              >
                ลบรายการ
              </button>
            </div>
          ))}
          <button type="button" onClick={addMedication}>
            เพิ่มการจ่ายยา
          </button>

          {/* <label className="block mb-2">
          การจ่ายยา
          <select
            className="w-full p-2 border rounded-md"
            value={formDataStep3.medication_prescription}
            onChange={(e) =>
              handleInputChangeStep3("medication_prescription", e.target.value)
            }
          >
            <option value="" disabled>
              --เลือก--
            </option>
            {medicationOptions.map((option) => (
              <option key={option._id} value={option.medication_name}>
                {option.medication_name}
              </option>
            ))}
           
          </select>
        </label>

        <label className="block mb-2">
          การใช้เวชภัณฑ์
          <select
            className="w-full p-2 border rounded-md"
            value={formDataStep3.medical_supplies}
            onChange={(e) =>
              handleInputChangeStep3("medical_supplies", e.target.value)
            }
          >
            <option value="" disabled>
              --เลือก--
            </option>
            {medicalSupOptions.map((option) => (
              <option key={option._id} value={option.medical_supplies_name}>
                {option.medical_supplies_name}
              </option>
            ))}
          </select>
        </label> */}

          <label className="block mb-2">
            หมายเหตุ
            <textarea
              className="w-full p-2 border rounded-md"
              value={formDataStep3.remarks}
              onChange={(e) =>
                handleInputChangeStep3("remarks", e.target.value)
              }
            />
          </label>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleMenuClick.bind(this, currentStep - 1)}
              className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
            >
              ก่อนหน้า
            </button>
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </forom>
  </>
);

export default MedicalrecordForm;
