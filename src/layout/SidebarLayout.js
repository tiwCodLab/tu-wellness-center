import { Outlet } from "react-router-dom";
import LoginMenu from "../component/LoginMenu";
import { AuthProvider } from "../utils/AuthProvider";
import logo from "../assets/logotu.png";

const SidebarLayout = () => {
  return (
    <AuthProvider>
      <div>
        <div className="flex h-screen font-Sarabun">
          <div>
            <aside className="fixed top-0 left-0 z- w-60 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-teal-900 text-white shadow-2xl rounded-lg">
              <div className="h-full px-4 py-8 overflow-y-auto">
                <img src={logo} alt="Logo" className="w-32 h-32 mx-auto mb-4" />
                <ul className="space-y-2 font-medium">
                  <LoginMenu />
                </ul>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-1 ml-60 ">
            <div className="p-3 rounded-md bg-soft-pastel-color bg-gradient-to-r from-gray-200 to-gray-200">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default SidebarLayout;
