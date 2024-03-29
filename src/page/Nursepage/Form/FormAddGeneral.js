import React from "react";

const FormAddGeneral = ({
  formData,
  handleInputChange,
  statusOptions,
  organizationOptions,
}) => {
  return (
    <div className="p-4 flex justify-center items-center">
      <div className="text-sm">
        <div className="mb-2">
          <label className="block mb-2 font-semibold">
            รหัสนักศึกษา/รหัสประจำตัวประชาชน *
            <br />
            <input
              value={formData.student_id}
              onChange={(e) => handleInputChange("student_id", e.target.value)}
              className="border p-2 w-full mt-2 rounded-md font-normal"
              required
            />
          </label>

          <label className="block mb-2 font-semibold">
            คำนำหน้าชื่อ *
            <select
              value={formData.prefix}
              onChange={(e) => handleInputChange("prefix", e.target.value)}
              className="border p-2 w-full mt-2 rounded-md font-normal"
              required // เพิ่ม attribute required เพื่อบังคับให้เลือกคำนำหน้าชื่อ
            >
              <option value="" disabled>
                --เลือก--
              </option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </label>

          <label className="block mb-2 font-semibold">
            ชื่อ *
            <br />
            <input
              value={formData.patient_fname}
              onChange={(e) =>
                handleInputChange("patient_fname", e.target.value)
              }
              className="border p-2 w-full mt-2 rounded-md font-normal"
              required
            />
          </label>

          <label className="block mb-2 font-semibold">
            นามสกุล *
            <br />
            <input
              value={formData.patient_lname}
              onChange={(e) =>
                handleInputChange("patient_lname", e.target.value)
              }
              className="border p-2 w-full mt-2 rounded-md font-normal"
              required
            />
          </label>

          <label className="block mb-2 font-semibold">
            สถานะ *
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="border p-2 w-full mt-2 rounded-md font-normal"
              required
            >
              <option value="" disabled>
                --เลือก--
              </option>
              {statusOptions.map((option) => (
                <option key={option._id} value={option.status_name}>
                  {option.status_name}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-2 font-semibold">
            คณะ/หน่วยงาน *
            <select
              value={formData.organizations}
              onChange={(e) =>
                handleInputChange("organizations", e.target.value)
              }
              className="border p-2 w-full mt-2 rounded-md font-normal"
              required
            >
              <option value="" disabled>
                --เลือก--
              </option>
              {organizationOptions.map((option) => (
                <option key={option._id} value={option.organizations_name}>
                  {option.organizations_name}
                </option>
              ))}
            </select>
          </label>

          <div className="block my-2">
            <label className="">วันเกิด</label>
            <input
              type="date"
              value={formData.birthday}
              onChange={(e) => handleInputChange("birthday", e.target.value)}
              className="border p-2 w-full mt-2 rounded-md font-normal"
            />
          </div>

          <label className="block mb-2 font-semibold">
            เบอร์ติดต่อ
            <br />
            <input
              value={formData.phonenumber}
              onChange={(e) => handleInputChange("phonenumber", e.target.value)}
              className="border p-2 w-full mt-2 rounded-md font-normal"
            />
          </label>

          <label className="block mb-2 font-semibold">
            อีเมล
            <br />
            <input
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border p-2 w-full mt-2 rounded-md font-normal"
            />
          </label>

          <h3 className="text-base leading-6 text-center font-bold text-gray-900 mt-4">
            ซักประวัติเพิ่มเติม
          </h3>

          <label className="block mb-2 font-semibold ">แพ้ยา</label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="allergy_medicine_no"
              name="allergy_medicine"
              value="ไม่มี"
              checked={formData.allergy_medicine === "ไม่มี"}
              onChange={(e) =>
                handleInputChange("allergy_medicine", e.target.value)
              }
              className="mr-2  h-5 w-5 rounded-full"
            />
            <label htmlFor="allergy_medicine_no" className="mr-40">
              ไม่มี
            </label>

            <input
              type="radio"
              id="allergy_medicine_yes"
              name="allergy_medicine"
              value="มี"
              checked={formData.allergy_medicine === "มี"}
              onChange={(e) =>
                handleInputChange("allergy_medicine", e.target.value)
              }
              className="ml-20 mr-2  h-5 w-5 rounded-full"
            />
            <label htmlFor="allergy_medicine_yes">มี</label>
          </div>

          {formData.allergy_medicine === "มี" && (
            <label className="block">
              <input
                type="text"
                value={formData.allergy_medicine_detail}
                onChange={(e) =>
                  handleInputChange("allergy_medicine_detail", e.target.value)
                }
                className="border rounded-md p-2 w-full focus:outline-none"
              />
            </label>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold ">แพ้อาหาร</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="allergy_food_no"
              name="allergy_food"
              value="ไม่มี"
              checked={formData.allergy_food === "ไม่มี"}
              onChange={(e) =>
                handleInputChange("allergy_food", e.target.value)
              }
              className="mr-2 h-5 w-5 rounded-full"
            />
            <label htmlFor="allergy_food_no" className="mr-40">
              ไม่มี
            </label>

            <input
              type="radio"
              id="allergy_food_yes"
              name="allergy_food"
              value="มี"
              checked={formData.allergy_food === "มี"}
              onChange={(e) =>
                handleInputChange("allergy_food", e.target.value)
              }
              className="ml-20 mr-2  h-5 w-5 rounded-full"
            />
            <label htmlFor="allergy_food_yes">มี</label>
          </div>

          {formData.allergy_food === "มี" && (
            <div className="mt-2">
              <label className="block">
                <input
                  type="text"
                  value={formData.allergy_food_detail}
                  onChange={(e) =>
                    handleInputChange("allergy_food_detail", e.target.value)
                  }
                  className="border rounded-md p-2 w-full focus:outline-none "
                />
              </label>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold ">การสูบบุหรี่</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="smoking_status_no"
              name="smoking_status"
              value="ไม่มี"
              checked={formData.smoking_status === "ไม่มี"}
              onChange={(e) =>
                handleInputChange("smoking_status", e.target.value)
              }
              className="mr-2 h-5 w-5 rounded-full"
            />
            <label htmlFor="smoking_status_no" className="mr-40">
              ไม่มี
            </label>

            <input
              type="radio"
              id="smoking_status_yes"
              name="smoking_status"
              value="มี"
              checked={formData.smoking_status === "มี"}
              onChange={(e) =>
                handleInputChange("smoking_status", e.target.value)
              }
              className="ml-20 mr-2  h-5 w-5 rounded-full"
            />
            <label htmlFor="smoking_status_yes">มี</label>
          </div>

          {formData.smoking_status === "มี" && (
            <div className="mt-2">
              <label className="block">
                ระบุ (กี่มวน/วัน){" "}
                <input
                  type="text"
                  value={formData.smoking_status_detail}
                  onChange={(e) =>
                    handleInputChange("smoking_status_detail", e.target.value)
                  }
                  className="border rounded-md p-2 w-full focus:outline-none"
                />
              </label>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold ">การดื่มสุรา</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="alcohol_consumption_no"
              name="alcohol_consumption"
              value="ไม่มี"
              checked={formData.alcohol_consumption === "ไม่มี"}
              onChange={(e) =>
                handleInputChange("alcohol_consumption", e.target.value)
              }
              className="mr-2 h-5 w-5 rounded-full"
            />
            <label htmlFor="alcohol_consumption_no" className="mr-40">
              ไม่มี
            </label>

            <input
              type="radio"
              id="alcohol_consumption_yes"
              name="alcohol_consumption"
              value="มี"
              checked={formData.alcohol_consumption === "มี"}
              onChange={(e) =>
                handleInputChange("alcohol_consumption", e.target.value)
              }
              className="ml-20 mr-2  h-5 w-5 rounded-full"
            />
            <label htmlFor="salcohol_consumption_yes">มี</label>
          </div>

          {formData.alcohol_consumption === "มี" && (
            <div className="mt-2">
              <label className="block">
                ระบุ (กี่ครั้ง/สัปดาห์){" "}
                <input
                  type="text"
                  value={formData.alcohol_consumption_detail}
                  onChange={(e) =>
                    handleInputChange(
                      "alcohol_consumption_detail",
                      e.target.value
                    )
                  }
                  className="border rounded-md p-2 w-full focus:outline-none"
                />
              </label>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">สารเสพติดอื่น ๆ</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="other_substance_no"
              name="other_substance"
              value="ไม่มี"
              checked={formData.other_substance === "ไม่มี"}
              onChange={(e) =>
                handleInputChange("other_substance", e.target.value)
              }
              className="mr-2 h-5 w-5 rounded-full"
            />
            <label htmlFor="other_substance_no" className="mr-40">
              ไม่มี
            </label>

            <input
              type="radio"
              id="other_substance_yes"
              name="other_substance"
              value="มี"
              checked={formData.other_substance === "มี"}
              onChange={(e) =>
                handleInputChange("other_substance", e.target.value)
              }
              className="ml-20 mr-2  h-5 w-5 rounded-full"
            />
            <label htmlFor="other_substance_yes">มี</label>
          </div>

          {formData.other_substance === "มี" && (
            <div className="mt-2">
              <label className="block">
                <input
                  type="text"
                  value={formData.other_substance_detail}
                  onChange={(e) =>
                    handleInputChange("other_substance_detail", e.target.value)
                  }
                  className="border rounded-md p-2 w-full focus:outline-none"
                />
              </label>
            </div>
          )}
        </div>
        <label className="block mt-0 font-bold">
          น้ำหนัก (kg)
          <input
            type="number"
            value={formData.weight}
            onChange={(e) =>
              handleInputChange("weight", parseFloat(e.target.value))
            }
            className="border rounded-md px-2 py-1 ml-2 mb-2"
          />
        </label>

        <label className="block mt-0 font-bold">
          ส่วนสูง (cm)
          <input
            type="number"
            value={formData.height}
            onChange={(e) =>
              handleInputChange("height", parseFloat(e.target.value))
            }
            className="border rounded-md px-2 py-1 ml-2 mb-2"
          />
        </label>

        <label className="block mt-0 font-bold">
          BMI
          <input
            type="number"
            value={formData.bmi}
            onChange={(e) =>
              handleInputChange("bmi", parseFloat(e.target.value))
            }
            className="border rounded-md px-2 py-1 ml-14 mb-2 "
          />
        </label>

        {/* <label className="block mt-0 font-bold">
          อุณหภูมิ (°C)
          <input
            type="number"
            value={formData.body_temperature}
            onChange={(e) =>
              handleInputChange("body_temperature", parseFloat(e.target.value))
            }
            className="border rounded-md px-2 py-1 ml-2 mb-2"
          />
        </label>

        <label className="block mt-0 font-bold">
          ชีพจร (bpm)
          <input
            type="number"
            value={formData.heart_rate}
            onChange={(e) =>
              handleInputChange("heart_rate", parseFloat(e.target.value))
            }
            className="border rounded-md px-2 py-1 ml-2"
          />
        </label>

        <label className="block mt-0 font-bold">
          อัตราการหายใจ (bpm)
          <input
            type="number"
            value={formData.respiratory_rate}
            onChange={(e) =>
              handleInputChange("respiratory_rate", parseFloat(e.target.value))
            }
            className="border rounded-md px-2 py-1 ml-2 mt-2"
          />
        </label>

        <label className="block mt-0 font-bold">
          ความดันโลหิต (mmHg)
          <input
            type="number"
            value={formData.blood_pressure}
            onChange={(e) =>
              handleInputChange("blood_pressure", parseFloat(e.target.value))
            }
            className="border rounded-md px-2 py-1 ml-2 mt-2"
          />
        </label> */}
      </div>
    </div>
  );
};

export default FormAddGeneral;
