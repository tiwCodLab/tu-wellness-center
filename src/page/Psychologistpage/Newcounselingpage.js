import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../utils/AuthProvider";

const Dropdown = ({ options, selectedValue, onChange }) => {
  return (
    <select
      value={selectedValue}
      onChange={onChange}
      className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm"
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

export default function NewCounselingRecord() {
  // let auth = useAuth();
  const { id } = useParams();
  const initialPatientID = id ? id : "";
  // let doctorName = auth.user.username;

  const navigate = useNavigate();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // เพิ่ม 1 เพื่อปรับเป็นรูปแบบที่เริ่มที่ 1
  const currentDay = currentDate.getDate();

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const formattedTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

  const [medicalRecord, setMedicalRecord] = useState({
    patient: initialPatientID,
    visittime: formattedTime, // เวลาปัจจุบัน
    visitdate: formattedDate,
    // visitdate: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    psychologist: "",
    format: "",
    firstproblems: "",
    problems: "",
    behavior: "",
    counseling_result: "",
    counseling_plan: "",
    assistance: "",
    form_2q: "",
    form_9q: "",
    form_8q: "",
    form_st_5: "",
    form_gad: "",
    remarks: "",
    appointment_date: "",
    appointment_time: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedicalRecord({
      ...medicalRecord,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/counseling", medicalRecord)
      .then((response) => {
        console.log("Response:", response.data);
        // ทำสิ่งที่ต้องการหลังจากได้รับการตอบกลับจากเซิร์ฟเวอร์
        alert("บันทึกเรียบร้อยแล้ว");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error:", error);
        // ทำสิ่งที่ต้องการหากเกิดข้อผิดพลาดในการโพสต์ข้อมูล
      });
  };

  const handleFormatChange = (e) => {
    const formatValue = e.target.value;
    setMedicalRecord((prevRecord) => ({
      ...prevRecord,
      format: formatValue,
    }));
  };

  const handlefirstproblemsChange = (e) => {
    const formatValue = e.target.value;
    setMedicalRecord((prevRecord) => ({
      ...prevRecord,
      firstproblems: formatValue,
    }));
  };

  const handleassistanceChange = (e) => {
    const formatValue = e.target.value;
    setMedicalRecord((prevRecord) => ({
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
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w mx-auto mt-2  bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-md"
      >
        <div className="bg-white rounded-md ">
          <h3 className="text-xl text-center font-bold mb-5 p-2">
            บันทึกการปรึกษาจิตวิทยา
          </h3>
        </div>
        <div>
          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">ครั้งที่</span>
            <input
              type="text"
              name="no"
              value={medicalRecord.no}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 ">รูปแบบการปรึกษา</span>
            {/* Dropdown component */}
            <Dropdown
              options={formatOptions}
              selectedValue={medicalRecord.format}
              onChange={handleFormatChange}
            />
          </label>
          <label className="block mt-4">
            <span className="text-gray-700 ">ปัญหานำ</span>
            <Dropdown
              options={firstproblemsOptions}
              selectedValue={medicalRecord.firstproblems}
              onChange={handlefirstproblemsChange}
            />
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">ปัญหาสำคัญ</span>
            <input
              type="text"
              name="problems"
              value={medicalRecord.problems}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">
              ลักษณะทั่วไปและพฤติกรรมขณะให้การปรึกษา
            </span>
            <textarea
              type="text"
              name="behavior"
              value={medicalRecord.behavior}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">ผลการให้คำปรึกษา</span>
            <textarea
              type="text"
              name="counseling_result"
              value={medicalRecord.counseling_result}
              onChange={handleChange}
              className="mt-1 p-2 h-40 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">
              แผนการให้คำปรึกษาในครั้งต่อไป
            </span>
            <textarea
              type="text"
              name="counseling_plan"
              value={medicalRecord.counseling_plan}
              onChange={handleChange}
              className="mt-1 p-2 h-40 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block mt-4 mb-4">
            <span className="text-gray-700 ">แนวทางการให้ความช่วยเหลือ</span>
            <Dropdown
              options={assistanceOptions}
              selectedValue={medicalRecord.assistance}
              onChange={handleassistanceChange}
            />
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">แบบคัดกรองโรคซึมเศร้า (2Q)</span>
            <div className="ml-4 ">
              <div className="mb-1">
                <input
                  type="radio"
                  id="form_2q_yes"
                  name="form_2q"
                  value="ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ ท่านรู้สึกหดหู่ เศร้า
                  หรือท้อแท้สิ้นหวัง"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }}
                />
                <label htmlFor="form_2q_yes" className="ml-4">
                  ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ ท่านรู้สึกหดหู่ เศร้า
                  หรือท้อแท้สิ้นหวัง
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="form_2q_no"
                  name="form_2q"
                  value="ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ ท่านรู้สึกเบื่อ
                  ทำอะไรก็ไม่เพลิดเพลิน"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_2q_no" className="ml-4">
                  ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ ท่านรู้สึกเบื่อ
                  ทำอะไรก็ไม่เพลิดเพลิน
                </label>
              </div>
            </div>
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">แบบคัดกรองโรคซึมเศร้า (9Q)</span>
            <div className="ml-4 ">
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_9q_1"
                  name="form_9q"
                  value="ไม่มีอาการของโรคซึมเศร้าหรือมีอาการของโรคซึมเศร้าในระดับน้อยมาก"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }}
                />
                <label htmlFor="form_9q_1" className="ml-4">
                  ไม่มีอาการของโรคซึมเศร้าหรือมีอาการของโรคซึมเศร้าในระดับน้อยมาก
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_9q_2"
                  name="form_9q"
                  value="มีอาการของโรคซึมเศร้า ระดับน้อย"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_9q_2" className="ml-4">
                  มีอาการของโรคซึมเศร้า ระดับน้อย
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_9q_3"
                  name="form_9q"
                  value="มีอาการของโรคซึมเศร้า ระดับปานกลาง"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_9q_3" className="ml-4">
                  มีอาการของโรคซึมเศร้า ระดับปานกลาง
                </label>
              </div>

              <div className="mb-2">
                <input
                  type="radio"
                  id="form_9q_4"
                  name="form_9q"
                  value="มีอาการของโรคซึมเศร้า ระดับรุนแรง"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_9q_3" className="ml-4">
                  มีอาการของโรคซึมเศร้า ระดับรุนแรง
                </label>
              </div>
            </div>
          </label>

          {/* <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">แบบคัดกรองโรคซึมเศร้า (9Q)</span>
            <p className="text-sm ml-4">
              {"<"} 7
              <span className="ml-8">
                ไม่มีอาการของโรคซึมเศร้าหรือมีอาการของโรคซึมเศร้าในระดับน้อยมาก
              </span>
            </p>
            <p className="text-sm ml-4">
              7 - 12
              <span className="ml-4"> มีอาการของโรคซึมเศร้า ระดับน้อย</span>
            </p>
            <p className="text-sm ml-4">
              13 - 18{" "}
              <span className="ml-2">มีอาการของโรคซึมเศร้า ระดับปานกลาง</span>
            </p>
            <p className="text-sm ml-4">
              {">"} 18{" "}
              <span className="ml-6">มีอาการของโรคซึมเศร้า ระดับรุนแรง</span>
            </p>
            <input
              type="text"
              name="form_9q"
              value={medicalRecord.form_9q}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label> */}

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">แบบคัดกรองการฆ่าตัวตาย (8Q)</span>
            <div className="ml-4 ">
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_8q_1"
                  name="form_8q"
                  value="ไม่มีแนวโน้มฆ่าตัวตายในปัจจุบัน"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }}
                />
                <label htmlFor="form_8q_1" className="ml-4">
                  ไม่มีแนวโน้มฆ่าตัวตายในปัจจุบัน
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_8q_2"
                  name="form_8q"
                  value="มีแนวโน้นฆ่าตัวตายในปัจจุัน ระดับน้อย"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_8q_2" className="ml-4">
                  มีแนวโน้นฆ่าตัวตายในปัจจุัน ระดับน้อย
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_8q_3"
                  name="form_8q"
                  value="มีแนวโน้มฆ่าตัวตายในปัจจุบัน ระดับปานกลาง"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_8q_3" className="ml-4">
                  มีแนวโน้มฆ่าตัวตายในปัจจุบัน ระดับปานกลาง
                </label>
              </div>

              <div className="mb-2">
                <input
                  type="radio"
                  id="form_8q_4"
                  name="form_8q"
                  value="มีแนวโน้มฆ่าตัวตายในปัจจุบัน ระดับรุนแรง"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_8q_4" className="ml-4">
                  มีแนวโน้มฆ่าตัวตายในปัจจุบัน ระดับรุนแรง
                </label>
              </div>
            </div>
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">แบบประเมินความเครียด (ST-5)</span>
            <div className="ml-4 ">
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_st_5_1"
                  name="form_st_5"
                  value="ความเครียด ระดับน้อย"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }}
                />
                <label htmlFor="form_8q_1" className="ml-4">
                  ความเครียด ระดับน้อย
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_st_5_2"
                  name="form_st_5"
                  value="ความเครียด ระดับปานกลาง"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_st_5_2" className="ml-4">
                  ความเครียด ระดับปานกลาง
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_st_5_3"
                  name="form_st_5"
                  value="ความเครียด ระดับมาก"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_st_5_3" className="ml-4">
                  ความเครียด ระดับมาก
                </label>
              </div>

              <div className="mb-2">
                <input
                  type="radio"
                  id="form_st_5_4"
                  name="form_st_5"
                  value="ความเครียด ระดับมากที่สุด"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_st_5_4" className="ml-4">
                  ความเครียด ระดับมากที่สุด
                </label>
              </div>
            </div>
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">แบบวัดความวิตกกังวล (GAD-7)</span>
            <div className="ml-4 ">
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_gad_1"
                  name="form_gad"
                  value="มีความวิตกกังวลในระดับเฉลี่ย หรือสูงกว่าเกณฑ์เฉลี่ยเพียงเล็กน้อย"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }}
                />
                <label htmlFor="fform_8q_1" className="ml-4">
                  มีความวิตกกังวลในระดับเฉลี่ย
                  หรือสูงกว่าเกณฑ์เฉลี่ยเพียงเล็กน้อย
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_gad_2"
                  name="form_gad"
                  value="มีความวิตกกังวลในระดับปานกลาง และควรทำแบบประเมินซ้ำในอีก 1-2 สัปดาห์"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_gad_2" className="ml-4">
                  มีความวิตกกังวลในระดับปานกลาง และควรทำแบบประเมินซ้ำในอีก 1-2
                  สัปดาห์
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="radio"
                  id="form_gad_3"
                  name="form_gad"
                  value="มีความวิตกกังวลในระดับสูง ควรได้รับการประเมินจากผู้เชี่ยวชาญ"
                  onChange={handleChange}
                  style={{ transform: "scale(1.5)" }} // เพิ่มขนาดของ radio button โดยการขยายขนาด
                />
                <label htmlFor="form_gad_3" className="ml-4">
                  มีความวิตกกังวลในระดับสูง ควรได้รับการประเมินจากผู้เชี่ยวชาญ
                </label>
              </div>
            </div>
          </label>

          <div className="block mt-4">
            <label htmlFor="appointmentDate" className="text-gray-700">
              การนัดครั้งหน้า
            </label>
            <input
              type="date"
              value={medicalRecord.appointment_date}
              onChange={(e) =>
                setMedicalRecord({
                  ...medicalRecord,
                  appointment_date: e.target.value,
                })
              }
              className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="block mt-4">
            <label htmlFor="appointmentDate" className="text-gray-700">
              เวลา
            </label>
            <input
              type="time"
              value={medicalRecord.appointment_time}
              onChange={(e) =>
                setMedicalRecord({
                  ...medicalRecord,
                  appointment_time: e.target.value,
                })
              }
              className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <label className="block mb-4">
            <span className="text-gray-700">หมายเหตุ</span>
            <textarea
              type="text"
              name="remarks"
              value={medicalRecord.remarks}
              onChange={handleChange}
              className="mt-1 p-2 h-40 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">ชื่อนักจิตวิทยาที่ให้บริการ</span>
            <input
              type="text"
              name="psychologist"
              value={medicalRecord.psychologist}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-4 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            บันทึก
          </button>
        </div>
      </form>
    </>
  );
}
