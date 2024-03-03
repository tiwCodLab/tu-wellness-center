import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
export default function AuthStatus() {
  let auth = useAuth();

  if (!auth.user?.username) {
    return (
      <p className="text-white p-4">
        กรุณล็อกอินเพื่อเข้าใช้งานระบบ{" "}
        <Link to="/login" className="font-bold text-yellow">
          ล็อกอิน
        </Link>
        ?
      </p>
    );
  }

  return (
    <div className="text-teal-800 p-4">
      <p className="text-lg">ยินดีต้อนรับ {auth.user?.username}!</p>
      {/* <div className="mt-4">
        ไปที่{" "}
        <Link to="/manange" className="text-blue-500 underline">
          จัดการข้อมูลเวชระเบียน
        </Link>
        หรือ 
    <button
      onClick={() => {
        auth.signout(() => navigate("/"));
      }}
      className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
    >
      Sign out
    </button>
      </div> */}
    </div>
  );
}
