import { NavLink, redirect } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import usePermission from "../utils/usePermission";
import ROLES_LIST from "../utils/rolesList";
import {
  FaUserCircle,
  FaListAlt,
  FaHistory,
  FaUserPlus,
  FaUsers,
  FaUserInjured,
  FaVirus,
  FaHeartbeat,
  FaMedkit,
  FaCapsules,
  FaChartBar,
  FaSignOutAlt,
  FaSearch,
  FaCalendarAlt,
  FaSignInAlt,
} from "react-icons/fa";

export default function LoginMenu() {
  const auth = useAuth();
  const { hasPermission } = usePermission();

  // const location = useLocation();
  const commonLinkClass =
    "text px-4 py-2 transition duration-300 hover:text-white hover:bg-teal-600 rounded-md  font-light text-24 flex items-center";

  return (
    <>
      {auth?.user?.username ? (
        <div className="space-y-2">
          <ul className="space-y-2">
            <div className={`${commonLinkClass} px-5 py-2 `}>
              <FaUserCircle className="mr-2" /> {auth.user.username}
            </div>
            {hasPermission([ROLES_LIST.Nurse]) && (
              <li>
                <NavLink to="/search" className={commonLinkClass}>
                  <FaSearch className="mr-2" /> ค้นหาผู้ป่วย
                </NavLink>
                <NavLink to="/manage/page/1" className={commonLinkClass}>
                  <FaListAlt className="mr-2" /> ข้อมูลเวชระเบียน
                </NavLink>

                <NavLink to="/record/page/1" className={commonLinkClass}>
                  <FaHistory className="mr-2" /> ประวัติ
                </NavLink>

                <NavLink to="/addpatient" className={commonLinkClass}>
                  <FaUserPlus className="mr-2" /> เพิ่มข้อมูลผู้ป่วย
                </NavLink>
              </li>
            )}

            {hasPermission([ROLES_LIST.Admin]) && (
              <li>
                <NavLink to="/users" className={commonLinkClass}>
                  <FaUsers className="mr-2" /> ข้อมูลผู้ใช้งานระบบ
                </NavLink>

                <NavLink to="/patient/page/1" className={commonLinkClass}>
                  <FaUserInjured className="mr-2" /> ข้อมูลผู้ป่วย
                </NavLink>

                <NavLink to="/disease" className={commonLinkClass}>
                  <FaVirus className="mr-2" /> ข้อมูลโรค
                </NavLink>

                <NavLink to="/activities" className={commonLinkClass}>
                  <FaHeartbeat className="mr-2" /> ข้อมูลกิจกรรมพยาบาล
                </NavLink>

                <NavLink to="/medication" className={commonLinkClass}>
                  <FaMedkit className="mr-2" /> ข้อมูลคลังยา
                </NavLink>

                <NavLink to="/medicalsupplies" className={commonLinkClass}>
                  <FaCapsules className="mr-2" /> ข้อมูลคลังเวชภัณฑ์
                </NavLink>

                <NavLink to="/datareport" className={commonLinkClass}>
                  <FaChartBar className="mr-2" /> รายงานข้อมูล
                </NavLink>
              </li>
            )}

            {hasPermission([ROLES_LIST.Psychologist]) && (
              <li>
                <NavLink to="/searchpatient" className={commonLinkClass}>
                  <FaUsers className="mr-2" /> ค้นหาผู้ป่วย
                </NavLink>

                <NavLink to="/appointment" className={commonLinkClass}>
                  <FaCalendarAlt className="mr-2" /> การนัดหมาย
                </NavLink>
                <NavLink to="/addpatients" className={commonLinkClass}>
                  <FaUserPlus className="mr-2" /> เพิ่มข้อมูลผู้ป่วย
                </NavLink>
              </li>
            )}

            <li
              className={`${commonLinkClass} cursor-pointer`}
              onClick={() => {
                auth.signout(() => redirect("/"));
              }}
            >
              <FaSignOutAlt className="mr-2" /> ออกจากระบบ
            </li>
          </ul>
        </div>
      ) : (
        <li>
          <NavLink className={commonLinkClass} to="/login">
            <FaSignInAlt className="mr-2" /> เข้าสู่ระบบ
          </NavLink>

          <NavLink to="/adds" className={commonLinkClass}>
            <FaUserPlus className="mr-2" /> เพิ่มข้อมูลส่วนตัว
          </NavLink>

          <NavLink to="/nothing" className={commonLinkClass}>
            <FaUserPlus className="mr-2" /> ผู่ป่วย
          </NavLink>
        </li>
      )}
    </>
  );
}
