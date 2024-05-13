import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import FormCheckList from "./Form/FormMedicalRecord";
import { FaTrashCan } from "react-icons/fa6";
import SweetAlert2 from "react-sweetalert2";

export default function NewmedicalRecord() {
  let auth = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const initialPatientID = id ? id : "";
  let doctorName = auth.user.username;
  const [swalProps, setSwalProps] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // เพิ่ม 1 เพื่อปรับเป็นรูปแบบที่เริ่มที่ 1
  const currentDay = currentDate.getDate();

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const formattedTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

  const [user, SetUser] = useState(null);

  const [medicalRecord, setMedicalRecord] = useState({
    medicalRecord_id: "",
    patient: initialPatientID,
    visittime: formattedTime, // เวลาปัจจุบัน
    visitdate: formattedDate,
    // visitdate: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    doctor: user,
    chief_complaint: "",
    physical_exam: "",
    diagnosis: "",
    nursing_activities: "",
    recommendations: "",
    otherRecommendations: "",
    forwarding: "",

    skin_color: "",
    skin_color_detail: "",
    chest_size: "",
    chest_size_detail: "",

    breathingRate: "",
    breathingRate_detail: "",
    lungTube: "",
    lungTube_detail: "",
    ribCage: "",
    ribCage_detail: "",
    chestExpansion: "",
    chestExpansion_detail: "",
    abnormalBreathSounds: "",
    abnormalBreathSounds_detail: "",

    yellow_gland: "",
    yellow_gland_detail: "",
    breathing_sound: "",
    breathing_sound_detail: "",
    mouth_and_throat: "",
    mouth_and_throat_detail: "",
    abdominal_appearance: "",
    abdominal_appearance_detail: "",
    intestinal_movement_sound: "",
    intestinal_movement_sound_detail: "",
    abdominal_wall_sound: "",
    abdominal_wall_sound_detail: "",
    abdominal_surface: "",
    abdominal_surface_detail: "",
    skin: "",
    skin_detail: "",
    head: "",
    head_detail: "",
    face: "",
    face_detail: "",
    eyes: "",
    eyes_detail: "",
    mouth: "",
    mouth_detail: "",
    tongue: "",
    tongue_detail: "",
    throat: "",
    throat_detail: "",
    neck: "",
    neck_detail: "",
    thyroid: "",
    thyroid_detail: "",
    breasts: "",
    breasts_detail: "",
    chest: "",
    chest_detail: "",
    circulatory_system: "",
    circulatory_system_detail: "",
    abdomen: "",
    abdomen_detail: "",
    reproductive_system: "",
    reproductive_system_detail: "",
    musculoskeletal_system: "",
    musculoskeletal_system_detail: "",
    nervous_system: "",
    nervous_system_detail: "",
    form_2q: "",
    medications: [{ medication_name: "", quantity: "" }],
    supplies: [{ medical_supplies_name: "", quantity: "" }],
    remarks: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get(`/api/user/users/${doctorName}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        SetUser(response.data); // Set user data fetched from API
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [doctorName]);

  useEffect(() => {
    // Once the user data is available, update the medical record state
    if (user) {
      setMedicalRecord((prevState) => ({
        ...prevState,
        doctor: `${user.firstname} ${user.lastname}`, // Concatenate first name and last name
      }));
    }
  }, [user]);

  const handleInputChange = (fieldName, value) => {
    setMedicalRecord({ ...medicalRecord, [fieldName]: value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedicalRecord({
      ...medicalRecord,
      [name]: value,
    });
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medicalRecord.medications];
    updatedMedications[index][field] = value;
    setMedicalRecord({
      ...medicalRecord,
      medications: updatedMedications,
    });
  };

  const handleMedicationSuppliesChange = (index, field, value) => {
    const updatedMedicationsSupplies = [...medicalRecord.supplies];
    updatedMedicationsSupplies[index][field] = value;
    setMedicalRecord({
      ...medicalRecord,
      supplies: updatedMedicationsSupplies,
    });
  };

  const addMedication = () => {
    setMedicalRecord({
      ...medicalRecord,
      medications: [
        ...medicalRecord.medications,
        { medication_name: "", quantity: "" }, // เพิ่มค่าเริ่มต้นสำหรับ medication_name และ quantity
      ],
    });
  };

  const addMedicationSup = () => {
    setMedicalRecord({
      ...medicalRecord,
      supplies: [
        ...medicalRecord.supplies,
        { medical_supplies_name: "", quantity: "" },
      ],
    });
  };

  const handleRemoveMedication = (index) => {
    const updatedMedications = [...medicalRecord.medications];
    updatedMedications.splice(index, 1);
    setMedicalRecord({
      ...medicalRecord,
      medications: updatedMedications,
    });
  };

  const handleRemoveMedicationSup = (index) => {
    const updatedMedicationSup = [...medicalRecord.supplies];
    updatedMedicationSup.splice(index, 1);
    setMedicalRecord({
      ...medicalRecord,
      supplies: updatedMedicationSup,
    });
  };

  const [diagnosisOptions, setDiagnosisOptions] = useState([]);
  const [nursingActivitiesOptions, setNursingActivitiesOptions] = useState([]);

  const [medicationOptions, setMedicationOptions] = useState([]);
  const [medicalSupOptions, setMedicalSupOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [selected, setSelected] = useState(null);

  const handleSelectOptionA = () => {
    setSelectedOption("A");
  };

  // ฟังก์ชันสำหรับการเลือกตัวเลือก B
  const handleSelectOptionB = () => {
    setSelectedOption("B");
  };

  const handleSelectOptionC = () => {
    setSelectedOption("C");
  };

  const handleSelectOptionD = () => {
    setSelectedOption("D");
  };

  const handSelectedA = () => {
    setSelected("A");
  };

  const handSelectedC = () => {
    setSelected("C");
  };

  const handSelectedB = () => {
    setSelected("B");
  };

  const handSelectedD = () => {
    setSelected("D");
  };

  useEffect(() => {
    // ดึงข้อมูลจาก API สำหรับ diagnosis
    axios
      .get("/api/diagnosis")
      .then((response) => setDiagnosisOptions(response.data))
      .catch((error) =>
        console.error("Error fetching diagnosis options:", error)
      );

    // ดึงข้อมูลจาก API สำหรับ nursing activities
    axios
      .get("/api/activities")
      .then((response) => setNursingActivitiesOptions(response.data))
      .catch((error) =>
        console.error("Error fetching nursing activities options:", error)
      );

    axios
      .get("/api/medication")
      .then((response) => setMedicationOptions(response.data))
      .catch((error) =>
        console.error("Error fetching medications options:", error)
      );

    axios
      .get("/api/medicalsupplies")
      .then((response) => setMedicalSupOptions(response.data))
      .catch((error) =>
        console.error("Error fetching medicalsupplies options:", error)
      );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("token");
    axios
      .post(
        "/api/medicalrecord",
        medicalRecord, // move medicalRecord to the second parameter
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        // ทำสิ่งที่ต้องการหลังจากได้รับการตอบกลับจากเซิร์ฟเวอร์
        // alert("บันทึกเรียบร้อยแล้ว");
        setSuccessMessage(true);
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error:", error);
        // แสดง Alert เมื่อมีข้อผิดพลาด
        alert("จำนวนยาหรือเวชภัณฑ์ไม่เพียงพอ ไม่เพียงพอ");
      });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "10px", // ตั้งเส้นรอบเป็นแบบมนเรียบ
      borderColor: "#334155", // เปลี่ยนสีเส้นขอบเมื่อได้รับโฟกัส
    }),
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w mx-auto mt-2 px-4  bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-md"
      >
        <div className=" rounded-md ">
          <h3 className="text-xl text-center font-bold mb-2 p-2">
            บันทึกเวชระเบียน
          </h3>
        </div>

        <div>
          <label className="block mb-4 mt-4">
            <span className="text-gray-700 ">อาการที่มารับบริการ</span>
            <textarea
              type="text"
              name="chief_complaint"
              value={medicalRecord.chief_complaint}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md shadow-sm border border-gray-500"
            />
          </label>
        </div>

        <FormCheckList
          medicalRecord={medicalRecord}
          selected={selected}
          selectedOption={selectedOption}
          handleSelectOptionA={handleSelectOptionA}
          handleSelectOptionB={handleSelectOptionB}
          handSelectedA={handSelectedA}
          handSelectedB={handSelectedB}
          handSelectedC={handSelectedC}
          handSelectedD={handSelectedD}
          handleInputChange={handleInputChange}
          handleSelectOptionC={handleSelectOptionC}
          handleSelectOptionD={handleSelectOptionD}
          // setMedicalCounseling={setMedicalCounseling}
          // medicalCounseling={medicalCounseling}
        />
        <div className="mt-4">
          <label className="block mb-4 ">
            <span className="text-gray-700">การวินิจฉัย</span>
            <div>
              <Select
                value={diagnosisOptions.find(
                  (option) => option.diagnosis_name === medicalRecord.diagnosis
                )}
                onChange={(selectedOption) =>
                  setMedicalRecord({
                    ...medicalRecord,
                    diagnosis: selectedOption.diagnosis_name,
                  })
                }
                options={diagnosisOptions}
                getOptionLabel={(option) => option.diagnosis_name}
                getOptionValue={(option) => option._id}
                placeholder="เลือกการวินิจฉัย"
                styles={customStyles} // ใช้รูปแบบที่กำหนดไว้
              />
            </div>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">กิจกรรมพยาบาล</span>
            <Select
              value={nursingActivitiesOptions.find(
                (option) =>
                  option.activities_name === medicalRecord.nursing_activities
              )}
              onChange={(selectedOption) =>
                setMedicalRecord({
                  ...medicalRecord,
                  nursing_activities: selectedOption.activities_name,
                })
              }
              options={nursingActivitiesOptions}
              getOptionLabel={(option) => option.activities_name}
              getOptionValue={(option) => option._id}
              placeholder="เลือกกิจกรรมพยาบาล"
              styles={customStyles}
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">การให้คำแนะนำ</span>

            <select
              value={medicalRecord.recommendations}
              onChange={(e) =>
                handleInputChange("recommendations", e.target.value)
              }
              className="border border-gray-500 focus:outline-none mt-1 p-2 block w-full rounded-md shadow-sm"
            >
              <option value="">--เลือก--</option>
              <option value="ให้คำแนะนำการปฏิบัติตัวที่เหมาะสมกับโรคและอาการ">
                ให้คำแนะนำการปฏิบัติตัวที่เหมาะสมกับโรคและอาการ
              </option>
              <option value="ให้คำแนะนำการใช้ยาที่ถูกต้อง">
                ให้คำแนะนำการใช้ยาที่ถูกต้อง
              </option>
              <option value="ให้คำแนะนำการดูแลแผล">ให้คำแนะนำการดูแลแผล</option>
              <option value="ให้คำแนะนำการสังเกตอาการผิดปกติ">
                ให้คำแนะนำการสังเกตอาการผิดปกติ
              </option>
              <option value="ให้คำแนะนำการไปตรวจรักษาต่อที่โรงพยาบาล">
                ให้คำแนะนำการไปตรวจรักษาต่อที่โรงพยาบาล
              </option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </select>
            {medicalRecord.recommendations === "อื่น ๆ" && (
              <input
                type="text"
                value={medicalRecord.otherRecommendations}
                onChange={(e) =>
                  handleInputChange("otherRecommendations", e.target.value)
                }
                placeholder="โปรดระบุ"
                className="border border-gray-500 focus:outline-none mt-1 p-2 block w-full rounded-md shadow-sm"
              />
            )}
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">การจ่ายยา</span>
            {medicalRecord.medications.map((medication, index) => (
              <div key={index} className="flex items-center space-x-4 mb-2">
                <input
                  list="medicationOptions"
                  value={medication.medication_name}
                  onChange={(event) =>
                    handleMedicationChange(
                      index,
                      "medication_name",
                      event.target.value
                    )
                  }
                  className="mt-1 p-2 block w-1/2 rounded-md  shadow-sm focus:outline-none border border-gray-500 "
                  placeholder="เลือกชื่อยา"
                />
                <datalist id="medicationOptions">
                  {medicationOptions.map((option) => (
                    <option key={option._id} value={option.medication_name} />
                  ))}
                </datalist>

                <input
                  type="number"
                  name="quantity"
                  value={medication.quantity}
                  onChange={(event) =>
                    handleMedicationChange(
                      index,
                      "quantity",
                      event.target.value
                    )
                  }
                  className="mt-1 p-2 block w-1/4 rounded-md shadow-sm focus:outline-none border border-gray-500"
                  placeholder="จำนวน"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedication(index)}
                  >
                    <FaTrashCan className="text-white hover:bg-red-700 text-base bg-red-600 p-2 h-8 w-8 mt-1 rounded-md " />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addMedication}
              className="flex items-center justify-center px-3 py-1 bg-teal-500 text-white rounded-md "
            >
              <FaPlus className="mr-2" />
              เพิ่มรายการ
            </button>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">เวชภัณฑ์ที่ใช้</span>
            {medicalRecord.supplies.map((medication_supplies, index) => (
              <div key={index} className="flex items-center  space-x-4 mb-2">
                <input
                  list="medical_supplies_list"
                  value={medication_supplies.medical_supplies_name}
                  onChange={(event) =>
                    handleMedicationSuppliesChange(
                      index,
                      "medical_supplies_name",
                      event.target.value
                    )
                  }
                  placeholder="เลือกชื่อเวชภัณฑ์"
                  className="mt-1 p-2 block w-1/2 rounded-md  shadow-sm focus:outline-none border border-gray-500 "
                />
                <datalist id="medical_supplies_list">
                  {medicalSupOptions.map((option) => (
                    <option
                      key={option._id}
                      value={option.medical_supplies_name}
                    />
                  ))}
                </datalist>

                <input
                  type="number"
                  name="quantity"
                  value={medication_supplies.quantity}
                  onChange={(event) =>
                    handleMedicationSuppliesChange(
                      index,
                      "quantity",
                      event.target.value
                    )
                  }
                  className="mt-1 p-2 block w-1/4 rounded-md shadow-sm focus:outline-none border border-gray-500"
                  placeholder="จำนวน"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicationSup(index)}
                  >
                    <FaTrashCan className="text-white hover:bg-red-700 text-base bg-red-600 p-2 h-8 w-8 mt-1 rounded-md " />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addMedicationSup}
              className="flex items-center justify-center px-3 py-1 bg-teal-500 text-white rounded-md "
            >
              <FaPlus className="mr-2" />
              เพิ่มรายการ
            </button>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">การส่งต่อ</span>
            <select
              value={medicalRecord.forwarding}
              onChange={(e) => handleInputChange("forwarding", e.target.value)}
              className="border border-gray-500 focus:outline-none mt-1 p-2 block w-full rounded-md shadow-sm"
            >
              <option value="">--เลือก--</option>
              <option value="โรงพยาบาลห้างฉัตร">โรงพยาบาลห้างฉัตร</option>
              <option value="โรงพยาบาลลำปาง">โรงพยาบาลลำปาง</option>
              <option value="ไม่มีการส่งต่อ">ไม่มีการส่งต่อ</option>
              {/* Add additional options if necessary */}
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">หมายเหตุ</span>
            <textarea
              type="text"
              name="remarks"
              value={medicalRecord.remarks}
              onChange={handleChange}
              className="border border-gray-500 focus:outline-none mt-1 p-2 h-36 block w-full rounded-md shadow-sm "
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={() => {
              setSwalProps({
                show: true,
                title: "บันทึกเรียบร้อย",
                icon: "success",
              });
            }}
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-4"
          >
            บันทึก
          </button>
          <button
            className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            ยกเลิก
          </button>
        </div>
        {successMessage && <SweetAlert2 {...swalProps} />}
      </form>
    </>
  );
}
