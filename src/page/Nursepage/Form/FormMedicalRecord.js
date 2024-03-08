import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ options, selectedValue, onChange }) => {
  return (
    <select
      value={selectedValue}
      onChange={onChange}
      className="mt-2 p-2 block w-full rounded-md border border-gray-800 shadow-sm "
    >
      <option value="" disabled hidden>
        เลือกรายการ
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
const FormOne = ({
  selected,
  selectedOption,
  handleSelectOptionA,
  handleSelectOptionB,
  handleSelectOptionC,
  handleSelectOptionD,
  handSelectedA,
  handSelectedB,
  handSelectedC,
  handSelectedD,
  medicalRecord,
  medicalCounseling,
  setMedicalCounseling,
  handleInputChange,
}) => {
  const handleChangeCounseling = (event) => {
    const { name, value } = event.target;
    setMedicalCounseling({
      ...medicalCounseling,
      [name]: value,
    });
  };

  const handleFormatChange = (e) => {
    const formatValue = e.target.value;
    setMedicalCounseling((prevRecord) => ({
      ...prevRecord,
      format: formatValue,
    }));
  };

  const handlefirstproblemsChange = (e) => {
    const formatValue = e.target.value;
    setMedicalCounseling((prevRecord) => ({
      ...prevRecord,
      firstproblems: formatValue,
    }));
  };

  const handleassistanceChange = (e) => {
    const formatValue = e.target.value;
    setMedicalCounseling((prevRecord) => ({
      ...prevRecord,
      assistance: formatValue,
    }));
  };

  const formatOptions = [
    {
      value: "On site (TULP Wellness Center)",
      label: "On site (TULP Wellness Center)",
    },
    { value: "Online", label: "Online" },
  ];

  const firstproblemsOptions = [
    {
      value: "สัมพันธภาพกับคนรัก",
      label:
        "สัมพันธภาพกับคนรัก - สื่อสารไม่เข้าใจกัน , ลืมคนรักเก่าไม่ได้ , ถูกนอกใจ , ความต้องการไม่ตรงกัน , อยากยุติความสัมพันธ์ ฯลฯ",
    },
    {
      value: "ความสัมพันธ์ในครอบครัว",
      label:
        "ความสัมพันธ์ในครอบครัว - ถูกกดดัน , ไม่มีอิสระ , ทัศนคติไม่ตรงกัน , แบกรับความคาดหวัง , ฝืนใจทำสิ่งที่ไม่ต้องการ ฯลฯ",
    },

    {
      value: "การทำงาน",
      label:
        "การทำงาน - ขัดแย้งกับเพื่อนร่วมงาน/หัวหน้างาน , ไม่ก้าวหน้า , ถูกกลั่นแกล้ง , ทำงานที่ไม่ชอบ , หมดไฟในการทำงาน ฯลฯ",
    },

    {
      value: "การเรียน",
      label:
        "การเรียน - เรียนในสิ่งที่ตัวเองไม่ชอบ , คาดหวังต่อตัวเองสูง , ไม่มีวินัยในตัวเอง , ไม่มีเป้าหมายในอนาคต , ไม่รู้ว่าตัวเองชอบอะไร ฯลฯ",
    },

    {
      value: "การสูญเสียบุคคลที่สำคัญในชีวิต",
      label:
        "การสูญเสียบุคคลที่สำคัญในชีวิต - คนรักเสียชีวิต , เลิกรากับคนรัก , มีความจำเป็นต้องอยู่ห่างไกลกัน ฯลฯ",
    },

    {
      value: "การปรับตัวเข้ากับความเปลี่ยนแปลง",
      label:
        "การปรับตัวเข้ากับความเปลี่ยนแปลง - ย้ายที่อยู่ , เปลี่ยนงาน , เริ่มต้นกับความสัมพันธ์ใหม่ , มีลูก ฯลฯ",
    },

    {
      value: "ปัญหาที่เกี่ยวข้องกับโรคทางจิตเวช",
      label: "ปัญหาที่เกี่ยวข้องกับโรคทางจิตเวช",
    },

    {
      label: "อื่น ๆ",
    },
  ];

  const assistanceOptions = [
    {
      value: "ส่งต่อโรงพยาบาลห้างฉัตรเพื่อประเมินทางจิตเวช",
      label: "ส่งต่อโรงพยาบาลห้างฉัตรเพื่อประเมินทางจิตเวช",
    },
    {
      value: "แจ้งให้คณะทราบเพื่อความสะดวกในการดูแลช่วยเหลือ",
      label: "แจ้งให้คณะทราบเพื่อความสะดวกในการดูแลช่วยเหลือ",
    },

    {
      value: "แจ้งให้ผู้ปกครองทราบ",
      label: "แจ้งให้ผู้ปกครองทราบ",
    },

    {
      value: "ไม่มีการส่งต่อ",
      label: "ไม่มีการส่งต่อ",
    },
  ];

  return (
    <div className="flex flex-col justify-center text-xs rounded-md ">
      <h2 className="mt-2 mr-8 text-base mb-2">
        การตรวจร่างกายตามระบบที่สัมพันธ์กับความเจ็บป่วย
      </h2>
      <div className=" p-2 rounded  w-full  ">
        <div className="flex mt-2">
          <Link
            onClick={handleSelectOptionA}
            className="bg-form1 text-sm bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded-md mr-4"
          >
            ระบบทางเดินหายใจ
          </Link>
          <Link
            onClick={handleSelectOptionB}
            className="bg-form1 text-sm bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded-md mr-4"
          >
            ระบบทางเดินอาหาร
          </Link>
          <Link
            onClick={handleSelectOptionC}
            className="bg-form1 text-sm bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded-md mr-4"
          >
            ตรวจร่างกาย
          </Link>

          <Link
            onClick={handleSelectOptionD}
            className="bg-form1 text-sm bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded-md mr-4"
          >
            จิตเวช
          </Link>
        </div>
        {selectedOption === "A" && (
          <div>
            <div className="mt-6">
              <div className="flex flex-col justify-start">
                <div className="w-1/2 mb-6">
                  <Link
                    onClick={handSelectedA}
                    className="text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 bg-form text-black"
                  >
                    ดู
                  </Link>
                  <Link
                    onClick={handSelectedB}
                    className=" ml-4  text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 bg-form text-black "
                  >
                    คลำ
                  </Link>
                  <Link
                    onClick={handSelectedC}
                    className=" ml-4  text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 bg-form text-black "
                  >
                    เคาะ
                  </Link>
                  <Link
                    onClick={handSelectedD}
                    className=" ml-4  text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 bg-form text-black "
                  >
                    ฟัง
                  </Link>
                </div>
              </div>
              <div className="pt-1 pb-1 rounded-lg">
                {selected === "A" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14 ">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          สีผิวหนัง/ปาก/เล็บ
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="skin_color_no"
                            name="skin_color"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.skin_color === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange("skin_color", e.target.value)
                            }
                          />
                          <label
                            htmlFor="skin_color_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="skin_color_yes"
                            name="skin_color"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={medicalRecord.skin_color === "ผิดปกติ"}
                            onChange={(e) =>
                              handleInputChange("skin_color", e.target.value)
                            }
                          />
                          <label
                            htmlFor="skin_color_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.skin_color === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block mr-4 py-2">ระบุ</label>
                            <input
                              type="text"
                              value={medicalRecord.skin_color_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "skin_color_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          ขนาดและรูปร่างทรวงอก
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="chest_size_no"
                            name="chest_size"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.chest_size === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange("chest_size", e.target.value)
                            }
                          />
                          <label
                            htmlFor="chest_size_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="chest_size_yes"
                            name="chest_size"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={medicalRecord.chest_size === "ผิดปกติ"}
                            onChange={(e) =>
                              handleInputChange("chest_size", e.target.value)
                            }
                          />
                          <label
                            htmlFor="chest_size_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.chest_size === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              value={medicalRecord.chest_size_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "chest_size_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          ลักษณะการหายใจ
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="breathingRate_no"
                            name="breathingRate"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.breathingRate === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange("breathingRate", e.target.value)
                            }
                          />
                          <label
                            htmlFor="breathingRate_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="breathingRate_yes"
                            name="breathingRate"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={medicalRecord.breathingRate === "ผิดปกติ"}
                            onChange={(e) =>
                              handleInputChange("breathingRate", e.target.value)
                            }
                          />
                          <label
                            htmlFor="breathingRate_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.breathingRate === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block mr-4 py-2">ระบุ</label>
                            <input
                              type="text"
                              value={medicalRecord.breathingRate_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "breathingRate_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {selected === "B" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>หลอดลม</label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="lungTube_no"
                            name="lungTube"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.lungTube === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange("lungTube", e.target.value)
                            }
                          />
                          <label htmlFor="lungTube_no" className="ml-2 text-sm">
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="lungTube_yes"
                            name="lungTube"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={medicalRecord.lungTube === "ผิดปกติ"}
                            onChange={(e) =>
                              handleInputChange("lungTube", e.target.value)
                            }
                          />
                          <label
                            htmlFor="lungTube_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.lungTube === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              value={medicalRecord.lungTube_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "lungTube_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          กระดูกซี่โครง
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="ribCage_no"
                            name="ribCage"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.ribCage === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange("ribCage", e.target.value)
                            }
                          />
                          <label htmlFor="ribCage_no" className="ml-2 text-sm">
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="ribCage_yes"
                            name="ribCage"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={medicalRecord.ribCage === "ผิดปกติ"}
                            onChange={(e) =>
                              handleInputChange("ribCage", e.target.value)
                            }
                          />
                          <label htmlFor="ribCage_yes" className="ml-2 text-sm">
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.ribCage === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              value={medicalRecord.ribCage_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "ribCage_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          การยายตัวของทรวงอก
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="chestExpansion_no"
                            name="chestExpansion"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.chestExpansion === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange(
                                "chestExpansion",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="chestExpansion_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="chestExpansion_yes"
                            name="chestExpansion"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={medicalRecord.chestExpansion === "ผิดปกติ"}
                            onChange={(e) =>
                              handleInputChange(
                                "chestExpansion",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="chestExpansion_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.chestExpansion === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              value={medicalRecord.chestExpansion_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "chestExpansion_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          ต่อมน้ำเหลือง
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="yellow_gland_no"
                            name="yellow_gland"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.yellow_gland === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange("yellow_gland", e.target.value)
                            }
                          />
                          <label
                            htmlFor="yellow_gland_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="yellow_gland_yes"
                            name="yellow_gland"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={medicalRecord.yellow_gland === "ผิดปกติ"}
                            onChange={(e) =>
                              handleInputChange("yellow_gland", e.target.value)
                            }
                          />
                          <label
                            htmlFor="yellow_gland_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.yellow_gland === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              value={medicalRecord.yellow_gland_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "yellow_gland_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selected === "C" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          เสียงผิดปกติ
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="abnormalBreathSounds_no"
                            name="abnormalBreathSounds"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={
                              medicalRecord.abnormalBreathSounds === "ปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "abnormalBreathSounds",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abnormalBreathSounds_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="abnormalBreathSounds_yes"
                            name="abnormalBreathSounds"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={
                              medicalRecord.abnormalBreathSounds === "ผิดปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "abnormalBreathSounds",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abnormalBreathSounds_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.abnormalBreathSounds === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              list="listBreathSound"
                              value={medicalRecord.abnormalBreathSounds_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "abnormalBreathSounds_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                            <datalist id="listBreathSound">
                              <option value="hyperresonance" />
                            </datalist>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selected === "D" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          เสียงหายใจ
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="breathing_sound_no"
                            name="breathing_sound"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.breathing_sound === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange(
                                "breathing_sound",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="breathing_sound_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="breathing_sound_yes"
                            name="breathing_sound"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={
                              medicalRecord.breathing_sound === "ผิดปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "breathing_sound",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="breathing_sound_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.breathing_sound === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              list="listSound"
                              value={medicalRecord.breathing_sound_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "breathing_sound_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                            <datalist id="listSound">
                              <option value="Stridor" />
                              <option value="Crepitation" />
                              <option value="Wheeze" />
                              <option value="Pleural friction rubs" />
                            </datalist>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedOption === "B" && (
          <div>
            <div className="mt-6">
              <div className="flex">
                <div className="w-1/2 mb-6">
                  <Link
                    onClick={handSelectedA}
                    className="text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 text-black bgblack "
                  >
                    ดู
                  </Link>
                  <Link
                    onClick={handSelectedB}
                    className=" ml-4  text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 text-black bgblack "
                  >
                    คลำ
                  </Link>
                  <Link
                    onClick={handSelectedC}
                    className=" ml-4  text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 text-black bgblack "
                  >
                    เคาะ
                  </Link>
                  <Link
                    onClick={handSelectedD}
                    className=" ml-4  text-sm rounded-md  px-6 py-1.5 border-2 border-gray-300 text-black bgblack "
                  >
                    ฟัง
                  </Link>
                </div>
              </div>
              <div className="pt-1">
                {selected === "A" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          ช่องปากและลำคอ
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="mouth_and_throat_no"
                            name="mouth_and_throat"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.mouth_and_throat === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange(
                                "mouth_and_throat",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="mouth_and_throat_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="mouth_and_throat_yes"
                            name="mouth_and_throat"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={
                              medicalRecord.mouth_and_throat === "ผิดปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "mouth_and_throat",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="mouth_and_throat_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.mouth_and_throat === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              list="listmouth_and_throat"
                              value={medicalRecord.mouth_and_throat_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "mouth_and_throat_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                            <datalist id="listmouth_and_throat">
                              <option value="แผล" />
                              <option value="แห้ง" />
                              <option value="สีม่วงคล้ำ" />
                            </datalist>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          ลักษณะท้อง
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="abdominal_appearance_no"
                            name="abdominal_appearance"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={
                              medicalRecord.abdominal_appearance === "ปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "abdominal_appearance",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abdominal_appearance_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="abdominal_appearance_yes"
                            name="abdominal_appearance"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={
                              medicalRecord.abdominal_appearance === "ผิดปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "abdominal_appearance",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abdominal_appearance_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.abdominal_appearance === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              list="listabdominal_appearance"
                              value={medicalRecord.abdominal_appearance_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "abdominal_appearance_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />
                            <datalist id="listabdominal_appearance">
                              <option value="ท้องโต" />
                              <option value="ท้องบุ๋ม" />
                              <option value="สะดือ" />
                              <option value="ผิวหนัง" />
                            </datalist>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selected === "B" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          เสียงลำไส้เคลื่อนไหว
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="intestinal_movement_sound_no"
                            name="intestinal_movement_sound"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={
                              medicalRecord.intestinal_movement_sound === "ปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "intestinal_movement_sound",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="intestinal_movement_sound_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="intestinal_movement_sound_yes"
                            name="intestinal_movement_sound"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={
                              medicalRecord.intestinal_movement_sound ===
                              "ผิดปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "intestinal_movement_sound",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="intestinal_movement_sound_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.intestinal_movement_sound ===
                          "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              list="listintestinal_movement_sound"
                              value={
                                medicalRecord.intestinal_movement_sound_detail
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "intestinal_movement_sound_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />

                            <datalist id="listintestinal_movement_sound">
                              <option value="Bruit" />
                              <option value="Venouse Hum" />
                              <option value="Crepitation" />
                              <option value="Bowel Soond" />
                            </datalist>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selected === "C" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          เสียงผนังหน้าท้อง
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="abdominal_wall_sound_no"
                            name="abdominal_wall_sound"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={
                              medicalRecord.abdominal_wall_sound === "ปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "abdominal_wall_sound",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abdominal_wall_sound_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="abdominal_wall_sound_yes"
                            name="abdominal_wall_sound"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={
                              medicalRecord.abdominal_wall_sound === "ผิดปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "abdominal_wall_sound",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abdominal_wall_sound_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.abdominal_wall_sound === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">
                              เจ็บบริเวณ
                            </label>
                            <input
                              type="text"
                              list="listabdominal_wall_sound"
                              value={medicalRecord.abdominal_wall_sound_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "abdominal_wall_sound_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />

                            <datalist id="listabdominal_wall_sound">
                              <option value="Shiftimg dullness" />
                              <option value="Ascites" />
                              <option value="ตับโต" />
                              <option value="ม้ามโต" />
                            </datalist>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selected === "D" && (
                  <div>
                    <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                      <div className="w-1/2 pl-14">
                        <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                          หน้าท้องและอวัยวะช่องท้อง
                        </label>
                      </div>
                      <div className="w-1/2 pl-2">
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            id="abdominal_surface_no"
                            name="abdominal_surface"
                            value="ปกติ"
                            className="form-radio h-5 w-5 text-indigo-600"
                            checked={medicalRecord.abdominal_surface === "ปกติ"}
                            onChange={(e) =>
                              handleInputChange(
                                "abdominal_surface",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abdominal_surface_no"
                            className="ml-2 text-sm"
                          >
                            ปกติ
                          </label>
                          <input
                            type="radio"
                            id="abdominal_surface_yes"
                            name="abdominal_surface"
                            value="ผิดปกติ"
                            className="form-radio h-5 w-5 text-indigo-600 ml-4"
                            checked={
                              medicalRecord.abdominal_surface === "ผิดปกติ"
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "abdominal_surface",
                                e.target.value
                              )
                            }
                          />
                          <label
                            htmlFor="abdominal_surface_yes"
                            className="ml-2 text-sm"
                          >
                            ผิดปกติ
                          </label>
                        </div>
                        {medicalRecord.abdominal_surface === "ผิดปกติ" && (
                          <div className="mt-2 flex ml-14">
                            <label className="block py-2 mr-4">ระบุ</label>
                            <input
                              type="text"
                              list="listabdominal_surface"
                              value={medicalRecord.abdominal_surface_detail}
                              onChange={(e) =>
                                handleInputChange(
                                  "abdominal_surface_detail",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300  mr-2 mb-2 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
                            />

                            <datalist id="listabdominal_surface">
                              <option value="Murphy's sign" />
                              <option value="ตับโต" />
                              <option value="ม้ามโต" />
                              <option value="ไตโต" />
                            </datalist>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedOption === "C" && (
          <div>
            <div className="">
              <div className="">
                <h3 className="text-base font-bold mb-5 p-2"> </h3>
                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ผิวหนัง (Skin)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("skin", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("skin", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("skin", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ศีรษะ (Skull)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("head", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("head", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("head", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>หน้า (Face)</label>
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
                        onChange={(e) =>
                          handleInputChange("face", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("face", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("face", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>ตา (Eyes)</label>
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
                        onChange={(e) =>
                          handleInputChange("eyes", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("eyes", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("eyes", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ช่องปาก (Oral cavity)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("mouth", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("mouth", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("mouth", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ลิ้น (Tongue)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("tongue", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("tongue", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("tongue", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>คอ (Neck)</label>
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
                        onChange={(e) =>
                          handleInputChange("throat", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("throat", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("throat", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ต่อมน้ำเหลือง (Lymph Nodes)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("thyroid", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("thyroid", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("thyroid", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      เต้านม (Breasts)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("breasts", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("breasts", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("breasts", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ทรวงอก (Chest)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("chest", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("chest", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("chest", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ระบบไหวเวียนโลหิต (CVS)
                    </label>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="flex items-center justify-center">
                      <input
                        type="radio"
                        id="circulatory_system_no"
                        name="circulatory_system"
                        value="ไม่เกี่ยวข้อง"
                        className="form-radio h-5 w-5 text-indigo-600"
                        checked={
                          medicalRecord.circulatory_system === "ไม่เกี่ยวข้อง"
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "circulatory_system",
                            e.target.value
                          )
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
                          handleInputChange(
                            "circulatory_system",
                            e.target.value
                          )
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
                          handleInputChange(
                            "circulatory_system",
                            e.target.value
                          )
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ท้อง (Abdomen)
                    </label>
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
                        onChange={(e) =>
                          handleInputChange("abdomen", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("abdomen", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("abdomen", e.target.value)
                        }
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ระบบสืบพันธ์ (Genitalia)
                    </label>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="flex items-center justify-center">
                      <input
                        type="radio"
                        id="reproductive_system_no"
                        name="reproductive_system"
                        value="ไม่เกี่ยวข้อง"
                        className="form-radio h-5 w-5 text-indigo-600"
                        checked={
                          medicalRecord.reproductive_system === "ไม่เกี่ยวข้อง"
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "reproductive_system",
                            e.target.value
                          )
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
                          handleInputChange(
                            "reproductive_system",
                            e.target.value
                          )
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
                        checked={
                          medicalRecord.reproductive_system === "ผิดปกติ"
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "reproductive_system",
                            e.target.value
                          )
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ระบบโครงร่างกล้ามเนื้อ (Extremities)
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
                          medicalRecord.musculoskeletal_system ===
                          "ไม่เกี่ยวข้อง"
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "musculoskeletal_system",
                            e.target.value
                          )
                        }
                      />
                      <label
                        htmlFor="musculoskeletal_system_no"
                        className="ml-2"
                      >
                        ไม่เกี่ยวข้อง
                      </label>
                      <input
                        type="radio"
                        id="musculoskeletal_system_no"
                        name="musculoskeletal_system"
                        value="ปกติ"
                        className="form-radio h-5 w-5 text-indigo-600 ml-4"
                        checked={
                          medicalRecord.musculoskeletal_system === "ปกติ"
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "musculoskeletal_system",
                            e.target.value
                          )
                        }
                      />
                      <label
                        htmlFor="musculoskeletal_system_no"
                        className="ml-2"
                      >
                        ปกติ
                      </label>
                      <input
                        type="radio"
                        id="musculoskeletal_system_yes"
                        name="musculoskeletal_system"
                        value="ผิดปกติ"
                        className="form-radio h-5 w-5 text-indigo-600 ml-4"
                        checked={
                          medicalRecord.musculoskeletal_system === "ผิดปกติ"
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "musculoskeletal_system",
                            e.target.value
                          )
                        }
                      />
                      <label
                        htmlFor="musculoskeletal_system_yes"
                        className="ml-2"
                      >
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

                <div className="flex mb-4 bg-white shadow-slate-50 rounded-md pt-3 ">
                  <div className="w-1/2 pl-14">
                    <label className="block mb-2 text-base" style={{fontSize:"15px"}}>
                      ระบบประสาท (CNS)
                    </label>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="flex items-center justify-center">
                      <input
                        type="radio"
                        id="nervous_system_no"
                        name="nervous_system"
                        value="ไม่เกี่ยวข้อง"
                        className="form-radio h-5 w-5 text-indigo-600"
                        checked={
                          medicalRecord.nervous_system === "ไม่เกี่ยวข้อง"
                        }
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
                            handleInputChange(
                              "nervous_system_detail",
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-md px-3 mb-2 mr-2  py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === "D" && (
          <div>
            <div className="" style={{ fontSize: "16px" }}>
              <label className="block mt-4">
                <span className="text-gray-700">รูปแบบการปรึกษา</span>
                {/* Dropdown component */}
                <Dropdown
                  options={formatOptions}
                  selectedValue={medicalCounseling.format}
                  onChange={handleFormatChange}
                />
              </label>
              <label className="block mt-4">
                <span className="text-gray-700 ">ปัญหานำ</span>
                <Dropdown
                  options={firstproblemsOptions}
                  selectedValue={medicalCounseling.firstproblems}
                  onChange={handlefirstproblemsChange}
                />
              </label>

              <label className="block mb-4 mt-4">
                <span className="text-gray-700 ">ปัญหาสำคัญ</span>
                <input
                  type="text"
                  name="problems"
                  value={medicalCounseling.problems}
                  onChange={handleChangeCounseling}
                  className="mt-2 p-2 block w-full rounded-md border border-gray-800 shadow-sm"
                />
              </label>

              <label className="block mb-4 mt-4">
                <span className="text-gray-700 ">
                  ลักษณะทั่วไปและพฤติกรรมขณะให้การปรึกษา
                </span>
                <textarea
                  type="text"
                  name="behavior"
                  value={medicalCounseling.behavior}
                  onChange={handleChangeCounseling}
                  className="mt-1 p-2 block w-full rounded-md border border-gray-800 shadow-sm "
                />
              </label>

              <label className="block mb-4 mt-4">
                <span className="text-gray-700 ">ผลการให้คำปรึกษา</span>
                <textarea
                  type="text"
                  name="counseling_result"
                  value={medicalCounseling.counseling_result}
                  onChange={handleChangeCounseling}
                  className="mt-1 p-2 h-40 block w-full rounded-md border border-gray-800 shadow-sm "
                />
              </label>

              <label className="block mb-4 mt-4">
                <span className="text-gray-700 ">
                  แผนการให้คำปรึกษาในครั้งต่อไป
                </span>
                <textarea
                  type="text"
                  name="counseling_plan"
                  value={medicalCounseling.counseling_plan}
                  onChange={handleChangeCounseling}
                  className="mt-1 p-2 h-40 block w-full rounded-md border border-gray-800 shadow-sm"
                />
              </label>

              <label className="block mt-4 mb-4">
                <span className="text-gray-700 ">
                  แนวทางการให้ความช่วยเหลือ
                </span>
                <Dropdown
                  options={assistanceOptions}
                  selectedValue={medicalCounseling.assistance}
                  onChange={handleassistanceChange}
                />
              </label>

              <div className="block mt-4">
                <label htmlFor="appointmentDate" className="text-gray-700">
                  การนัดครั้งหน้า
                </label>
                <input
                  type="date"
                  value={medicalCounseling.appointment_date}
                  onChange={(e) =>
                    setMedicalCounseling({
                      ...medicalCounseling,
                      appointment_date: e.target.value,
                    })
                  }
                  className="mt-2 p-2 block w-full rounded-md border border-gray-800 shadow-sm "
                />
              </div>

              <div className="block mt-4">
                <label htmlFor="appointmentDate" className="text-gray-700">
                  เวลา
                </label>
                <input
                  type="time"
                  value={medicalCounseling.appointment_time}
                  onChange={(e) =>
                    setMedicalCounseling({
                      ...medicalCounseling,
                      appointment_time: e.target.value,
                    })
                  }
                  className="mt-2 p-2 block w-full rounded-md border border-gray-800 shadow-sm "
                />
              </div>

              <label className="block mb-4 mt-2">
                <span className="text-gray-700">หมายเหตุ</span>
                <textarea
                  type="text"
                  name="remarks"
                  value={medicalCounseling.remarks}
                  onChange={handleChangeCounseling}
                  className="mt-2 p-2 h-40 block w-full rounded-md border border-gray-800 shadow-sm"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormOne;
