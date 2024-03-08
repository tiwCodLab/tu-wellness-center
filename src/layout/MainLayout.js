import { Outlet } from "react-router-dom";
import { FaHospitalSymbol } from "react-icons/fa";
import { useAuth } from "../utils/AuthProvider";
import user from "../assets/nurse.png";
const MainLayout = () => {
  const auth = useAuth();
  return (
    <>
      {auth?.user?.username ? (
        <div>
          <nav className="p-3 rounded-md font-prompt bg-gradient-to-r from-teal-800 to-teal-600">
            <div className="flex items-center justify-between ml-2 container mx-auto text-teal-800">
              <h1 className="flex items-center ml-4 text-xl font-Kanit font-medium text-white">
                <FaHospitalSymbol
                  style={{ fontSize: "24px" }}
                  className="mr-2"
                />
                TULP WELLNESS CENTER
              </h1>
              <div className="flex items-center mr-10">
                <img
                  src={user}
                  alt="คำอธิบายรูปภาพ"
                  width="32"
                  height="32"
                  className="rounded-full bg-white"
                  style={{ display: "block", margin: "auto" }}
                />
                <p className="text-base font-medium ml-2 text-white">
                  {auth.user.username}
                </p>
              </div>
            </div>
          </nav>
          <Outlet />
        </div>
      ) : (
        <div>
          <nav className="p-3 rounded-md font-prompt bg-white">
            <div className="flex items-center justify-between ml-2 container mx-auto text-teal-800">
              <h1 className="flex items-center ml-4 text-xl font-Kanit font-medium text-teal-600">
                <FaHospitalSymbol
                  style={{ fontSize: "24px" }}
                  className="mr-2"
                />
                TULP WELLNESS CENTER
              </h1>
            </div>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
};
export default MainLayout;
