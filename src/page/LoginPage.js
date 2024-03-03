import { useState, useCallback, useEffect, useRef } from "react";
import {
  // useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import Spinner from "../component/Spinner";

import logo from "../assets/logotu.png";

const LoginPage = () => {
  const auth = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const navigation = useNavigation();
  // const location = useLocation();

  let from = "/";
  const usernameRef = useRef();
  const errRef = useRef();

  const [error, setError] = useState(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    try {
      setLoginLoading(true);
      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // data type match "Content-Type" header
      });
      if (response.ok) {
        const data = await response.json();
        const accessToken = data?.accessToken;
        const roles = data?.roles;
        const user = { username, roles, accessToken };
        await auth.signin(user, () => {
          return navigate(from, { replace: true });
        });
      } else if (response.status === 400) {
        setError("Missing username or Password");
      } else if (response.status === 401) {
        setError("Unauthorized");
        console.log(">>> ", from);
      } else {
        setError("ล็อกอินไม่สำเร็จ");
      }
    } catch (error) {
      setError("Error. Try again later (" + error + ")!");
    } finally {
      setLoginLoading(false);
    }
    // errRef.current.focus();
  };

  const redirect = useCallback(() => {
    if (!loginLoading && auth?.user?.username) {
      if (from) {
        return navigate(from, { replace: true });
      } else {
        if (window.history.state && window.history.state.idx > 0) {
          navigate(-1); //, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    }
  }, [auth.user.username, from, loginLoading, navigate]);

  // useEffect to make the redirect callback if user already logon
  useEffect(() => redirect(), [redirect]);

  return (
    <>
      <>
        {navigation.state === "loading" ? (
          <Spinner />
        ) : (
          <>
            <div className="max-w-md mx-auto mt-20 mb-14 p-4 bg-white shadow-md rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4 p-10">
                <div>
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-32 h-32 mx-auto mb-4"
                  />
                  <h1 className="text-xl font-bold mb-4 text-center ">
                    TULP WELLNESS CENTER
                  </h1>
                </div>

                <p
                  ref={errRef}
                  className={error ? "text-red-500 text-center" : "hidden"}
                >
                  {error}
                </p>
                <div className="flex flex-col text-sm">
                  <label htmlFor="username" className="mb-2">
                    ชื่อยูสเซอร์
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    required
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <label htmlFor="password" className="mb-2">
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    autoComplete="off"
                    required
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 rounded-lg hover:bg-teal-700"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default LoginPage;
