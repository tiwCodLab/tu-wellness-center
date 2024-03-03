import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const GeneralInfoForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const initialPatientID = id ? id : "";

  const [formDataStep1, setFormDataStep1] = useState({
    patient: initialPatientID,
    allergy_medicine: "",
    allergy_medicine_detail: "",
    allergy_food: "",
    allergy_food_detail: "",
    smoking_status: "",
    smoking_status_detail: "",
    alcohol_consumption: "",
    alcohol_consumption_detail: "",
    other_substance: "",
    other_substance_detail: "",
    weight: "",
    height: "",
    body_temperature: "",
    heart_rate: "",
    respiratory_rate: "",
    blood_pressure: "",
  });

  const handleInputChangeStep1 = (fieldName, value) => {
    setFormDataStep1({ ...formDataStep1, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api-data-medical-room-tu.onrender.com/api/general",
        formDataStep1
      );

      // if (response.status === 201) {
      //   window.alert("บันทึกเสร็จเรียบร้อยแล้ว!");
      // } else {
      //   window.alert(
      //     `บันทึกไม่สำเร็จ เนื่องจากกรอกข้อมูลไม่ถูกต้อง กรุณาทำรายการใหม่อีกรอบ`
      //   );
      // }

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="bg-white rounded-md mt-2 ">
        <h3 className="text-base text-center font-bold mb-2 p-2">
          ข้อมูลทั่วไป
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-4 flex justify-center items-center bg-white shadow-lg rounded-md">
          <div className="ml-20 text-sm">
            <div className="mb-2">
              <label className="block mb-2 font-bold">แพ้ยา</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="allergy_medicine_no"
                  name="allergy_medicine"
                  value="ไม่มี"
                  checked={formDataStep1.allergy_medicine === "ไม่มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("allergy_medicine", e.target.value)
                  }
                  className="mr-2  h-5 w-5 rounded-full"
                />
                <label htmlFor="allergy_medicine_no">ไม่มี</label>

                <input
                  type="radio"
                  id="allergy_medicine_yes"
                  name="allergy_medicine"
                  value="มี"
                  checked={formDataStep1.allergy_medicine === "มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("allergy_medicine", e.target.value)
                  }
                  className="ml-20 mr-2  h-5 w-5 rounded-full"
                />
                <label htmlFor="allergy_medicine_yes">มี</label>
              </div>

              {formDataStep1.allergy_medicine === "มี" && (
                <label className="block">
                  <input
                    type="text"
                    value={formDataStep1.allergy_medicine_detail}
                    onChange={(e) =>
                      handleInputChangeStep1(
                        "allergy_medicine_detail",
                        e.target.value
                      )
                    }
                    className="border rounded-md p-2 w-full focus:outline-none"
                  />
                </label>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold">แพ้อาหาร</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="allergy_food_no"
                  name="allergy_food"
                  value="ไม่มี"
                  checked={formDataStep1.allergy_food === "ไม่มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("allergy_food", e.target.value)
                  }
                  className="mr-2 h-5 w-5 rounded-full"
                />
                <label htmlFor="allergy_food_no">ไม่มี</label>

                <input
                  type="radio"
                  id="allergy_food_yes"
                  name="allergy_food"
                  value="มี"
                  checked={formDataStep1.allergy_food === "มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("allergy_food", e.target.value)
                  }
                  className="ml-20 mr-2  h-5 w-5 rounded-full"
                />
                <label htmlFor="allergy_food_yes">มี</label>
              </div>

              {formDataStep1.allergy_food === "มี" && (
                <div className="mt-2">
                  <label className="block">
                    <input
                      type="text"
                      value={formDataStep1.allergy_food_detail}
                      onChange={(e) =>
                        handleInputChangeStep1(
                          "allergy_food_detail",
                          e.target.value
                        )
                      }
                      className="border rounded-md p-2 w-full focus:outline-none "
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-bold">การสูบบุหรี่</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="smoking_status_no"
                  name="smoking_status"
                  value="ไม่มี"
                  checked={formDataStep1.smoking_status === "ไม่มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("smoking_status", e.target.value)
                  }
                  className="mr-2 h-5 w-5 rounded-full"
                />
                <label htmlFor="smoking_status_no">ไม่มี</label>

                <input
                  type="radio"
                  id="smoking_status_yes"
                  name="smoking_status"
                  value="มี"
                  checked={formDataStep1.smoking_status === "มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("smoking_status", e.target.value)
                  }
                  className="ml-20 mr-2  h-5 w-5 rounded-full"
                />
                <label htmlFor="smoking_status_yes">มี</label>
              </div>

              {formDataStep1.smoking_status === "มี" && (
                <div className="mt-2">
                  <label className="block">
                    ระบุ (กี่มวน/วัน){" "}
                    <input
                      type="text"
                      value={formDataStep1.smoking_status_detail}
                      onChange={(e) =>
                        handleInputChangeStep1(
                          "smoking_status_detail",
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
              <label className="block mb-2 font-bold">การดื่มสุรา</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="alcohol_consumption_no"
                  name="alcohol_consumption"
                  value="ไม่มี"
                  checked={formDataStep1.alcohol_consumption === "ไม่มี"}
                  onChange={(e) =>
                    handleInputChangeStep1(
                      "alcohol_consumption",
                      e.target.value
                    )
                  }
                  className="mr-2 h-5 w-5 rounded-full"
                />
                <label htmlFor="alcohol_consumption_no">ไม่มี</label>

                <input
                  type="radio"
                  id="alcohol_consumption_yes"
                  name="alcohol_consumption"
                  value="มี"
                  checked={formDataStep1.alcohol_consumption === "มี"}
                  onChange={(e) =>
                    handleInputChangeStep1(
                      "alcohol_consumption",
                      e.target.value
                    )
                  }
                  className="ml-20 mr-2  h-5 w-5 rounded-full"
                />
                <label htmlFor="salcohol_consumption_yes">มี</label>
              </div>

              {formDataStep1.alcohol_consumption === "มี" && (
                <div className="mt-2">
                  <label className="block">
                    ระบุ (กี่ครั้ง/สัปดาห์){" "}
                    <input
                      type="text"
                      value={formDataStep1.alcohol_consumption_detail}
                      onChange={(e) =>
                        handleInputChangeStep1(
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
              <label className="block mb-2 font-bold">สารเสพติอื่น ๆ</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="other_substance_no"
                  name="other_substance"
                  value="ไม่มี"
                  checked={formDataStep1.other_substance === "ไม่มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("other_substance", e.target.value)
                  }
                  className="mr-2 h-5 w-5 rounded-full"
                />
                <label htmlFor="other_substance_no">ไม่มี</label>

                <input
                  type="radio"
                  id="other_substance_yes"
                  name="other_substance"
                  value="มี"
                  checked={formDataStep1.other_substance === "มี"}
                  onChange={(e) =>
                    handleInputChangeStep1("other_substance", e.target.value)
                  }
                  className="ml-20 mr-2  h-5 w-5 rounded-full"
                />
                <label htmlFor="other_substance_yes">มี</label>
              </div>

              {formDataStep1.other_substance === "มี" && (
                <div className="mt-2">
                  <label className="block">
                    <input
                      type="text"
                      value={formDataStep1.other_substance_detail}
                      onChange={(e) =>
                        handleInputChangeStep1(
                          "other_substance_detail",
                          e.target.value
                        )
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
                value={formDataStep1.weight}
                onChange={(e) =>
                  handleInputChangeStep1("weight", parseFloat(e.target.value))
                }
                className="border rounded-md px-2 py-1 ml-2"
              />
            </label>
            <br />

            <label className="block mt-0 font-bold">
              ส่วนสูง (cm)
              <input
                type="number"
                value={formDataStep1.height}
                onChange={(e) =>
                  handleInputChangeStep1("height", parseFloat(e.target.value))
                }
                className="border rounded-md px-2 py-1 ml-2"
              />
            </label>
            <br />

            <label className="block mt-0 font-bold">
              อุณหภูมิ (°C)
              <input
                type="number"
                value={formDataStep1.body_temperature}
                onChange={(e) =>
                  handleInputChangeStep1(
                    "body_temperature",
                    parseFloat(e.target.value)
                  )
                }
                className="border rounded-md px-2 py-1 ml-2"
              />
            </label>
            <br />

            <label className="block mt-0 font-bold">
              ชีพจร (bpm)
              <input
                type="number"
                value={formDataStep1.heart_rate}
                onChange={(e) =>
                  handleInputChangeStep1(
                    "heart_rate",
                    parseFloat(e.target.value)
                  )
                }
                className="border rounded-md px-2 py-1 ml-2"
              />
            </label>
            <br />

            <label className="block mt-0 font-bold">
              อัตราการหายใจ (bpm)
              <input
                type="number"
                value={formDataStep1.respiratory_rate}
                onChange={(e) =>
                  handleInputChangeStep1(
                    "respiratory_rate",
                    parseFloat(e.target.value)
                  )
                }
                className="border rounded-md px-2 py-1 ml-2"
              />
            </label>
            <br />

            <label className="block mt-0 font-bold">
              ความดันโลหิต (mmHg)
              <input
                type="number"
                value={formDataStep1.blood_pressure}
                onChange={(e) =>
                  handleInputChangeStep1(
                    "blood_pressure",
                    parseFloat(e.target.value)
                  )
                }
                className="border rounded-md px-2 py-1 ml-2"
              />
            </label>
          </div>
        </div>
        <div className="px-8 py-4">
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-5  rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            บันทึก
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="mt-2 bg-gray-500 text-white px-5  rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        กลับ111
      </button>
    </>
  );
};

export default GeneralInfoForm;
