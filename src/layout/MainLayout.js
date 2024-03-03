import { Outlet } from "react-router-dom";
import { FaHospitalSymbol } from "react-icons/fa";


const MainLayout = () => {
  return (
    <>
      <nav className=" p-3 rounded-md font-prompt bg-white">
        <div className="ml-2 container mx-auto flex items-center text-teal-800">
          <FaHospitalSymbol style={{ fontSize: "24px" }} />
          <h1 className="ml-4 text-xl font-Kanit font-medium text-teal-600">
            TULP WELLNESS CENTER
          </h1>

          {/* Add any additional navigation elements here */}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default MainLayout;
