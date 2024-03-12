import React from "react";

export default function FormSecond({ medicalRecord, handleInputChange }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 mt-4 rounded-md">
      <div className="bg-white p-8 rounded  w-full text-xs ">
        <h3 className="text-base font-bold mb-5 p-2">System Review </h3>
        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ผิวหนัง</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="skin_no"
                name="skin"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.skin === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("skin", e.target.value)}
              />
              <label htmlFor="skin_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="skin_no"
                name="skin"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.skin === "ปกติ"}
                onChange={(e) => handleInputChange("skin", e.target.value)}
              />
              <label htmlFor="skin_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="skin_yes"
                name="skin"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.skin === "ผิดปกติ"}
                onChange={(e) => handleInputChange("skin", e.target.value)}
              />
              <label htmlFor="skin_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.skin === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.skin_detail}
                  onChange={(e) =>
                    handleInputChange("skin_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ศีรษะ</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="head_no"
                name="head"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.head === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("head", e.target.value)}
              />
              <label htmlFor="head_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="head_no"
                name="head"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.head === "ปกติ"}
                onChange={(e) => handleInputChange("head", e.target.value)}
              />
              <label htmlFor="head_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="head_yes"
                name="head"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.head === "ผิดปกติ"}
                onChange={(e) => handleInputChange("head", e.target.value)}
              />
              <label htmlFor="head_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.head === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.head_detail}
                  onChange={(e) =>
                    handleInputChange("head_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">หน้า</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="face_no"
                name="face"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.face === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("face", e.target.value)}
              />
              <label htmlFor="face_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="face_no"
                name="face"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.face === "ปกติ"}
                onChange={(e) => handleInputChange("face", e.target.value)}
              />
              <label htmlFor="face_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="face_yes"
                name="face"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.face === "ผิดปกติ"}
                onChange={(e) => handleInputChange("face", e.target.value)}
              />
              <label htmlFor="face_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.face === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.face_detail}
                  onChange={(e) =>
                    handleInputChange("face_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ตา</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="eyes_no"
                name="eyes"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.eyes === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("eyes", e.target.value)}
              />
              <label htmlFor="eyes_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="eyes_no"
                name="eyes"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.eyes === "ปกติ"}
                onChange={(e) => handleInputChange("eyes", e.target.value)}
              />
              <label htmlFor="eyes_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="eyes_yes"
                name="eyes"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.eyes === "ผิดปกติ"}
                onChange={(e) => handleInputChange("eyes", e.target.value)}
              />
              <label htmlFor="eyes_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.eyes === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.eyes_detail}
                  onChange={(e) =>
                    handleInputChange("eyes_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ช่องปาก</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="mouth_no"
                name="mouth"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.mouth === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("mouth", e.target.value)}
              />
              <label htmlFor="mouth_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="mouth_no"
                name="mouth"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.mouth === "ปกติ"}
                onChange={(e) => handleInputChange("mouth", e.target.value)}
              />
              <label htmlFor="mouth_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="mouth_yes"
                name="mouth"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.mouth === "ผิดปกติ"}
                onChange={(e) => handleInputChange("mouth", e.target.value)}
              />
              <label htmlFor="mouth_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.mouth === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.mouth_detail}
                  onChange={(e) =>
                    handleInputChange("mouth_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ลิ้น</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="tongue_no"
                name="tongue"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.tongue === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("tongue", e.target.value)}
              />
              <label htmlFor="tongue_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="tongue_no"
                name="tongue"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.tongue === "ปกติ"}
                onChange={(e) => handleInputChange("tongue", e.target.value)}
              />
              <label htmlFor="tongue_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="tongue_yes"
                name="tongue"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.tongue === "ผิดปกติ"}
                onChange={(e) => handleInputChange("tongue", e.target.value)}
              />
              <label htmlFor="tongue_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.tongue === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.tongue_detail}
                  onChange={(e) =>
                    handleInputChange("tongue_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ช่องคอ</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="throat_no"
                name="throat"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.throat === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("throat", e.target.value)}
              />
              <label htmlFor="throat_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="throat_no"
                name="throat"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.throat === "ปกติ"}
                onChange={(e) => handleInputChange("throat", e.target.value)}
              />
              <label htmlFor="throat_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="throat_yes"
                name="throat"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.throat === "ผิดปกติ"}
                onChange={(e) => handleInputChange("throat", e.target.value)}
              />
              <label htmlFor="throat_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.throat === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.throat_detail}
                  onChange={(e) =>
                    handleInputChange("throat_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ต่อมน้ำเหลือง</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="thyroid_no"
                name="thyroid"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.thyroid === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("thyroid", e.target.value)}
              />
              <label htmlFor="thyroid_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="thyroid_no"
                name="thyroid"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.thyroid === "ปกติ"}
                onChange={(e) => handleInputChange("thyroid", e.target.value)}
              />
              <label htmlFor="thyroid_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="thyroid_yes"
                name="thyroid"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.thyroid === "ผิดปกติ"}
                onChange={(e) => handleInputChange("thyroid", e.target.value)}
              />
              <label htmlFor="thyroid_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.thyroid === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.thyroid_detail}
                  onChange={(e) =>
                    handleInputChange("thyroid_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">เต้านม</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="breasts_no"
                name="breasts"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.breasts === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("breasts", e.target.value)}
              />
              <label htmlFor="breasts_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="breasts_no"
                name="breasts"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.breasts === "ปกติ"}
                onChange={(e) => handleInputChange("breasts", e.target.value)}
              />
              <label htmlFor="breasts_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="breasts_yes"
                name="breasts"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.breasts === "ผิดปกติ"}
                onChange={(e) => handleInputChange("breasts", e.target.value)}
              />
              <label htmlFor="breasts_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.breasts === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.breasts_detail}
                  onChange={(e) =>
                    handleInputChange("breasts_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ทรวงอก</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="chest_no"
                name="chest"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.chest === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("chest", e.target.value)}
              />
              <label htmlFor="chest_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="chest_no"
                name="chest"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.chest === "ปกติ"}
                onChange={(e) => handleInputChange("chest", e.target.value)}
              />
              <label htmlFor="chest_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="chest_yes"
                name="chest"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.chest === "ผิดปกติ"}
                onChange={(e) => handleInputChange("chest", e.target.value)}
              />
              <label htmlFor="chest_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.chest === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.chest_detail}
                  onChange={(e) =>
                    handleInputChange("chest_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ระบบไหวเวียนโลหิต</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="circulatory_system_no"
                name="circulatory_system"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.circulatory_system === "ไม่เกี่ยวข้อง"}
                onChange={(e) =>
                  handleInputChange("circulatory_system", e.target.value)
                }
              />
              <label htmlFor="circulatory_system_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="circulatory_system_no"
                name="circulatory_system"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.circulatory_system === "ปกติ"}
                onChange={(e) =>
                  handleInputChange("circulatory_system", e.target.value)
                }
              />
              <label htmlFor="circulatory_system_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="circulatory_system_yes"
                name="circulatory_system"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.circulatory_system === "ผิดปกติ"}
                onChange={(e) =>
                  handleInputChange("circulatory_system", e.target.value)
                }
              />
              <label htmlFor="circulatory_system_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.circulatory_system === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.circulatory_system_detail}
                  onChange={(e) =>
                    handleInputChange(
                      "circulatory_system_detail",
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ท้อง</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="abdomen_no"
                name="abdomen"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.abdomen === "ไม่เกี่ยวข้อง"}
                onChange={(e) => handleInputChange("abdomen", e.target.value)}
              />
              <label htmlFor="abdomen_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="abdomen_no"
                name="abdomen"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.abdomen === "ปกติ"}
                onChange={(e) => handleInputChange("abdomen", e.target.value)}
              />
              <label htmlFor="abdomen_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="abdomen_yes"
                name="abdomen"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.abdomen === "ผิดปกติ"}
                onChange={(e) => handleInputChange("abdomen", e.target.value)}
              />
              <label htmlFor="abdomen_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.abdomen === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.abdomen_detail}
                  onChange={(e) =>
                    handleInputChange("abdomen_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ระบบสืบพันธ์</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="reproductive_system_no"
                name="reproductive_system"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.reproductive_system === "ไม่เกี่ยวข้อง"}
                onChange={(e) =>
                  handleInputChange("reproductive_system", e.target.value)
                }
              />
              <label htmlFor="reproductive_system_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="reproductive_system_no"
                name="reproductive_system"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.reproductive_system === "ปกติ"}
                onChange={(e) =>
                  handleInputChange("reproductive_system", e.target.value)
                }
              />
              <label htmlFor="reproductive_system_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="reproductive_system_yes"
                name="reproductive_system"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.reproductive_system === "ผิดปกติ"}
                onChange={(e) =>
                  handleInputChange("reproductive_system", e.target.value)
                }
              />
              <label htmlFor="reproductive_system_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.reproductive_system === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.reproductive_system_detail}
                  onChange={(e) =>
                    handleInputChange(
                      "reproductive_system_detail",
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">
              ระบบโครงร่างกล้ามเนื้อ
            </label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="musculoskeletal_system_no"
                name="musculoskeletal_system"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={
                  medicalRecord.musculoskeletal_system === "ไม่เกี่ยวข้อง"
                }
                onChange={(e) =>
                  handleInputChange("musculoskeletal_system", e.target.value)
                }
              />
              <label htmlFor="musculoskeletal_system_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="musculoskeletal_system_no"
                name="musculoskeletal_system"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.musculoskeletal_system === "ปกติ"}
                onChange={(e) =>
                  handleInputChange("musculoskeletal_system", e.target.value)
                }
              />
              <label htmlFor="musculoskeletal_system_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="musculoskeletal_system_yes"
                name="musculoskeletal_system"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.musculoskeletal_system === "ผิดปกติ"}
                onChange={(e) =>
                  handleInputChange("musculoskeletal_system", e.target.value)
                }
              />
              <label htmlFor="musculoskeletal_system_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.musculoskeletal_system === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.musculoskeletal_system_detail}
                  onChange={(e) =>
                    handleInputChange(
                      "musculoskeletal_system_detail",
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-4 bg-slate-50 shadow-slate-100 shadow-md pt-3 rounded-md">
          <div className="w-1/2 pl-14">
            <label className="block mb-2 text-base">ระบบประสาท</label>
          </div>
          <div className="w-1/2 pl-2">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="nervous_system_no"
                name="nervous_system"
                value="ไม่เกี่ยวข้อง"
                className="form-radio h-5 w-5 text-indigo-600"
                checked={medicalRecord.nervous_system === "ไม่เกี่ยวข้อง"}
                onChange={(e) =>
                  handleInputChange("nervous_system", e.target.value)
                }
              />
              <label htmlFor="nervous_system_no" className="ml-2">
                ไม่เกี่ยวข้อง
              </label>
              <input
                type="radio"
                id="nervous_system_no"
                name="nervous_system"
                value="ปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.nervous_system === "ปกติ"}
                onChange={(e) =>
                  handleInputChange("nervous_system", e.target.value)
                }
              />
              <label htmlFor="nervous_system_no" className="ml-2">
                ปกติ
              </label>
              <input
                type="radio"
                id="nervous_system_yes"
                name="nervous_system"
                value="ผิดปกติ"
                className="form-radio h-5 w-5 text-indigo-600 ml-4"
                checked={medicalRecord.nervous_system === "ผิดปกติ"}
                onChange={(e) =>
                  handleInputChange("nervous_system", e.target.value)
                }
              />
              <label htmlFor="nervous_system_yes" className="ml-2">
                ผิดปกติ
              </label>
            </div>
            {medicalRecord.nervous_system === "ผิดปกติ" && (
              <div className="mt-2 flex ml-14">
                <label className="block py-2 mr-4">ระบุ</label>
                <input
                  type="text"
                  value={medicalRecord.nervous_system_detail}
                  onChange={(e) =>
                    handleInputChange("nervous_system_detail", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
